# DentaCare — Dental Clinic Website

A responsive multi-page simple website for a fictional dental clinic, built as a front-end learning project and portfolio piece.

---

## Live Demo

https://p1nkers.github.io/DentaCare_Project/

---

## Screenshots

<img width="1854" height="908" alt="image" src="https://github.com/user-attachments/assets/40a8a19d-b287-45b8-ad6b-75dc8f5191f0" />

<img width="1821" height="826" alt="image" src="https://github.com/user-attachments/assets/dde26045-b41d-4e2b-9169-bef097d8d823" />

<img width="452" height="767" alt="image" src="https://github.com/user-attachments/assets/4b440c76-053f-492d-ba64-9728ad09b504" />


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

### Live demo
The site is deployed and available at github pages:
**https://p1nkers.github.io/DentaCare_Project/**

### Run locally

No installation or build step required.

**Option 1 — Open directly:**
Open `index.html` in any modern browser.

**Option 2 — Local dev server (recommended):**

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

- GitHub: [@P1nkerS](https://github.com/P1nkerS)
- Email: DelovoyAnonimus@gmail.com

---

## License

This project is open source and available under the [MIT License](LICENSE).
