# Wellfind: Job Search Assistant

## Overview
This Chrome extension is designed to streamline job applications by integrating with **Wellfound** to help users find startup jobs. It automates the process of gathering company details, finding professional contacts, and crafting personalized emails.

## Features
- **Company Data Extraction**: Scrapes relevant company details from Wellfound at https://wellfound.com/company/* to assist in job applications.
- **Hunter API Integration**: Retrieves company domains and employee positions to help users find hiring contacts.
- **Cohere API Integration**: Uses AI to generate a professional email body by summarizing the company’s mission.
- **Email Storage**: Saves sent emails for future reference using Chrome's `storage.sync`.

## How It Works
1. **Scrape Company Information**: When browsing a Wellfound company, the extension extracts company details.
2. **Find Contacts**: The Hunter API retrieves the company domain and employees' email addresses.
3. **Generate Email Body**: Cohere API generates a professional email draft based on the company’s mission.
4. **Send and Save Emails**: Users can send emails directly from the extension, and sent emails are saved for tracking purposes.

## Images
![image](https://github.com/user-attachments/assets/e7a83b15-923d-40de-9d57-513780cd075c)
![image](https://github.com/user-attachments/assets/c09a14b0-08d3-4d2b-a716-265aa43cd338)

## Installation
1. Clone this repository
2. Open **Chrome** and navigate to `chrome://extensions/`.
3. Enable **Developer mode** (toggle in the top-right corner).
4. Click **Load unpacked** and select the project folder.
5. The extension will now be available in your browser.

## APIs Used
- **[Hunter API](https://hunter.io/)** - Finds company domains and professional contacts.
- **[Cohere API](https://cohere.com/)** - Generates personalized email messages.

## Future Improvements
- **Resume Integration**: Improve personalization by extracting uploaded resume.

