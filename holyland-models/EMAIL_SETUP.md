# Email Setup for Holy Land Models

## Current Setup
The contact form is currently set up to send emails to: **info@holyland-models.com**

## Email Integration Options

### Option 1: EmailJS (Recommended for Frontend)
1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Install: `pnpm add emailjs-com`
3. Configure in Contact.tsx:

```typescript
import emailjs from 'emailjs-com';

// In handleSubmit function:
emailjs.send(
  'YOUR_SERVICE_ID',
  'YOUR_TEMPLATE_ID',
  {
    to_email: 'info@holyland-models.com',
    from_name: formData.name,
    from_email: formData.email,
    subject: formData.subject,
    message: formData.message
  },
  'YOUR_USER_ID'
);
```

### Option 2: SendGrid
1. Sign up at [SendGrid](https://sendgrid.com/)
2. Install: `pnpm add @sendgrid/mail`
3. Configure backend API endpoint

### Option 3: Netlify Forms (If hosted on Netlify)
1. Add `data-netlify="true"` to form
2. Add hidden input: `<input type="hidden" name="bot-field" />`
3. Emails sent to your Netlify dashboard

### Option 4: Formspree
1. Sign up at [Formspree](https://formspree.io/)
2. Add action to form: `action="https://formspree.io/f/YOUR_FORM_ID"`

## Email Configuration

### Primary Email Address
- **Main Contact**: info@holyland-models.com
- **Legal Inquiries**: legal@holyland-models.com
- **Privacy**: privacy@holyland-models.com

### Email Templates
Create templates for:
- General inquiries
- Model booking requests
- Partnership proposals
- Legal questions

## Security Considerations
- Implement rate limiting
- Add CAPTCHA protection
- Validate email addresses
- Sanitize input data
- Use HTTPS for all communications

## Testing
Test the email functionality with:
- Valid email addresses
- Invalid email addresses
- Empty required fields
- Spam protection triggers 