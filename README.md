# 🏥 Star Hospital Management System

A modern Full Stack Hospital Management and Appointment Booking System built with React, TypeScript, Vite, Express.js, JWT Authentication, and Tailwind CSS.

## 📌 Overview

The Star Hospital Management System is designed to streamline hospital operations by providing secure patient registration, authentication, doctor management, and appointment booking features.

The application includes role-based access control for Patients, Doctors, and Administrators, ensuring secure access to system resources.

---

## ✨ Features

### Authentication
- JWT Authentication
- User Registration
- Secure Login System
- Password Hashing using bcrypt
- Protected Routes

### Patient Features
- Register Account
- Login Dashboard
- Book Appointments
- View Appointment History
- Manage Personal Information

### Doctor Features
- Doctor Dashboard
- View Scheduled Appointments
- Manage Patient Appointments

### Admin Features
- User Management
- Doctor Management
- Appointment Monitoring

### General Features
- Responsive Design
- REST API Integration
- Role-Based Access Control
- Modern User Interface

---

## 🛠️ Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- React Router DOM
- Tailwind CSS
- Lucide React

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcrypt.js
- dotenv

### Development Tools
- Git
- GitHub
- VS Code

---

## 📂 Project Structure

```text
project-root/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── routes/
│   ├── hooks/
│   └── utils/
│
├── server.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
├── .env.example
├── .gitignore
└── README.md
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/DakshRana1

star-hospital-management
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file:

```env
PORT=5000
JWT_SECRET=your_secret_key
```

---

## ▶️ Run Frontend

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## ▶️ Run Backend

```bash
npm run server
```

Backend runs at:

```text
http://localhost:5000
```

---

## 🔐 Demo Credentials

### Patient

```text
Email: patient@gmail.com
Password: patient123
```

### Doctor

```text
Email: Daksh@starhospital.com
Password: doctor123
```

### Admin

```text
Email: admin@starhospital.com
Password: admin123
```

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint |
|----------|----------|
| POST | /api/auth/register |
| POST | /api/auth/login |

### Appointments

| Method | Endpoint |
|----------|----------|
| GET | /api/appointments |
| POST | /api/appointments |
| PUT | /api/appointments/:id |
| DELETE | /api/appointments/:id |

### Doctors

| Method | Endpoint |
|----------|----------|
| GET | /api/doctors |

---

## 🔒 Security Features

- JWT Token Authentication
- Password Hashing using bcrypt
- Protected API Routes
- Role-Based Authorization
- Environment Variable Protection

---

## 🖥️ Screenshots

project screenshots.

![image alt](https://github.com/DakshRana1/Hospital-Management-System/blob/main/Screenshot%202026-06-08%20130546.png?raw=true)
![image alt](https://github.com/DakshRana1/Hospital-Management-System/blob/main/Screenshot%202026-06-08%20131320.png?raw=true)


---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit changes

```bash
git commit -m "Add new feature"
```

4. Push changes

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Daksh Rana

GitHub: https://github.com/DakshRana1
host link : https://dakshrana.netlify.app

