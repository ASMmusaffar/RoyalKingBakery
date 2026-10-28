# 🥐 Royal King Bakers — Online Bakery Ordering App

**RoyalKingBakery** is a modern, responsive bakery storefront built as a single-page **React** app. It showcases a menu of bakery items, lets customers search the menu in real time, and manage an order cart — add items, adjust quantities, and see the live order total.

> Built with React 19 + Vite 6 + Tailwind CSS 4 + DaisyUI 5. © AS Mohammed Musaffar · MIT License

---

## ✨ Features

- 🧺 **Menu of 8 bakery items** — Brioche, Oatmeal, Croissant Pastries, Bagel, Classic & Premium Cookies, Croissant Bread, and Whole Wheat Bread — each with its own SVG illustration and price.
- 🔍 **Live search** — Instantly filter the menu as you type.
- 🛒 **Cart management** — Add to cart, manually set quantity for each item, reduce quantity, or remove items entirely.
- 💰 **Running total** — The order amount updates in real time as the cart changes.
- 📌 **Sticky navbar** — The search bar and brand header stay on top while scrolling.
- 🎨 **Modern UI** — Clean white theme with DaisyUI components and Tailwind utility classes.

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| UI framework | **React 19** (hooks: `useState`) |
| Build tool | **Vite 6** |
| Styling | **Tailwind CSS 4** (`@tailwindcss/vite` plugin) |
| Components | **DaisyUI 5** (navbar, quantity steppers, buttons) |
| Linting | ESLint 9 + react hooks plugins |

## 📂 Project Structure

```
src/
├── App.jsx        # Bakery menu data, cart state & all handlers
├── App.css
├── index.css      # Tailwind entry
├── main.jsx       # React root render
└── assets/
public/            # Static assets (item SVG illustrations)
```

## 🚀 Getting Started

### Prerequisites
- **Node.js 18+** and npm

### Setup
```bash
# 1. Clone the repository
git clone https://github.com/ASMmusaffar/RoyalKingBakery.git
cd RoyalKingBakery

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

The app opens at `http://localhost:5173`.

### Production Build
```bash
npm run build     # bundle to dist/
npm run preview   # preview the production build locally
```

## 🧭 Roadmap Ideas

- [ ] Checkout flow & order confirmation
- [ ] Firebase / API-backed orders
- [ ] Categories filter (breads / pastry / cookies)
- [ ] Dark mode

## 📄 License

Released under the **MIT License** — see [LICENSE](LICENSE). © AS Mohammed Musaffar.
