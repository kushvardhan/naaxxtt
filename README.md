# 🌟 NullFlow - Developer Q&A Platform

<div align="center">
  <img src="public/favicon.svg" alt="NullFlow Logo" width="120" height="120">

**A modern, feature-rich Q&A platform for developers**

[![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-purple?style=for-the-badge&logo=clerk)](https://clerk.com/)

</div>

---

## 📋 Table of Contents

- [🌟 Overview](#-overview)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [📁 Project Structure](#-project-structure)
- [🎨 UI/UX Features](#-uiux-features)
- [🔧 Configuration](#-configuration)
- [📱 Responsive Design](#-responsive-design)
- [🌙 Theme System](#-theme-system)
- [🔐 Authentication](#-authentication)
- [📊 Database Schema](#-database-schema)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🌟 Overview

**NullFlow** is a sophisticated, modern Q&A platform designed specifically for developers. Built with cutting-edge technologies, it provides a seamless experience for asking questions, sharing knowledge, and building a thriving developer community.

### 🎯 Mission

To create the ultimate platform where developers can:

- **Ask** technical questions and get expert answers
- **Share** knowledge and help fellow developers
- **Learn** from a vibrant community of professionals
- **Grow** their skills and advance their careers

---

## ✨ Features

### 🔥 Core Features

- **🤔 Question & Answer System**: Post questions, provide detailed answers with rich text editing
- **🏷️ Smart Tagging**: Organize content with intelligent tag system
- **👥 Community Profiles**: Comprehensive user profiles with stats and achievements
- **🔍 Advanced Search**: Global search with filters and smart suggestions
- **⭐ Voting System**: Upvote/downvote questions and answers
- **💾 Collections**: Save and organize favorite questions
- **🤖 AI Integration**: Get AI-powered answer suggestions
- **💼 Job Board**: Discover exciting career opportunities

### 🎨 UI/UX Excellence

- **🌙 Dark/Light Theme**: Seamless theme switching with system preference detection
- **📱 Fully Responsive**: Perfect experience across all devices
- **🎭 Beautiful Animations**: Smooth transitions and micro-interactions
- **🎨 Modern Design**: Clean, intuitive interface with orange accent theme
- **⚡ Performance Optimized**: Fast loading with optimized images and code splitting

### 🔧 Advanced Features

- **📄 Pagination**: Efficient content loading with beautiful pagination controls
- **🔐 Secure Authentication**: Powered by Clerk with social login options
- **📊 Real-time Stats**: Live user statistics and activity tracking
- **🏆 Reputation System**: Gamified experience with points and badges
- **📱 Mobile-First**: Optimized mobile navigation and interactions

---

## 🛠️ Tech Stack

### **Frontend**

- **⚛️ Next.js 15.3.5** - React framework with App Router
- **🔷 TypeScript** - Type-safe development
- **🎨 Tailwind CSS** - Utility-first CSS framework
- **🧩 Radix UI** - Accessible component primitives
- **🎭 Framer Motion** - Smooth animations
- **🔍 Lucide React** - Beautiful icons

### **Backend**

- **🟢 Node.js** - JavaScript runtime
- **🍃 MongoDB** - NoSQL database
- **🔗 Mongoose** - MongoDB object modeling
- **🔐 Clerk** - Authentication and user management
- **📝 TinyMCE** - Rich text editor

### **Development Tools**

- **📦 npm** - Package management
- **🔧 ESLint** - Code linting
- **💅 Prettier** - Code formatting
- **🔍 TypeScript** - Static type checking

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.0 or higher
- **npm** or **yarn**
- **MongoDB** database
- **Clerk** account for authentication

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/nullflow.git
   cd nullflow
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Fill in your environment variables:

   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

   # Database
   MONGODB_URL=your_mongodb_connection_string

   # Optional APIs
   OPENAI_API_KEY=your_openai_api_key
   NEXT_PUBLIC_TINY_API_KEY=your_tinymce_api_key
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
nullflow/
├── 📁 src/
│   ├── 📁 app/                    # Next.js App Router
│   │   ├── 📁 (root)/            # Main application routes
│   │   │   ├── 📄 page.tsx       # Home page
│   │   │   ├── 📁 ask-question/  # Question creation
│   │   │   ├── 📁 community/     # User community
│   │   │   ├── 📁 find-jobs/     # Job board
│   │   │   ├── 📁 profile/       # User profiles
│   │   │   ├── 📁 question/      # Question details
│   │   │   └── 📁 tags/          # Tag system
│   │   ├── 📁 api/               # API routes
│   │   └── 📄 layout.tsx         # Root layout
│   ├── 📁 components/            # Reusable components
│   │   ├── 📁 forms/            # Form components
│   │   ├── 📁 Shared/           # Shared components
│   │   └── 📁 ui/               # UI primitives
│   └── 📁 lib/                   # Utilities and configurations
├── 📁 database/                  # Database models
├── 📁 context/                   # React contexts
├── 📁 public/                    # Static assets
└── 📄 README.md                  # This file
```

---

## 🎨 UI/UX Features

### 🎭 Design Philosophy

- **Minimalist**: Clean, uncluttered interface
- **Accessible**: WCAG compliant with keyboard navigation
- **Consistent**: Unified design language throughout
- **Intuitive**: Self-explanatory user interactions

### 🌈 Color Scheme

- **Primary**: Orange gradient (`#fbbf24` → `#ea580c`)
- **Dark Theme**: Deep grays with orange accents
- **Light Theme**: Clean whites with subtle shadows

### 📱 Mobile Experience

- **Responsive Navigation**: Collapsible mobile menu
- **Touch Optimized**: Large touch targets
- **Gesture Support**: Swipe and tap interactions
- **Performance**: Optimized for mobile networks

---

## 🔧 Configuration

### 🌙 Theme System

The application features a sophisticated theme system:

- **Auto-detection**: Respects system preferences
- **Manual Toggle**: User can override system settings
- **Persistent**: Theme choice saved in localStorage
- **Smooth Transitions**: Animated theme switching

### 📊 Pagination

- **Configurable**: Adjustable items per page (7 questions per page)
- **Performance**: Efficient database queries
- **User-Friendly**: Clear navigation controls
- **Responsive**: Adapts to screen size

---

## 🔐 Authentication

Powered by **Clerk** for enterprise-grade security:

- **Social Login**: Google, GitHub, Discord
- **Email/Password**: Traditional authentication
- **Magic Links**: Passwordless login
- **Session Management**: Secure token handling
- **User Profiles**: Rich user data management

---

## 📊 Database Schema

### 👤 User Model

```typescript
interface IUser {
  clerkId: string;
  username: string;
  name: string;
  email: string;
  image: string;
  about: string;
  location?: string;
  portfolioWebsite?: string;
  reputation: number;
  saved: ObjectId[];
  joinedAt: Date;
}
```

### ❓ Question Model

```typescript
interface IQuestion {
  title: string;
  explanation: string;
  tags: ObjectId[];
  author: ObjectId;
  upvotes: ObjectId[];
  downvotes: ObjectId[];
  views: number;
  answers: ObjectId[];
  createdAt: Date;
}
```

### 💬 Answer Model

```typescript
interface IAnswer {
  author: ObjectId;
  question: ObjectId;
  content: string;
  upvotes: ObjectId[];
  downvotes: ObjectId[];
  createdAt: Date;
}
```

---

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**: Link your GitHub repository
2. **Environment Variables**: Set up in Vercel dashboard
3. **Deploy**: Automatic deployment on push
4. **Custom Domain**: Configure your domain

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Test** thoroughly
5. **Submit** a pull request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <h3>🌟 Built with ❤️ by the NullFlow Team</h3>
  <p>
    <a href="https://github.com/yourusername/nullflow/issues">Report Bug</a> •
    <a href="https://github.com/yourusername/nullflow/issues">Request Feature</a> •
    <a href="https://nullflow.vercel.app">Live Demo</a>
  </p>
</div>
