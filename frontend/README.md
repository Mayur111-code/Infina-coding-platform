# 🌐 Infina Coding Platform

----

## 🔗 Deployed Link

<<<<<<< HEAD:frontend/README.md
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration
=======
🚀 **Live Demo:** [Click Here to Visit Infina Coding Platform](https://inficode.netlify.app/)  

You can explore the complete platform live, including dashboard, challenges, earnings, and marketplace pages.
>>>>>>> 24742a21d20b4f4a52200eb2470483f5a8537fd4:README.md

----


Welcome to **Infina** — a modern, web-based coding learning platform designed for learners to solve challenges, earn points, and redeem exciting rewards.  
This **frontend version** is built using **Bootstrap**, **JavaScript**, and a **JSON Server** acting as a mock backend.

---

## 🚀 Project Overview

**Infina** provides a fully interactive dashboard experience where users can:

- 👤 Register and view personalized progress  
- 🧩 Solve coding challenges  
- 💰 Track earnings and redeemed points  
- 🎁 Explore and redeem rewards from the marketplace  

It’s built to simulate a real-world learning platform with gamified elements — making learning fun and rewarding.


## 🛠️ Tech Stack

| Technology | Purpose |
|-------------|----------|
| **HTML5, CSS3** | Structure and styling |
| **Bootstrap 5** | Responsive UI components |
| **JavaScript (ES6)** | Core logic and interactivity |
| **JSON Server** | Mock backend API for testing |
| **npm (Vite)** | Local dev server & build tools |

---

## ⚙️ Installation & Setup

### 🔹 1. Clone the Repository
```bash
git clone https://github.com/Mayur111-code/Infina-coding-platform.git
cd Infina-coding-platform
🔹 2. Install Dependencies
bash
Copy code
npm install
🔹 3. Run the Frontend
bash
Copy code
npm run dev
🔹 4. Start JSON Server (Mock API)
bash
Copy code
json-server --watch db.json --port 3000
✅ The app will run on:
Frontend: http://localhost:5173

Mock API: http://localhost:3000

📂 Folder Structure
bash
Copy code
Infina-Coding-Platform/
│
├── json-server/                 # Mock backend server folder
│   ├── db.json                  # JSON database for mock API
│   └── server.js                # Local JSON server configuration
│
├── myapp/                       # Main frontend application (Vite + React)
│   ├── dist/                    # Production build output
│   ├── public/                  # Static assets (favicon, logos, etc.)
│   ├── src/                     # Source code
│   │   ├── Api/                 # API request handlers and mock data
│   │   ├── assets/              # Images, icons, and UI assets
│   │   ├── Components/          # Reusable UI components (Navbar, Cards, etc.)
│   │   ├── Context/             # React Context for global state
│   │   ├── Hooks/               # Custom React hooks
│   │   ├── Pages/               # Individual pages (Dashboard, Challenges, Earnings, Marketplace)
│   │   ├── App.jsx              # Root React component
│   │   ├── App.css              # Global CSS styles
│   │   ├── index.css            # Base styles and resets
│   │   └── main.jsx             # React app entry point
│   │
│   ├── .gitignore               # Files & folders to ignore by Git
│   ├── eslint.config.js         # ESLint configuration for code linting
│   ├── index.html               # Main HTML template
│   ├── package.json             # Project dependencies & scripts
│   ├── package-lock.json        # Dependency lock file
│   ├── postcss.config.js        # PostCSS configuration
│   ├── tailwind.config.js       # Tailwind CSS configuration (optional)
│   └── README.md                # Project documentation (this file)
│
├── node_modules/                # Installed npm packages
└── _redirects                   # Deployment redirect file
🎯 Features
✅ Responsive dashboard with progress tracking
✅ 275+ coding challenges (mock data)
✅ Earnings & XP tracking system
✅ Reward redemption marketplace
✅ JSON-based mock backend (no real database needed)
✅ Clean and modern Bootstrap UI

🧩 Future Enhancements
Upcoming backend integration plan:

🔐 Real user authentication (JWT + MongoDB)

👑 Admin panel for managing challenges

🏆 Dynamic leaderboard

📊 Live analytics and XP progress tracking

👨‍💻 Developer
Developed by: Mayur Borse
Role: Frontend Developer | Creator of Infina AI & Infina Coding Platform

📜 License
This project is open-source and available under the MIT License.

⭐ If you like this project, give it a star on GitHub to support future development!
markdown
Copy code

---

### ✅ How to use:
1. Copy the full content above ⬆️  
2. Paste it into your project’s main `README.md` file  
3. Create a folder named `/screenshots` inside your repo  
4. Add your 4 images:
   - `dashboard.png`  
   - `challenges.png`  
   - `earnings.png`  
   - `marketplace.png`  
5. Run:
   ```bash
   git add README.md
   git commit -m "Added professional README for Infina Coding Platform"
   git push origin main
