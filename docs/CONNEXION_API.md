# 🔌 Guide de connexion à ton API Django

## ✅ Ce qui est déjà fait

Ton backend Django est **PARFAIT** ! 🎉

- ✅ Clerk Auth configuré dans Django
- ✅ Tous les endpoints correspondent
- ✅ Schemas alignés avec le frontend
- ✅ Django Ninja avec routes async

J'ai ajusté 3 petits détails dans le frontend pour matcher exactement :
1. ✅ Liste paginée des reminders
2. ✅ `PUT` au lieu de `PATCH` pour update
3. ✅ `/resend-code` au lieu de `/resend`

---

## 🚀 Étapes pour connecter (5 minutes)

### **Étape 1 : Configure Clerk** (2 min)

#### **1.1 - Crée un compte Clerk**
- Va sur [clerk.com](https://clerk.com)
- Crée un compte (gratuit)
- Crée une application "Remindr"

#### **1.2 - Récupère tes clés**
Dans le dashboard Clerk :
1. Va dans **API Keys**
2. Copie la **Publishable Key** (commence par `pk_test_`)
3. Copie la **Secret Key** (commence par `sk_test_`)

#### **1.3 - Configure le frontend**
Édite `.env.local` :
```bash
VITE_CLERK_PUBLISHABLE_KEY=pk_test_TA_VRAIE_CLE_ICI
VITE_API_URL=http://localhost:8000
```

#### **1.4 - Configure le backend**
Vérifie que ton Django a la `CLERK_SECRET_KEY` dans son `.env` :
```bash
CLERK_SECRET_KEY=sk_test_TA_VRAIE_CLE_ICI
```

---

### **Étape 2 : Active les tokens Clerk** (1 min)

Édite `remindr_frontend/src/lib/api.ts` et **décommente** ces lignes :

```typescript
// Request interceptor - Add auth token from Clerk
api.interceptors.request.use(
  async (config) => {
    // DÉCOMMENTE CES LIGNES 👇
    const token = await window.Clerk?.session?.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
```

**Devrait devenir :**

```typescript
// Request interceptor - Add auth token from Clerk
api.interceptors.request.use(
  async (config) => {
    const token = await window.Clerk?.session?.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
```

---

### **Étape 3 : Démarre tout** (2 min)

#### **Terminal 1 - Backend Django**
```bash
cd remindr/backend
python manage.py runserver
```

#### **Terminal 2 - Frontend React**
```bash
cd remindr_frontend
npm run dev
```

---

## 🎯 Teste le flow complet

### **1. Ouvre l'app**
```
http://localhost:5173
```

### **2. Signup/Login**
- Clique "Get Started"
- Crée un compte avec Clerk
- Tu seras redirigé vers `/dashboard`

### **3. Vérifie l'auth**
Ouvre la console du navigateur (F12) :
- Va dans **Network** tab
- Fais une action (la page devrait déjà charger les reminders)
- Vérifie qu'il y a un header `Authorization: Bearer xxx`

### **4. Teste les features**

#### **A. Créer un channel**
1. Clique "Add Channel" (Sidebar ou Dashboard)
2. Choisis un type (email, whatsapp, etc.)
3. Entre ton identifier
4. Tu recevras un code de validation
5. Entre le code → Channel vérifié ! ✅

#### **B. Créer un reminder**
1. Clique "New Reminder" ou le FAB (+)
2. Remplis le formulaire
3. Sélectionne un channel vérifié
4. Crée → Le reminder apparaît dans la liste ! ✅

#### **C. Edit/Delete**
1. Dans la table, clique ✏️ (Edit)
2. Modifie le reminder → Se met à jour automatiquement ✅
3. Clique 🗑️ (Delete) → Disparaît de la liste ✅

#### **D. Navigation**
1. Sidebar → "Reminders" → Liste complète
2. Sidebar → "Channels" → Gestion des channels
3. Sidebar → "Settings" → Profil Clerk
4. Tout est protégé par auth ! ✅

---

## 🐛 Dépannage

### **Problème : "Missing Clerk Publishable Key"**
- ✅ Vérifie que `.env.local` existe
- ✅ Vérifie la variable : `VITE_CLERK_PUBLISHABLE_KEY`
- ✅ Redémarre le serveur : `Ctrl+C` puis `npm run dev`

### **Problème : Erreur 401 sur les API calls**
- ✅ Vérifie que tu as décommenté le code dans `lib/api.ts`
- ✅ Vérifie que `CLERK_SECRET_KEY` est dans Django `.env`
- ✅ Vérifie que les deux clés viennent du **même** projet Clerk
- ✅ Regarde Network tab : le token est envoyé ?

### **Problème : "User not found"**
Ton Django doit créer l'utilisateur lors du premier login :
- Vérifie que tu as un signal ou webhook Clerk configuré
- Ou crée l'utilisateur manuellement dans Django admin

### **Problème : CORS errors**
Ton Django doit autoriser `localhost:5173` :
```python
# settings.py
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
]
```

---

## 📊 Architecture de l'auth

```
┌─────────────┐
│   Browser   │
│  (React)    │
└──────┬──────┘
       │
       │ 1. User logs in
       ▼
┌─────────────┐
│    Clerk    │  ← Gère l'auth UI + tokens
└──────┬──────┘
       │
       │ 2. Get JWT token
       ▼
┌─────────────┐
│   Axios     │  ← Ajoute token dans headers
│ Interceptor │
└──────┬──────┘
       │
       │ 3. API call avec token
       ▼
┌─────────────┐
│   Django    │  ← Vérifie token avec Clerk
│  ClerkAuth  │
└─────────────┘
```

---

## 🎓 Comprendre le flow

### **Frontend → Backend**

1. **User se connecte** → Clerk donne un JWT
2. **React Query fait un fetch** → Hook `useReminders()`
3. **Axios interceptor** → Ajoute `Authorization: Bearer <token>`
4. **Django reçoit** → `ClerkAuth` vérifie le token
5. **Si valide** → Django retourne les data
6. **React Query cache** → Pas besoin de re-fetch !

### **Auto-refresh après mutation**

```typescript
// Dans useCreateReminder
onSuccess: () => {
  // React Query invalide le cache
  queryClient.invalidateQueries({ queryKey: ["reminders"] });
  // → Déclenche automatiquement un re-fetch !
  // → La liste se met à jour toute seule ! 🎉
}
```

---

## 🎉 C'est tout !

Une fois configuré, **tout fonctionne automatiquement** :
- ✅ Auth persistée (Clerk)
- ✅ Tokens envoyés automatiquement (Axios)
- ✅ Cache intelligent (React Query)
- ✅ Refresh auto après create/update/delete
- ✅ Loading states
- ✅ Error handling
- ✅ Toasts notifications

**Besoin d'aide ? Tout est commenté dans le code avec des `TODO` et explications !**

