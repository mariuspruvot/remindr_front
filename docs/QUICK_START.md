# 🚀 Quick Start Guide - Frontend Development

## 📖 For New Developers

Ce guide vous explique comment faire les modifications les plus courantes dans le frontend.

---

## 🎯 Tâches Courantes

### **1. Ajouter un nouveau bouton pour ouvrir un modal**

**Exemple:** Ajouter un bouton "New Reminder" quelque part

```tsx
// N'importe quel composant
import { useModals } from "../contexts/ModalContext";

function MyComponent() {
  const { openReminderModal } = useModals();

  return <button onClick={() => openReminderModal()}>New Reminder</button>;
}
```

**C'est tout !** Pas besoin de :

- ❌ Passer des callbacks en props
- ❌ Gérer des états locaux
- ❌ Modifier plusieurs fichiers

---

### **2. Ouvrir un modal en mode édition**

```tsx
import { useModals } from "../contexts/ModalContext";

function MyComponent() {
  const { openReminderModal, openChannelModal } = useModals();
  const reminder = {...}; // Votre objet reminder
  const channel = {...};  // Votre objet channel

  return (
    <>
      <button onClick={() => openReminderModal(reminder)}>
        Edit Reminder
      </button>

      <button onClick={() => openChannelModal(channel)}>
        Validate Channel
      </button>
    </>
  );
}
```

---

### **3. Créer une nouvelle page**

**Étape 1:** Créer le fichier de la page

```tsx
// src/pages/MyNewPage.tsx
import { PageHeader } from "../components/common";

function MyNewPage() {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <PageHeader title="My New Page" subtitle="Description of the page" />

      <div>{/* Votre contenu ici */}</div>
    </div>
  );
}

export default MyNewPage;
```

**Étape 2:** Ajouter la route dans `App.tsx`

```tsx
// src/App.tsx
import MyNewPage from "./pages/MyNewPage";

// Dans le <Routes>
<Route
  path="/my-page"
  element={
    <ProtectedRoute>
      <MyNewPage />
    </ProtectedRoute>
  }
/>;
```

**Étape 3:** Ajouter le lien dans la sidebar (optionnel)

```tsx
// src/components/Sidebar.tsx
const menuItems = [
  // ... existing items
  { id: "mypage", label: "My Page", Icon: Star, path: "/my-page" },
];
```

---

### **4. Afficher des données avec états de chargement**

```tsx
import { LoadingState, ErrorState } from "../components/common";
import { useReminders } from "../hooks/useReminders";

function MyComponent() {
  const { data: reminders, isLoading, error } = useReminders();

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message="Failed to load data" />;

  return (
    <div>
      {reminders.map((reminder) => (
        <div key={reminder.uuid}>{reminder.reminder_text}</div>
      ))}
    </div>
  );
}
```

---

### **5. Créer un nouveau modal**

**Étape 1:** Ajouter l'état dans `ModalContext.tsx`

```tsx
// src/contexts/ModalContext.tsx
interface ModalState {
  // ... existing modals
  myNewModal: {
    isOpen: boolean;
    data?: any;
  };
}

// Ajouter les actions
openMyNewModal: (data?: any) => void;
closeMyNewModal: () => void;

// Implémenter les fonctions
const openMyNewModal = (data?: any) => {
  setModals(prev => ({
    ...prev,
    myNewModal: { isOpen: true, data }
  }));
};
```

**Étape 2:** Créer le composant modal

```tsx
// src/components/MyNewModal.tsx
import { Modal } from "./common/Modal";
import { useModals } from "../contexts/ModalContext";

function MyNewModal() {
  const { modals, closeMyNewModal } = useModals();
  const { myNewModal } = modals;

  return (
    <Modal
      isOpen={myNewModal.isOpen}
      onClose={closeMyNewModal}
      title="My New Modal"
    >
      <div>{/* Votre contenu ici */}</div>
    </Modal>
  );
}

export default MyNewModal;
```

**Étape 3:** Rendre le modal dans `MainLayout.tsx`

```tsx
// src/layouts/MainLayout.tsx
import MyNewModal from "../components/MyNewModal";

// Dans le return, après les autres modals
<MyNewModal />;
```

---

### **6. Appeler une API**

**Étape 1:** Définir les types

```tsx
// src/types/reminder.types.ts
export interface MyNewType {
  id: string;
  name: string;
}
```

**Étape 2:** Créer un hook React Query

