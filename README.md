# 🛍️ Collaborative Product Wishlist App

A full-stack, real-time wishlist platform built with React, TypeScript, and Tailwind CSS. This app allows users to create, manage, and collaborate on shared shopping lists with friends and family — designed as part of the **FlockShop.ai Full Stack Intern Assignment**.

---

## ✨ Features

### 🚀 Core Functionality
- 🔐 User login/signup (mocked with localStorage)
- 📋 Create and manage multiple wishlists
- 🛒 Add/edit/remove products (name, price, image)
- 👥 Invite others to collaborate on wishlists (mocked)
- 🔄 Real-time updates (same browser session)
- 📱 Fully responsive design (desktop/tablet/mobile)

### 🎨 Visual Design
- Glassmorphism styling and modern gradients
- Smooth animations with hover effects
- Card-based layout and clean type hierarchy

---

## 🧰 Tech Stack

| Layer        | Technology                            |
|--------------|----------------------------------------|
| Frontend     | React 18, TypeScript, Tailwind CSS     |
| State Mgmt   | React Context API                      |
| Auth (Mock)  | LocalStorage                           |
| Icons        | Lucide React                           |
| Build Tool   | Vite                                   |
| Deployment   | Netlify / Vercel / GitHub Pages        |

---

## ⚙️ Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/mschaware/Wishlist_Apk.git
cd Wishlist_Apk

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open your browser and navigate to `http://localhost:5173`

---

## 👤 Demo Users

Use these for simulating collaboration:
- john@example.com / password123
- jane@example.com / password123

---

## 🗂️ Project Structure

```
src/
├── components/          # UI elements
├── context/             # React Contexts (auth, wishlist)
├── types/               # TypeScript types
├── App.tsx              # Root component
└── main.tsx             # Entry point
```

---

## 🚧 Known Limitations

| Feature         | Status                          |
|----------------|----------------------------------|
| Auth           | Mocked with localStorage         |
| Collaboration  | Invite system is simulated       |
| Data Persistence | LocalStorage (no backend yet) |
| Real-Time Sync | Only within same browser session |

---

## 🔮 Future Improvements

- 💬 Emoji reactions and comments on items
- 📦 Wishlist categories and filtering
- 🔔 Notifications for updates
- 🕸️ WebSocket support for multi-user real-time sync
- 🧠 Firebase/Auth0 integration for auth
- 💾 Cloud storage for persistent product data
- 📤 CSV/JSON import/export of wishlists
- 📱 PWA support for offline functionality
- 🧪 Unit/integration tests + CI/CD pipeline

---

## 🧵 Scaling Strategy

- Replace localStorage with Firestore or Supabase
- Move to JWT-based auth with refresh tokens
- Add backend layer (Node.js + Express) with MongoDB/PostgreSQL
- Use serverless functions or WebSocket/Socket.io for collaboration
- Deploy with Vercel/Netlify including environment config

---

## 📸 Screenshots

_Add screenshots here of your app’s UI (dashboard, wishlist view, add product form, etc.)_

---

## 📄 License

This project was created by **Mayur Chaware** for the FlockShop.ai internship assignment (May 2025).  
Intended for educational and evaluation purposes only.

---

