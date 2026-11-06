const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');

const host = '127.0.0.1';
const port = Number(process.env.PORT) || 3000;
const answerFile = path.join(__dirname, 'quiz-answers.txt');
const publicFiles = new Map([
    ['/', ['index.html', 'text/html; charset=utf-8']],
    ['/index.html', ['index.html', 'text/html; charset=utf-8']],
    ['/style.css', ['style.css', 'text/css; charset=utf-8']],
    ['/jquery.fireworks.js', ['jquery.fireworks.js', 'text/javascript; charset=utf-8']]
]);
const maxBodySize = 4096;

function sendJson(response, statusCode, body) {
    response.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
    response.end(JSON.stringify(body));
}

const server = http.createServer(async function (request, response) {
    if (request.method === 'POST' && request.url === '/api/answer') {
        let body = '';
        let bodyTooLarge = false;

        request.on('data', function (chunk) {
            if (bodyTooLarge) {
                return;
            }

            body += chunk;
            if (Buffer.byteLength(body) > maxBodySize) {
                bodyTooLarge = true;
                body = '';
            }
        });

        request.on('end', async function () {
            if (bodyTooLarge) {
                sendJson(response, 413, { error: 'Answer is too long.' });
                return;
            }

            let submission;
            try {
                submission = JSON.parse(body);
            } catch {
                sendJson(response, 400, { error: 'Invalid answer submission.' });
                return;
            }

            if (!submission || typeof submission.answer !== 'string' || !submission.answer.trim()) {
                sendJson(response, 400, { error: 'Please enter an answer before saving.' });
                return;
            }

            const record = `${new Date().toISOString()} - ${JSON.stringify(submission.answer.trim())}\n`;
            try {
                await fs.appendFile(answerFile, record, 'utf8');
                sendJson(response, 200, { saved: true });
            } catch (error) {
                console.error('Unable to save quiz answer:', error);
                sendJson(response, 500, { error: 'Could not save the answer to quiz-answers.txt.' });
            }
        });

        return;
    }

    if (request.method !== 'GET') {
        sendJson(response, 405, { error: 'Method not allowed.' });
        return;
    }

    const file = publicFiles.get(request.url);
    if (!file) {
        response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        response.end('Not found');
        return;
    }

    try {
        const contents = await fs.readFile(path.join(__dirname, file[0]));
        response.writeHead(200, { 'Content-Type': file[1] });
        response.end(contents);
    } catch (error) {
        console.error(`Unable to serve ${file[0]}:`, error);
        response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        response.end('Unable to load the requested file.');
    }
});

server.listen(port, host, function () {
    console.log(`Surprise site running at http://${host}:${port}`);
});
