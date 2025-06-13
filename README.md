# 🌐 Iron Track App

Iron Track - Full-stack fitness tracker built with Next.js 15, MongoDB and NextAuth. Implemented secure authentication, workout session tracking with custom exercises, and data visualization via Recharts. Used Zustand for local state and Mongoose for persistent storage. Built responsive UI with Tailwind CSS and Shadcn UI.

## 📋 Project Overview

Iron Track helps users:
- Track workouts by date, exercise, weight, and reps.
- Add custom exercises within categorized muscle groups.
- View workout details and history with detailed breakdowns.
- Visualize progress using charts.
- Authenticate securely via email/password or Google OAuth.
- Protect user data with session-based access control.

## 🧠 Key Features
- 🔒 Authentication with NextAuth (Credentials & Google)
- 📈 Workout Progress Visualization using Recharts
- ⏱ Workout Timer per session with automatic tracking
- 🗃 Custom Exercise Management per user
- 🌐 Multi-language support via next-intl
- 🌙 Dark mode with next-themes
- 💬 User feedback with Toast notifications
- 📦 MongoDB backend with Mongoose ORM
- 💾 Zustand for client-side state management

## 🛠️ Tech Stack
### Frontend:
- **Next.js 15**
- **React 19**
- **TypeScript**
- **Tailwind CSS (+ tailwind-merge, clsx)**
- **Radix UI components**
- **Lucide Icons**
- **react-hook-form + zod**
- **react-toastify**
- **react-day-picker, recharts**

### Backend:
- **MongoDB + Mongoose**
- **NextAuth (JWT-based sessions)**
- **BcryptJS for password hashing**
- **REST API (App Router handlers in Next.js)**

## Installation & Setup

Follow the steps below to get the project running on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/elena-savitskaya/iron-track.git
```

cd iron-track

### 2. Install Dependencies

Run the following command to install all the required dependencies:

```bash
npm install
```

### 3. Setup Environment Variables
Create a .env.local file with:

- MONGO_URI=your_mongo_uri
- NEXTAUTH_SECRET="your_nextauth_secret
- GOOGLE_CLIENT_ID=your_google_client_id
- GOOGLE_CLIENT_SECRET=your_google_client_secret


### 4. Run the app

To start the development server with Hot Module Replacement (HMR), run:

```bash
npm run dev
```
