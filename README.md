# Remindr.dev - Simple Reminder App

A clean, minimal reminder application built with Next.js 15, TypeScript, and Clerk authentication.

## ✨ Features

- 🎨 **Clean Design**: Simple, focused UI without distractions
- 🔐 **Secure Authentication**: Powered by Clerk
- ⏰ **Smart Reminders**: Set reminders with timezone support
- 🔗 **URL Shortening**: Automatic short link generation
- 📧 **Email Notifications**: Reliable email alerts
- 🌙 **Dark Mode**: Built-in dark/light theme support
- 📱 **Responsive**: Works on all devices

## 🏗️ Project Structure

```
remindr_front/
├── app/
│   ├── layout.tsx               # Root layout with Clerk provider
│   └── page.tsx                 # Main page (auth + app)
├── components/
│   └── reminder/                # Reminder form components
├── lib/                         # Utilities and services
│   ├── actions/                 # Server actions
│   ├── services/                # API services
│   ├── types/                   # TypeScript types
│   └── utils/                   # Helper functions
├── styles/
│   └── globals.css              # Clean, minimal styles
└── middleware.ts                # Clerk middleware
```

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   # Add your Clerk keys and API URL to .env.local
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Design Philosophy

- **Minimal**: Clean, uncluttered interface
- **Focused**: One thing at a time
- **Accessible**: Clear typography and contrast
- **Fast**: No unnecessary animations or effects

## 🔧 Configuration

### Clerk Authentication
- Configure your Clerk keys in `.env.local`
- Clean, integrated styling
- No external redirects

### Backend Integration
- Configurable API URL via environment variables
- Automatic token handling with Clerk

## 📱 Responsive Design

Simple, responsive design that works on:
- 📱 Mobile phones
- 💻 Desktop computers

## 🚀 Deployment

Ready for deployment on Vercel, Netlify, or any Next.js platform.

---

Made with simplicity in mind
