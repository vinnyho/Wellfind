# Wellfind: Job Search Assistant

## Overview
This Chrome extension is designed to streamline job applications by integrating with **Wellfound's startup companies** to help users find startup jobs. It automates the process of gathering company details, finding professional contacts, crafting personalized emails, and parsing resumes for relevant keywords.

## Features
- **Company Data Extraction**: Scrapes relevant company details from Wellfound at https://wellfound.com/company/*
- **Hunter API Integration**: Retrieves company domains and employee positions to help users find hiring contacts
- **Cohere API Integration**: Uses Cohere AI API to generate a professional email body by summarizing the company’s mission
- **PDF Resume Parsing**: Extracts text from uploaded PDF resumes to analyze and match with company's mission
- **Email Storage**: Saves sent emails for future reference using Chrome's `storage.sync`

## How It Works
1. **Scrape Company Information**: When browsing a Wellfound company, the extension extracts company details
2. **Find Contacts**: The Hunter API retrieves the company domain and employees' email addresses
3. **Generate Email Body**: Cohere API generates a professional email draft based on the company’s mission
4. **Parse Resume**: Users can upload a PDF resume, and PDF.js extracts text to personalize for email body generation
5. **Send and Save Emails**: Users can send emails directly from the extension, and sent emails are saved for tracking purposes

## Images
<p align="center">
  <img src="https://github.com/user-attachments/assets/e7a83b15-923d-40de-9d57-513780cd075c" width="33%" />
  <img src="https://github.com/user-attachments/assets/02cfeaa6-99fa-4176-8a2d-d83af423bc08" width="33%" />
  <img src="https://github.com/user-attachments/assets/c09a14b0-08d3-4d2b-a716-265aa43cd338" width="33%" />
</p>

## Installation
1. Clone this repository
2. Open **Chrome** and navigate to `chrome://extensions/`
3. Enable **Developer mode** (toggle in the top-right corner)
4. Click **Load unpacked** and select the project folder
5. The extension will now be available in your browser

## APIs Used
- **[Hunter API](https://hunter.io/)** - Finds company domains and professional contacts
- **[Cohere API](https://cohere.com/)** - Generates personalized email messages
- **[PDF.js](https://mozilla.github.io/pdf.js/)** - Parses PDF resumes to extract text for job application analysis
