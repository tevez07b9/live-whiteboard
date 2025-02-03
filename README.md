# 🖊️ Live Collaboration Whiteboard

A **real-time, multiplayer** whiteboard that lets users draw, erase and collaborate seamlessly—just like Figma! Built using **React, WebSockets, and Node.js**, with deployment on **AWS EC2** for both frontend and backend.

🚀 **Try it live:** [here](http://13.53.193.93/)

---

## 📸 Preview Video

[here](https://tevez07b9.github.io/tevez07b9/public/live-board.webm)

## ✨ Features

✅ **Real-time drawing & erasing** with brush size & color selection  
✅ **Undo / Redo & Persistent Drawings** – so no work is lost!  
✅ **WebSocket-powered fast sync** across all users  
✅ **Fully deployed on AWS (Frontend + Backend)**

---

## 🛠️ Tech Stack

**Frontend:**

- React + TypeScript + Vite
- WebSockets (`ws`)
- TailwindCSS + Shadcn UI
- HTML5 Canvas for drawing

**Backend:**

- Node.js + Express
- `ws` for WebSockets
- Hosted on AWS EC2 (Nginx for reverse proxy)

---

## 🚀 Setup & Run Locally

### 1️⃣ Clone the frontend and backend repos

```sh
git clone https://github.com/tevez07b9/live-whiteboard.git client
git clone https://github.com/tevez07b9/web-sockets-backend.git backend
```

### 2️⃣ Install dependencies

### Install frontend

```sh
cd client
npm install
```

### Install backend

```sh
cd ../backend
npm install
```

### 3️⃣ Run the backend

```sh
cd backend
npm run dev
```

### 4️⃣ Run the frontend

First duplicate the `.env.example` file
Your backend will run on port 5000 so the content wil be

```
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=ws://localhost:5000
```

Then run the frontend

```sh
cd ../client
npm run dev

```

## 🌍 Deployment (AWS + Nginx)

- Frontend deployed on EC2 (Nginx serving Vite build)
- Backend deployed on EC2 (Node.js + WebSockets)
- WebSockets & REST API secured with Nginx reverse proxy

## 💡 Future Enhancements

- 🚀 Save drawings as images (PNG, SVG, PDF)
- 🚀 Add voice/video chat for better collaboration
- 🚀 Implement layers (like Photoshop!)
- 🚀 Support gesture-based drawing (touchscreens)

## 💙 Contributing

Pull requests are welcome! If you find a bug or have an idea, create an issue or open a PR.

## 📝 License

MIT License. Feel free to use and improve!
