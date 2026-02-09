# Google Analytics Setup Guide

## Quick Setup

1. **Get your Google Analytics Measurement ID:**
   - Go to [Google Analytics](https://analytics.google.com/)
   - Create a new property or use an existing one
   - Get your Measurement ID (format: `G-XXXXXXXXXX`)

2. **Update the Measurement ID in two places:**

   **Option A: Using Environment Variable (Recommended)**
   - Create a `.env` file in the root directory
   - Add: `VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX`
   - Replace `G-XXXXXXXXXX` with your actual Measurement ID

   **Option B: Direct Update**
   - Update `index.html` line 105: Replace `G-XXXXXXXXXX` with your Measurement ID
   - Update `src/utils/analytics.ts` line 9: Replace `G-XXXXXXXXXX` with your Measurement ID

## What's Being Tracked

The following events are automatically tracked:

- **Page Views**: Every page load
- **Button Clicks**: 
  - "Start Your Journey" button (Hero)
  - "View Project" buttons (Portfolio)
  - "Explore All Projects" button
  - Logo click
- **Navigation**: Menu clicks (Portfolio, Services, Process, About, Contact)
- **Form Submissions**: Contact form submissions
- **Contact Interactions**: Phone and email link clicks
- **Portfolio Views**: When users click on portfolio projects

## Testing

1. After adding your Measurement ID, open your site
2. Go to Google Analytics > Realtime reports
3. Perform actions on your site (click buttons, submit forms, etc.)
4. You should see events appearing in real-time

## Custom Events

You can track custom events using the utility functions:

```typescript
import { trackEvent, trackButtonClick } from './utils/analytics';

// Track custom event
trackEvent('action_name', 'category', 'label', value);

// Track button click
trackButtonClick('Button Name', 'Location');
```

## Privacy & GDPR

Make sure to:
- Add a cookie consent banner if required in your region
- Update your privacy policy to mention Google Analytics
- Consider using Google Analytics with IP anonymization for GDPR compliance
