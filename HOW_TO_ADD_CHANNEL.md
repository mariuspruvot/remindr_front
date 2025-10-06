# 🚀 How to Add a New Channel - Quick Guide

## 📝 Step-by-Step

### **Step 1: Create Channel Config File**

Create a new file in `src/config/channels/` named `{channel}.config.ts`

**Example for Slack:**

```typescript
// src/config/channels/slack.config.ts
import { Hash } from "lucide-react"; // Choose appropriate icon
import type { ChannelConfig } from "./types";

export const slackConfig: ChannelConfig = {
  type: "slack", // Must match OutputType
  label: "Slack",
  icon: Hash,
  placeholder: "@workspace-name",
  helpText: "Connect your Slack workspace",
  validation: {
    regex: /^@[a-z0-9-]+$/, // Validation pattern
    message: "Please enter a valid Slack workspace name",
    validator: (value: string) => {
      // Optional custom validator
      // Additional validation logic
      return value.length >= 3;
    },
  },
};
```

---

### **Step 2: Add to Registry**

Edit `src/config/channels/registry.ts`:

```typescript
import { slackConfig } from "./slack.config"; // ← Add import

export const CHANNEL_REGISTRY: ChannelRegistry = {
  email: emailConfig,
  whatsapp: whatsappConfig,
  telegram: telegramConfig,
  webhook: webhookConfig,
  slack: slackConfig, // ← Add here
};
```

---

### **Step 3: Export Config**

Edit `src/config/channels/index.ts`:

```typescript
export { slackConfig } from "./slack.config"; // ← Add export
```

---

### **Step 4: Update Type**

Edit `src/types/reminder.types.ts`:

```typescript
export type OutputType =
  | "email"
  | "whatsapp"
  | "telegram"
  | "webhook"
  | "slack"; // ← Add type
```

---

### **Step 5: Update Backend** (if needed)

Make sure your Django backend supports the new channel type.

---

## ✅ That's It!

Everything else is **automatic**:

- ✅ Icon appears in UI
- ✅ Validation works
- ✅ Placeholder text shown
- ✅ Help text displayed
- ✅ Error messages contextual
- ✅ Type-safe with TypeScript

---

## 🎨 Choosing an Icon

Use [Lucide React Icons](https://lucide.dev/icons/):

```typescript
import {
  Mail, // Email
  MessageCircle, // WhatsApp, Chat
  Send, // Telegram, Messages
  Link2, // Webhook, URL
  Hash, // Slack, Discord
  Bell, // Push, Notifications
  Smartphone, // SMS, Mobile
  MessageSquare, // Generic messaging
} from "lucide-react";
```

---

## 🔍 Validation Patterns

### **Email**

```typescript
regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
```

### **Phone (International)**

```typescript
regex: /^\+[1-9]\d{1,14}$/;
```

### **Username (with @)**

```typescript
regex: /^@[a-zA-Z0-9_]{3,32}$/;
```

### **URL (HTTP/HTTPS)**

```typescript
regex: /^https?:\/\/.+/;
validator: (value) => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};
```

### **Custom**

```typescript
regex: /your-pattern/;
validator: (value) => {
  // Your custom logic
  return true; // or false
};
```

---

## 🧪 Testing Your Channel

1. **Open the app**
2. **Click "Add Channel"**
3. **Select your new channel type** → Should appear automatically
4. **Check UI elements:**
   - Icon displayed ✓
   - Placeholder text correct ✓
   - Help text shown ✓
5. **Test validation:**
   - Empty field → "Required" error ✓
   - Invalid format → Your custom message ✓
   - Valid format → No error ✓
6. **Submit form** → Code sent (if backend ready)

---

## 📚 Examples

### **Example 1: Discord**

```typescript
// src/config/channels/discord.config.ts
import { MessageSquare } from "lucide-react";
import type { ChannelConfig } from "./types";

export const discordConfig: ChannelConfig = {
  type: "discord",
  label: "Discord",
  icon: MessageSquare,
  placeholder: "https://discord.com/api/webhooks/...",
  helpText: "Paste your Discord webhook URL",
  validation: {
    regex: /^https:\/\/discord\.com\/api\/webhooks\/.+/,
    message: "Please enter a valid Discord webhook URL",
  },
};
```

### **Example 2: SMS**

```typescript
// src/config/channels/sms.config.ts
import { Smartphone } from "lucide-react";
import type { ChannelConfig } from "./types";

export const smsConfig: ChannelConfig = {
  type: "sms",
  label: "SMS",
  icon: Smartphone,
  placeholder: "+1234567890",
  helpText: "Include country code (e.g., +1 for US)",
  validation: {
    regex: /^\+[1-9]\d{1,14}$/,
    message: "Please enter a valid phone number with country code",
    validator: (value: string) => {
      const digits = value.replace(/\D/g, "");
      return digits.length >= 8 && digits.length <= 15;
    },
  },
};
```

### **Example 3: Microsoft Teams**

```typescript
// src/config/channels/teams.config.ts
import { Users } from "lucide-react";
import type { ChannelConfig } from "./types";

export const teamsConfig: ChannelConfig = {
  type: "teams",
  label: "Microsoft Teams",
  icon: Users,
  placeholder: "https://your-domain.webhook.office.com/...",
  helpText: "Paste your Teams incoming webhook URL",
  validation: {
    regex: /^https:\/\/.+\.webhook\.office\.com\/.+/,
    message: "Please enter a valid Teams webhook URL",
  },
};
```

---

## 🐛 Troubleshooting

### **Channel not appearing in UI**

- ✅ Check if added to `CHANNEL_REGISTRY`
- ✅ Check if exported in `index.ts`
- ✅ Restart dev server

### **TypeScript errors**

- ✅ Check `OutputType` includes your channel
- ✅ Run `npm run build` to verify

### **Validation not working**

- ✅ Test your regex at [regex101.com](https://regex101.com)
- ✅ Check `validator` function logic
- ✅ Check console for errors

### **Icon not showing**

- ✅ Verify import from `lucide-react`
- ✅ Check icon name spelling

---

## 💡 Tips

1. **Start Simple**

   - Begin with basic regex validation
   - Add custom validator only if needed

2. **Test Your Regex**

   - Use [regex101.com](https://regex101.com) to test patterns
   - Test with valid AND invalid inputs

3. **Clear Error Messages**

   - Be specific about what's wrong
   - Provide examples if possible

4. **Consistent Naming**

   - File: `{channel}.config.ts`
   - Export: `{channel}Config`
   - Type: lowercase (e.g., "slack")

5. **Documentation**
   - Add comments for complex validation
   - Document any special requirements

---

## 🎉 Done!

Your new channel is now:

- ✅ Fully integrated
- ✅ Validated automatically
- ✅ Type-safe
- ✅ Ready to use

**Total time: ~30 minutes** ⚡️

---

## 📞 Need Help?

- **Documentation:** See `CHANNEL_REGISTRY_IMPLEMENTATION.md`
- **Examples:** Check existing configs in `src/config/channels/`
- **Types:** See `src/config/channels/types.ts`
