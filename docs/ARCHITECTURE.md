# 🏗️ Frontend Architecture

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── common/         # Reusable UI components (Modal, Forms)
│   ├── ChannelModal.tsx
│   ├── ChannelsList.tsx
│   ├── Navbar.tsx
│   ├── OutputChannels.tsx
│   ├── ReminderFormModal.tsx
│   ├── ReminderTable.tsx
│   ├── Sidebar.tsx
│   ├── StatsCard.tsx
│   └── StatusBadge.tsx
├── constants/          # Application constants
│   ├── animations.ts   # Framer Motion variants
│   └── index.ts        # General constants
├── hooks/              # React Query hooks
│   ├── useOutputs.ts   # Channel/Output operations
│   └── useReminders.ts # Reminder operations
├── layouts/            # Page layouts
│   └── MainLayout.tsx  # Main app layout with nav/sidebar
├── lib/                # External library configurations
│   ├── api.ts          # Axios instance & interceptors
│   └── queryClient.ts  # React Query configuration
├── pages/              # Route pages
│   ├── Channels.tsx    # Channel management page
│   ├── Dashboard.tsx   # Main dashboard
│   ├── Landing.tsx     # Public landing page
│   ├── Reminders.tsx   # Reminders list page
│   └── Settings.tsx    # User settings (Clerk)
├── types/              # TypeScript type definitions
│   └── reminder.types.ts
├── utils/              # Utility functions
│   ├── reminder-helpers.ts  # Formatting & display helpers
│   └── toast.tsx       # Toast notification utility
├── App.tsx             # Main app with routing
├── main.tsx            # App entry point
└── index.css           # Global styles
```

---

## 🎯 Design Principles

### **1. Separation of Concerns**

- **Components**: UI rendering only
- **Hooks**: Data fetching & state management
- **Utils**: Pure functions for transformations
- **Constants**: Centralized configuration

### **2. DRY (Don't Repeat Yourself)**

- Reusable components in `components/common/`
- Shared animations in `constants/animations.ts`
- Centralized constants in `constants/index.ts`
- Type definitions in one place

### **3. KISS (Keep It Simple, Stupid)**

- Components do one thing well
- Clear naming conventions
- No over-engineering

### **4. Clean Code**

- Consistent formatting (Prettier)
- TypeScript strict mode
- Descriptive variable names
- Comments for complex logic

---

## 🔄 Data Flow

```
┌─────────────┐
│   Pages     │  ← Route components, orchestrate everything
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Hooks     │  ← React Query (API calls, caching, state)
│ (useReminders│
│  useOutputs) │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   lib/api   │  ← Axios instance (HTTP client)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Django    │  ← Backend API
│   Backend   │
└─────────────┘
```

---

## 🎨 Component Patterns

### **Smart Components** (Pages)

- Handle data fetching
- Manage state
- Pass data to dumb components

```tsx
// Example: pages/Dashboard.tsx
function Dashboard() {
  const { data: reminders } = useReminders(); // ← Fetch data
  return <ReminderTable reminders={reminders} />; // ← Pass to dumb component
}
```

### **Dumb Components** (UI)

- Receive props
- Render UI
- No data fetching

```tsx
// Example: components/ReminderTable.tsx
function ReminderTable({ reminders }: { reminders: Reminder[] }) {
  return <table>...</table>; // ← Just render
}
```

### **Common Components** (Reusable)

- Generic, configurable
- Used across the app
- Well-documented props

```tsx
// Example: components/common/Modal.tsx
<Modal isOpen={true} title="Edit" onClose={() => {}}>
  <p>Content</p>
</Modal>
```

---

## 🪝 Hooks Pattern

All API operations use React Query hooks:

```tsx
// hooks/useReminders.ts
export const useReminders = () => {
  return useQuery({
    queryKey: ["reminders"],
    queryFn: async () => {
      const { data } = await api.get("/reminders/");
      return data.reminders;
    },
  });
};

export const useCreateReminder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (reminder) => await api.post("/reminders/", reminder),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] }); // ← Auto-refresh
    },
  });
};
```

**Benefits:**

- ✅ Automatic caching
- ✅ Auto-refresh on mutations
- ✅ Loading & error states
- ✅ Retry logic

---

## 🎭 Animation Strategy

All animations are centralized in `constants/animations.ts`:

```tsx
import { fadeIn, staggerContainer } from "../constants/animations";

<motion.div variants={fadeIn} initial="initial" animate="animate">
  Content
</motion.div>;
```

**Why?**

- ✅ Consistent animations
- ✅ Easy to modify globally
- ✅ Reusable across components

---

## 🔐 Authentication Flow

```
User → Clerk (modal) → JWT token → Axios interceptor → Backend
```

1. User signs in via Clerk modal
2. Clerk provides JWT token
3. Axios interceptor adds token to all requests
4. Django verifies token with Clerk

---

## 📝 Naming Conventions

### **Files**

- Components: `PascalCase.tsx` (e.g., `ReminderTable.tsx`)
- Hooks: `camelCase.ts` with `use` prefix (e.g., `useReminders.ts`)
- Utils: `kebab-case.ts` (e.g., `reminder-helpers.ts`)

### **Variables**

- React components: `PascalCase`
- Functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- Types/Interfaces: `PascalCase`

### **React Query Keys**

- Always array: `["reminders"]`, `["reminders", id]`
- Hierarchical: `["outputs", "validation"]`

---

## 🧪 Testing Strategy (To Implement)

```
tests/
├── components/      # Component tests (Vitest + React Testing Library)
├── hooks/           # Hook tests (React Hooks Testing Library)
└── utils/           # Pure function tests (Vitest)
```

---

## 🚀 Performance Optimization

### **React Query**

- Automatic caching (5 min stale time)
- Refetch on window focus
- Retry failed requests

### **Code Splitting**

- Lazy load routes
- Dynamic imports for modals

### **Optimizations Applied**

- ✅ Framer Motion animations optimized
- ✅ React Query caching
- ✅ Memoized expensive calculations (if needed)

---

## 📚 Key Dependencies

| Dependency        | Purpose                 |
| ----------------- | ----------------------- |
| **React**         | UI framework            |
| **TypeScript**    | Type safety             |
| **Vite**          | Build tool              |
| **React Router**  | Navigation              |
| **React Query**   | Server state management |
| **Axios**         | HTTP client             |
| **Clerk**         | Authentication          |
| **Framer Motion** | Animations              |
| **Tailwind CSS**  | Styling                 |
| **DaisyUI**       | UI components           |
| **Lucide React**  | Icons                   |

---

## 🔧 Adding New Features

### **1. New Page**

1. Create file in `pages/`
2. Add route in `App.tsx`
3. Add link in `Sidebar.tsx`

### **2. New API Endpoint**

1. Add types in `types/reminder.types.ts`
2. Create hook in `hooks/`
3. Use hook in page/component

### **3. New Component**

1. Create in appropriate folder
2. Export from `index.ts` if common
3. Add JSDoc comments

---

## 📖 Best Practices

✅ **DO**

- Use TypeScript strict mode
- Write descriptive variable names
- Extract reusable logic into hooks/utils
- Use constants instead of magic values
- Add comments for complex logic

❌ **DON'T**

- Fetch data in components (use hooks)
- Duplicate code (DRY principle)
- Use `any` type in TypeScript
- Put business logic in components
- Hardcode URLs, strings, numbers

---

**Need help? Check `SETUP.md` and `CONNEXION_API.md`!**
