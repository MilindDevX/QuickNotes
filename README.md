# QuickNotes 📝

A modern, full-stack note-taking application built with React and Node.js. QuickNotes helps you capture, organize, and manage your thoughts with a beautiful, intuitive interface.

![QuickNotes Banner](https://img.shields.io/badge/QuickNotes-Note%20Taking%20App-blue?style=for-the-badge)

## 🌐 Live Demo

- **Frontend**: [https://quick-notes-mu-virid.vercel.app/](https://quick-notes-mu-virid.vercel.app/)
- **Backend API**: [https://quicknotes-api-u6bs.onrender.com/api](https://quicknotes-api-u6bs.onrender.com/api)

## ✨ Features

- 🔐 **Secure Authentication** - JWT-based user authentication with encrypted passwords
- ✍️ **Create & Edit Notes** - Easy note creation and editing with a clean interface
- 🔍 **Smart Search** - Instantly find notes by title or content
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- 🎨 **Modern UI** - Beautiful gradient design with smooth animations
- ☁️ **Cloud Storage** - Notes are stored securely in the cloud via Supabase PostgreSQL
- 🚀 **Fast Performance** - Optimized for speed with Vite and React

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **React Hot Toast** - Beautiful toast notifications
- **Lucide React** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Prisma** - Modern ORM for database management
- **PostgreSQL** - Relational database (via Supabase)
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL database** (Supabase account recommended)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/MilindDevX/QuickNotes.git
cd QuickNotes
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
DATABASE_URL="postgresql://[user]:[password]@[host]:[port]/[database]?pgbouncer=true"
DIRECT_URL="postgresql://[user]:[password]@[host]:[port]/[database]"
JWT_SECRET="your-super-secret-jwt-key"
PORT=5001
FRONTEND_URL="http://localhost:5173"
```

Run database migrations:

```bash
npx prisma generate
npx prisma db push
```

Start the backend server:

```bash
npm run dev
```

The backend will run on `http://localhost:5001`

### 3. Setup Frontend

Open a new terminal and navigate to the client directory:

```bash
cd client
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📁 Project Structure

```
QuickNotes/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components (Home, Login, Signup, Dashboard)
│   │   ├── context/       # React context for state management
│   │   ├── api.js         # Axios configuration
│   │   ├── App.jsx        # Main App component
│   │   └── main.jsx       # Entry point
│   ├── public/            # Static assets
│   └── package.json
│
├── server/                # Backend Node.js application
│   ├── controllers/       # Request handlers
│   │   ├── authController.js
│   │   └── notesController.js
│   ├── middleware/        # Custom middleware
│   │   └── authMiddleware.js
│   ├── routes/           # API routes
│   │   ├── auth.js
│   │   └── notes.js
│   ├── prisma/           # Database schema
│   │   └── schema.prisma
│   ├── index.js          # Server entry point
│   └── package.json
│
└── README.md
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create a new user account
- `POST /api/auth/login` - Login and receive JWT token

### Notes (Protected Routes)
- `GET /api/notes` - Get all notes for authenticated user
- `GET /api/notes?search=query` - Search notes by title or content
- `POST /api/notes` - Create a new note
- `PUT /api/notes/:id` - Update an existing note
- `DELETE /api/notes/:id` - Delete a note

## 🌐 Deployment

### Frontend (Vercel)

The frontend is deployed on Vercel:

```bash
cd client
vercel --prod
```

Make sure to add environment variables in Vercel dashboard if needed.

### Backend (Render)

The backend is deployed on Render. Set the following environment variables:

- `DATABASE_URL`
- `DIRECT_URL`
- `JWT_SECRET`
- `FRONTEND_URL`

Build command: `npm install && npx prisma generate && npx prisma db push`

Start command: `npm start`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Milind Bansal**

- GitHub: [@MilindDevX](https://github.com/MilindDevX)

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- UI inspiration from modern note-taking applications
- Database hosting by [Supabase](https://supabase.com/)

## 📧 Contact

For any questions or feedback, please reach out through GitHub issues.

---

Made with by Milind Bansal
