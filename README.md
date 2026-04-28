# DentaCare — Dental Clinic Website

A responsive multi-page website for a fictional dental clinic, built as a front-end learning project and portfolio piece.

---

## Live Demo

> _Coming soon — deploy link will be added here_

---

## Screenshots

> _Add screenshots of the main pages here_

---

## About the Project

**DentaCare** is a static front-end project that simulates a real-world dental clinic website. The goal was to practice building a complete multi-page layout with a modern utility-first CSS framework, responsive design, and lightweight vanilla JavaScript interactions — without any build tools or backend.

---

## Tech Stack

| Technology | Usage |
|---|---|
| HTML5 | Semantic markup and page structure |
| [Tailwind CSS](https://tailwindcss.com/) (CDN) | Styling and responsive layout |
| Vanilla JavaScript | UI interactions (mobile menu, etc.) |
| Google Fonts / Heroicons | Typography and icons |

No build tools, bundlers, or frameworks — runs directly in any browser.

---

## Pages

| File | Description |
|---|---|
| `index.html` | Home page — hero section, services overview, why choose us, CTA |
| `services.html` | Full list of dental services with descriptions |
| `doctors.html` | Team page with doctor cards and specializations |
| `blog.html` | Blog index — articles and tips on dental health |
| `blog-post.html` | Single blog post template |
| `contacts.html` | Contact form, clinic address, map placeholder |

---

## Project Structure

```
dentacare/
├── index.html
├── services.html
├── doctors.html
├── blog.html
├── blog-post.html
├── contacts.html
└── assets/
    ├── css/
    │   └── styles.css      # Custom styles on top of Tailwind
    └── js/
        └── main.js         # Vanilla JS interactions
```

---

## Getting Started

No installation or build step required.

**Option 1 — Open directly:**
```
Open index.html in any modern browser.
```

**Option 2 — Local dev server (recommended for consistent behavior):**

Using the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) VS Code extension:
1. Open the project folder in VS Code
2. Right-click `index.html` → **Open with Live Server**

Or with Node.js:
```bash
npx serve .
```

Then open `http://localhost:3000` in your browser.

---

## Learning Goals

- Build a complete multi-page static site from scratch
- Practice Tailwind CSS utility classes and responsive breakpoints
- Apply semantic HTML5 and accessibility best practices
- Create reusable layout patterns (header, footer, cards)
- Keep JavaScript minimal and dependency-free

---

## Author

**Stanislav** — front-end learner building portfolio projects.

- GitHub: [@stasfox333](https://github.com/stasfox333)
- Email: stasfox333999333@gmail.com

---

## License

This project is open source and available under the [MIT License](LICENSE).
