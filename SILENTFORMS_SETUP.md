# SilentForms Integration Setup

## Quick Setup

1. **Get your SilentForms Access Key:**
   - Go to [SilentForms](https://silentforms.com)
   - Enter your email to receive an access key
   - Check your inbox for the access key (format: `sf_xxxxxxxxxxxxx`)

2. **Add your Access Key:**

   **Option A: Using Environment Variable (Recommended)**
   - Create or update `.env` file in the root directory
   - Add: `VITE_SILENTFORMS_ACCESS_KEY=sf_your_actual_key_here`
   - Replace `sf_your_actual_key_here` with your actual access key from the email

   **Option B: Direct Update**
   - Open `src/app/components/Contact.tsx`
   - Find line 8: `const SILENTFORMS_ACCESS_KEY = ...`
   - Replace `YOUR_ACCESS_KEY_HERE` with your actual access key

## How It Works

The contact form is now integrated with SilentForms:

- **Form submissions** are sent directly to SilentForms API
- **Spam protection** via honeypot field (hidden from users)
- **Email notifications** - You'll receive form submissions in your email inbox
- **No backend required** - Everything handled by SilentForms

## Form Fields

The form includes:
- Name (required)
- Email (required)
- Phone (required)
- Message (required)
- Access Key (hidden, automatically added)
- Honeypot (hidden, spam protection)

## Testing

1. After adding your access key, test the form
2. Submit a test message
3. Check your email inbox for the form submission
4. Verify all fields are received correctly

## Optional: Webhook Integration

If you want to receive submissions via webhook instead of (or in addition to) email:

1. Add a webhook URL in your SilentForms dashboard
2. Or add it as a hidden field in the form:
   ```tsx
   <input type="hidden" name="webhookUrl" value="https://yourwebhook.url" />
   ```

## Finding the Correct API Endpoint

The endpoint `/api/submit` is a relative path. You need to find the correct SilentForms API URL:

1. **Check SilentForms Documentation**: Visit their website/docs for the API endpoint
2. **Check Your Email**: The confirmation email may contain the API endpoint URL
3. **Check SilentForms Dashboard**: Log into your account and look for API settings
4. **Common Patterns** (try these if documentation isn't available):
   - `https://silentforms.com/api/submit`
   - `https://api.silentforms.com/submit`
   - `https://forms.silentforms.com/submit`

Once you have the correct URL, update `src/app/components/Contact.tsx` line 12:
```typescript
const SILENTFORMS_ENDPOINT = "https://[CORRECT_URL]/submit";
```

Or add to `.env`:
```
VITE_SILENTFORMS_ENDPOINT=https://[CORRECT_URL]/submit
```

## Troubleshooting

- **Form not submitting?** Check that your access key is correct
- **Not receiving emails?** Check spam folder and verify email in SilentForms
- **Getting errors?** Check browser console for error messages
- **404 Error?** The API endpoint URL is incorrect - find the correct SilentForms API URL

## Privacy

The honeypot field helps prevent spam submissions. It's completely hidden from users and only bots will fill it out.
