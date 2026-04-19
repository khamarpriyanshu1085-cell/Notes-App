# 📝 Notes Taking App (MERN Stack)

A full-stack Notes Taking Application built using **MongoDB, Express.js, and Node.js** with a clean and responsive frontend using **HTML, CSS, and JavaScript**.

This app allows users to create, edit, delete, and pin notes with real-time updates from a backend API.
---
## 🚀 Features

* ✅ Create new notes
* ✏️ Edit existing notes
* 🗑️ Delete notes
* ⭐ Pin / Unpin important notes
* 🕒 Auto display date & time
* 🔄 Real-time data sync with backend
* 🔐 User authentication (basic setup)
* 📱 Responsive UI
---
## 🛠️ Tech Stack
### Frontend
* HTML
* CSS
* JavaScript (Vanilla)
### Backend
* Node.js
* Express.js
* MongoDB
* Mongoose
### Other Libraries
* bcrypt (for password hashing)
* cors (for API access)
---

## ⚙️ Installation & Setup
###  Setup Backend
```bash
cd backend
npm install
```
Run server:
```bash
npm start
```
Server will run on:
```
http://localhost:5001
```
MongoDB connection (already configured in db.js):
```js
mongodb://127.0.0.1:27017/notes_app
###  Run Frontend
Simply open:
```
index.html
```
in your browser
## 🔌 API Endpoints
### 🔹 Notes
| Method | Endpoint       | Description    |
| ------ | -------------- | -------------- |
| GET    | /notes         | Get all notes  |
| POST   | /notes         | Create a note  |
| PUT    | /notes/:id     | Update a note  |
| DELETE | /notes/:id     | Delete a note  |
| PUT    | /notes/:id/pin | Pin/Unpin note |

### 🔹 Authentication

| Method | Endpoint                 | Description         |
| ------ | ------------------------ | ------------------- |
| POST   | /api/auth/create-account | Create user account |

## 📸 UI Overview

* Clean grid layout for notes
* Modal-based note creation
* Icons for edit, delete, and pin
* Hover animations for better UX
* Date (right) & Time (left) display

## 💡 How It Works

* Frontend sends API requests using `fetch()`
* Backend handles CRUD operations via Express
* MongoDB stores notes with timestamps
* Notes are sorted by pinned status
* UI updates dynamically after every action

Example API call:

```js
fetch("http://localhost:5001/notes")
```



---

## 🔒 Data Model

### Note Schema

```js
{
  title: String,
  content: String,
  isPinned: Boolean,
  user: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```



---

## ⚠️ Requirements

* Node.js (v18+)
*  ⚠️ Important
Make sure MongoDB is installed and running locally before starting the backend.
Run:
net start MongoDB
OR
mongod
* Modern browser

## 📌 Future Improvements

* 🔑 Login / JWT authentication
* ☁️ Cloud database (MongoDB Atlas)
* 🎨 Dark mode UI
* 🔍 Search & filter notes
* 📱 Mobile app version

---

## 👨‍💻 Author

**Priyanshu Khamar**

---

## ⭐ If you like this project

Give it a ⭐ on GitHub and share it!

---
