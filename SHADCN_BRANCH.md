# Shadcn/UI Branch

Cette branche est une implémentation alternative de l'interface utilisateur de Remindr utilisant **shadcn/ui** au lieu de DaisyUI.

## 🎨 Changements principaux

### UI Library
- ❌ **Retiré**: DaisyUI
- ✅ **Ajouté**: shadcn/ui (composants Radix UI + Tailwind CSS)

### Avantages de shadcn/ui
- 🔧 **Plus de contrôle**: Les composants sont copiés dans le projet, donc entièrement personnalisables
- 🎯 **Type-safe**: Excellente intégration TypeScript
- 🪶 **Plus léger**: Pas de styles inutilisés, seulement ce dont vous avez besoin
- 🎨 **Design moderne**: Esthétique plus sobre et professionnelle
- ♿ **Accessibilité**: Basé sur Radix UI (WAI-ARIA compliant)

### Composants installés
- `button` - Boutons avec variants
- `card` - Cartes pour affichage de contenu
- `badge` - Badges et tags
- `alert` - Messages d'alerte
- `dialog` - Modals et dialogs
- `dropdown-menu` - Menus déroulants
- `select` - Sélecteurs
- `checkbox` - Cases à cocher
- `label` - Labels de formulaire
- `separator` - Séparateurs

## 🚀 État actuel

### ✅ Fait
- Installation de shadcn/ui
- Configuration Tailwind CSS
- Configuration TypeScript (path aliases)
- Suppression de DaisyUI
- Installation des composants de base

### 🔄 À faire
- [ ] Migrer tous les boutons vers `<Button variant="...">`
- [ ] Migrer toutes les cartes vers `<Card>`
- [ ] Migrer les badges vers `<Badge>`
- [ ] Migrer les modals vers `<Dialog>`
- [ ] Migrer les alerts
- [ ] Migrer les inputs et forms
- [ ] Migrer le Calendar
- [ ] Tester le responsive
- [ ] Vérifier le dark mode

## 📦 Installation

```bash
git checkout feat/shadcn-ui
npm install
npm run dev
```

## 🔗 Ressources

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Radix UI Documentation](https://www.radix-ui.com)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com)

