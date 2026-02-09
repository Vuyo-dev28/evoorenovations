# SilentForms Endpoint Configuration

## Issue
The form was trying to POST to `/api/submit` which resulted in a 404 error because it's a relative path pointing to your local server.

## Solution Options

### Option 1: Use Full URL (Recommended for Production)

Update `src/app/components/Contact.tsx` line 10:

```typescript
const SILENTFORMS_ENDPOINT = "https://[SILENTFORMS_API_URL]/submit";
```

Replace `[SILENTFORMS_API_URL]` with the actual SilentForms API domain. Check your SilentForms dashboard or documentation for the correct endpoint URL.

### Option 2: Use Vite Proxy (For Development)

The Vite proxy is already configured in `vite.config.ts`. To use it:

1. Add to `.env` file:
   ```
   VITE_SILENTFORMS_API_URL=https://[SILENTFORMS_API_URL]
   ```

2. The form will use `/api/submit` which the proxy will forward to SilentForms

### Option 3: Environment Variable

Add to `.env`:
```
VITE_SILENTFORMS_ENDPOINT=https://[SILENTFORMS_API_URL]/submit
```

## Finding the Correct Endpoint

1. Check your SilentForms dashboard
2. Review SilentForms documentation
3. Check the email you received with your access key - it may contain the API endpoint URL
4. Common patterns:
   - `https://api.silentforms.com/submit`
   - `https://silentforms.com/api/submit`
   - `https://forms.silentforms.com/submit`

## Testing

After updating the endpoint:
1. Restart your dev server (`npm run dev` or `vite`)
2. Submit a test form
3. Check your email (evoorenovations@gmail.com) for the submission
4. Check browser console for any errors

## Current Configuration

- **Access Key**: ✅ Configured (`20f605984f19d02f44889dc6b030ddc78ab806b2dd3e574334710450c9d0aeab`)
- **Endpoint**: ⚠️ Needs the correct SilentForms API URL
- **Form Fields**: ✅ All configured correctly
- **Spam Protection**: ✅ Honeypot field included
