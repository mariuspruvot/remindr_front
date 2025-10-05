# 🚀 Remindr Frontend Setup Guide

## 📋 Prerequisites

- Node.js installed
- Clerk account (for authentication)
- Django backend running

---

## 🔧 Setup Steps

### 1. Create `.env` file

Create a file named `.env` in the `remindr_frontend/` directory:

```bash
# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here

# Backend API URL
VITE_API_URL=http://localhost:8000/api
```

### 2. Get Clerk Keys

1. Go to [clerk.com](https://clerk.com)
2. Create a new application (or use existing)
3. Go to **API Keys** in the dashboard
4. Copy your **Publishable Key** (starts with `pk_test_`)
5. Paste it in `.env` as `VITE_CLERK_PUBLISHABLE_KEY`

### 3. Configure Clerk for your Backend

In your Clerk dashboard:

- Go to **JWT Templates** → Create new template
- Name it "remindr" or similar
- Note the JWKS URL (you'll need this for Django backend)

### 4. Run the app

```bash
npm run dev
```

---

## 🎯 How it works

### Authentication Flow

1. User visits `/` (Landing page)
2. Clicks "Get Started" or "Sign In"
3. Clerk handles the auth flow (modal)
4. After auth, redirected to `/dashboard`

### Protected Routes

All routes except `/` require authentication:

- `/dashboard` - Overview with stats
- `/reminders` - Full reminders list
- `/channels` - Channel management
- `/settings` - User settings (Clerk profile)

### API Integration

- All API calls go through `lib/api.ts` (Axios instance)
- React Query handles caching & state management
- Hooks in `hooks/` folder (`useReminders`, `useOutputs`)
- Automatic token injection from Clerk (see `api.ts` interceptor)

### State Management

- **React Query** - Server state (API data)
- **React Router** - Navigation
- **Clerk** - Authentication state
- **Local State** - Modal open/close, form state

---

## 🔗 Connecting to Django Backend

### Update `lib/api.ts` interceptor:

Once Clerk is configured, uncomment these lines in `lib/api.ts`:

```typescript
// Request interceptor - Add auth token from Clerk
api.interceptors.request.use(
  async (config) => {
    // UNCOMMENT THESE LINES:
    const token = await window.Clerk?.session?.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
  // ...
);
```

### Django Backend Requirements

Your Django backend should:

1. Accept JWT tokens from Clerk
2. Have endpoints matching the API calls in `hooks/`
3. Return data in the format defined in `types/reminder.types.ts`

---

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/           # Route pages
├── layouts/         # Layout wrappers
├── hooks/           # React Query hooks (API)
├── lib/             # Configuration (axios, react-query)
├── types/           # TypeScript types
├── utils/           # Helper functions (toast, etc.)
└── App.tsx          # Main app with routing
```

---

## 🐛 Troubleshooting

### "Missing Clerk Publishable Key" error

- Make sure `.env` exists in `remindr_frontend/`
- Make sure the variable name is exactly `VITE_CLERK_PUBLISHABLE_KEY`
- Restart the dev server after creating `.env`

### API calls fail with 401

- Check that Clerk token is being sent (see Network tab)
- Verify Django is configured to accept Clerk JWTs
- Check `VITE_API_URL` matches your backend

### Modals don't work

- Check z-index values (ChannelModal: 60, ReminderModal: 50, Navbar: 50)
- Check that modal state is managed in `MainLayout.tsx`

---

## 🎓 Next Steps

1. ✅ Setup Clerk authentication
2. ✅ Create `.env` file
3. ✅ Run the app and test landing page
4. 🔄 Connect Django backend
5. 🔄 Test full flow: auth → create channel → create reminder

---

**Need help?** Check the comments in the code - all TODO markers show where API calls happen!
