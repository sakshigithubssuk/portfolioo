# Sakshi Kumari · 3D Portfolio

Interactive portfolio built with plain HTML, CSS and JavaScript plus [three.js](https://threejs.org) (r128, loaded from cdnjs).

## Features
- Draggable 3D skills globe with category filters and click-for-details
- Animated 3D background (particles, wireframe, ring) that reacts to mouse and scroll
- Tilt-on-hover project cards with animated architecture diagrams
- Automatic light and dark theme, responsive layout, reduced-motion support

## Structure
```
index.html
css/style.css
js/main.js
```

## Run locally
Open `index.html` in a browser, or serve the folder:
```
python3 -m http.server 8000
```

## Deploy on GitHub Pages
1. Push this folder to a GitHub repository.
2. Settings > Pages > Source: `main` branch, `/ (root)`.
3. Your site goes live at `https://<username>.github.io/<repo>/`.

## Customize
- Skills and their descriptions: the `S` array at the top of `js/main.js`
- Colours: the CSS variables at the top of `css/style.css`
- Text, experience and projects: `index.html`
