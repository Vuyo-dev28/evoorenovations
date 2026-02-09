# CaptureMyForm Integration Setup

## Quick Setup

1. **Get your CaptureMyForm Public Key:**
   - Go to [CaptureMyForm](https://capturemyform.com)
   - Sign up or log in to your account
   - Get your public key from the dashboard

2. **Add your Public Key:**

   **Option A: Using Environment Variable (Recommended)**
   - Create or update `.env` file in the root directory
   - Add: `VITE_CAPTUREMYFORM_PUBLIC_KEY=your_public_key_here`
   - Replace `your_public_key_here` with your actual public key

   **Option B: Direct Update**
   - Open `src/app/components/Contact.tsx`
   - Find line 8: `const CAPTUREMYFORM_PUBLIC_KEY = ...`
   - Replace `YOUR_PUBLIC_KEY` with your actual public key

## How It Works

The contact form is now integrated with CaptureMyForm:

- **Form submissions** are sent directly to CaptureMyForm API
- **Spam protection** via honeypot field (hidden from users)
- **Email notifications** - You'll receive form submissions in your email inbox
- **Form storage** - Optional: Add `form_id` to store submissions in CaptureMyForm dashboard

## Form Fields

The form includes:
- Name (required)
- Email (required)
- Phone (required)
- Message (required)
- Public Key (hidden, automatically added)
- Honeypot (hidden, spam protection)

## Optional: Form ID

To organize and store form submissions in CaptureMyForm:

1. Uncomment the form_id input in `Contact.tsx` (around line 152)
2. Or add it manually:
   ```tsx
   <input type="hidden" name="form_id" value="EVOO_RENOVATIONS_CONTACT" />
   ```

## Testing

1. After adding your public key, test the form
2. Submit a test message
3. Check your email inbox for the form submission
4. Verify all fields are received correctly
5. Check CaptureMyForm dashboard (if form_id is set) to see stored submissions

## API Endpoint

The form uses: `https://api.capturemyform.com/submit`

This is already configured in the form's `action` attribute.

## Troubleshooting

- **Form not submitting?** Check that your public key is correct
- **"Failed to fetch" error?** This is usually a CORS issue. Options:
  1. **Let form submit naturally**: Remove `e.preventDefault()` in handleSubmit (form will reload page)
  2. **Use a backend proxy**: Create an endpoint on your server that forwards to CaptureMyForm
  3. **Check network tab**: Verify if the request is being blocked by browser
- **Not receiving emails?** Check spam folder and verify email in CaptureMyForm dashboard
- **Getting errors?** Check browser console for error messages
- **404 Error?** Verify the endpoint URL is correct: `https://api.capturemyform.com/submit`
- **CORS Error?** CaptureMyForm API might not allow direct browser requests. Consider using a backend proxy.

## Privacy

The honeypot field helps prevent spam submissions. It's completely hidden from users and only bots will fill it out.