```tsx
// src/hooks/useMyFeature.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";

export const useMyFeature = () => {
  return useQuery({
    queryKey: ["myFeature"],
    queryFn: async () => {
      const { data } = await api.get("/my-endpoint/");
      return data;
    },
  });
};

export const useCreateMyFeature = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await api.post("/my-endpoint/", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myFeature"] });
    },
  });
};
```

**Étape 3:** Utiliser dans un composant

```tsx
import { useMyFeature, useCreateMyFeature } from "../hooks/useMyFeature";

function MyComponent() {
  const { data, isLoading } = useMyFeature();
  const createMutation = useCreateMyFeature();

  const handleCreate = async () => {
    await createMutation.mutateAsync({ name: "test" });
  };

  return <button onClick={handleCreate}>Create</button>;
}
```

---

### **7. Créer un composant réutilisable**

```tsx
// src/components/common/MyComponent.tsx

/**
 * MyComponent - Brief description
 *
 * Usage:
 * <MyComponent title="Hello" onAction={() => {}} />
 */

interface MyComponentProps {
  title: string;
  subtitle?: string;
  onAction: () => void;
}

export function MyComponent({ title, subtitle, onAction }: MyComponentProps) {
  return (
    <div>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
      <button onClick={onAction}>Action</button>
    </div>
  );
}
```

**Exporter depuis `common/index.ts`:**

```tsx
// src/components/common/index.ts
export { MyComponent } from "./MyComponent";
```

---

## 🎨 Style Guide

### **Utiliser Tailwind + DaisyUI**

```tsx
// Classes Tailwind courantes
<div className="p-6 lg:p-8">         // Padding responsive
<div className="flex gap-4">         // Flexbox avec gap
<div className="grid grid-cols-2">   // Grid 2 colonnes

// Classes DaisyUI
<button className="btn btn-primary"> // Bouton primaire
<div className="alert alert-error">  // Alert d'erreur
<div className="card">               // Card component
```

### **Utiliser les composants DaisyUI**

```tsx
// Au lieu de créer vos propres composants, utilisez DaisyUI
<button className="btn">Button</button>
<input className="input input-bordered" />
<div className="badge">Badge</div>
```

---

## 📂 Structure des Fichiers

```
Quand créer un nouveau fichier ?

✅ Créer un nouveau fichier si :
  - Le composant fait plus de 200 lignes
  - La logique est réutilisable ailleurs
  - Le composant est utilisé dans 2+ endroits

❌ Ne pas créer de fichier si :
  - C'est juste une fonction helper simple (mettre dans utils/)
  - C'est un petit composant (< 50 lignes) utilisé une fois
```

---

## 🐛 Debugging

### **Les modals ne s'ouvrent pas**

1. Vérifier que le composant est wrappé par `<ModalProvider>`
2. Vérifier l'import : `import { useModals } from "../contexts/ModalContext"`
3. Vérifier que le modal est rendu dans `MainLayout.tsx`

### **Les données ne se chargent pas**

1. Vérifier la console pour les erreurs
2. Vérifier le Network tab dans DevTools
3. Vérifier que l'endpoint API est correct
4. Vérifier que l'authentification fonctionne

### **TypeScript errors**

1. Vérifier que les types sont définis dans `types/reminder.types.ts`
2. Vérifier les imports
3. Ne jamais utiliser `any` - définir un type propre

---

## 🔧 Commandes Utiles

```bash
# Démarrer le dev server
npm run dev

# Vérifier les erreurs TypeScript
npm run type-check

# Formatter le code
npm run format

# Build pour production
npm run build
```

---

## ❓ Questions Fréquentes

### **Q: Où mettre ma logique métier ?**

**R:** Dans un hook personnalisé dans `hooks/`

### **Q: Comment partager des données entre composants ?**

**R:**

- Données API : React Query (automatique)
- État global UI : Context API (comme ModalContext)
- Données simples : Props

### **Q: Quand utiliser useEffect ?**

**R:** Le moins possible ! React Query gère la plupart des cas d'usage.

### **Q: Comment gérer les formulaires ?**

**R:** Créer un hook personnalisé (voir `useReminderForm.ts` en exemple)

---

## 📚 Ressources

- **Tailwind CSS:** https://tailwindcss.com/docs
- **DaisyUI:** https://daisyui.com/components/
- **React Query:** https://tanstack.com/query/latest/docs
- **Lucide Icons:** https://lucide.dev/icons/

---

**Besoin d'aide ?** Regardez les fichiers existants pour voir des exemples !
