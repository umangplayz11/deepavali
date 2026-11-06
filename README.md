# Diwali Wishes Project 🪔✨

Welcome to the Diwali Wishes project! This project uses HTML, CSS, and jQuery to create a festive web experience for celebrating Diwali, the festival of lights.

## Description

This project aims to spread joy and happiness by offering an interactive web experience for Diwali greetings. It includes a beautiful display of fireworks and personalized wishes.

## Features

- 🎆 Dynamic fireworks display using jQuery
- 🎉 Personalized greetings with customizable names
- 🌈 Stylish and responsive design using Poppins font
- 📐 Smooth scrolling for a seamless user experience
- 🎨 Customizable styles to suit your preferences

## Getting Started

This personalized version includes a quiz that saves the custom answer to a local text file. Because browsers cannot write directly to files, run the included Node.js server:

1. Install [Node.js](https://nodejs.org/) if it is not already installed.
2. In this project folder, run:
   ```bash
   node server.js
   ```
3. Open the local address printed by the server (by default, `http://127.0.0.1:3000`).
4. When the custom-answer quiz option is selected, the submitted answer is appended to `quiz-answers.txt` in this folder.

Keep the server running while using the page. Opening `index.html` directly as a file will not save quiz answers.

## Usage

Feel free to customize the project to add your personal touch. You can modify the names, colors, or even add more interactive elements.

```html
<!-- Modify the names in index.html -->
<h2>
    Happy <span class="diwali-text">Diwali</span>
    <span>Wishing you a festival of lights.</span>
</h2>
<section class="content" id="sec5">
    <h2>
        <span class="name">Your Name</span> YourLastname
    </h2>
</section>
```

## Contributing
Contributions are welcome! If you have ideas for improvements or find any issues, feel free to open an issue or create a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

Happy Diwali! 🌟🕉️