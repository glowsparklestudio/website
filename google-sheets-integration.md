# Google Sheets Integration Guide

To link the Booking and Contest forms to a Google Sheet, you can use **Google Apps Script**. This allows you to create a secure Webhook URL that will write incoming form submissions directly into your spreadsheet.

## Step 1: Create a Google Sheet
1. Create a new Google Sheet.
2. In the first row, add your column headers.
   - For Bookings: `Timestamp`, `Name`, `Gender`, `Category`, `Service`, `Time`, `Phone`, `Source`
   - For Contests: `Timestamp`, `Name`, `Phone`, `Instagram`

## Step 2: Write the Apps Script
1. In your Google Sheet, click on **Extensions > Apps Script**.
2. Replace the `Code.gs` content with the following snippet (example for Bookings):

\`\`\`javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Add row to sheet
    sheet.appendRow([
      new Date(),
      data.name,
      data.gender,
      data.category,
      data.service,
      data.time,
      data.phone,
      data.source || 'Website'
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
\`\`\`

## Step 3: Deploy the Webhook
1. Click **Deploy > New Deployment**.
2. Select **Web app** as the type.
3. Set **Execute as:** "Me" and **Who has access:** "Anyone".
4. Click **Deploy**.
5. *Wait for authorization and click through the advanced warnings to allow the script to edit your spreadsheet.*
6. **Copy the Web app URL.** This is your Webhook URL.

## Step 4: Link it in React
In `src/pages/Book.tsx` (and similarly for `Contest.tsx`), update the `handleSubmit` function:

\`\`\`typescript
const handleSubmit = async () => {
  setIsSubmitting(true);
  try {
    const payload = { ...formData, source: "Website Booking" };
    
    // Replace with your Google Apps Script Web app URL
    const WEBHOOK_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";
    
    await fetch(WEBHOOK_URL, {
      method: "POST",
      mode: 'no-cors', // Important for Google Script CORS
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    });
    
    setSubmitted(true);
  } catch (e) {
    console.error("Booking Error:", e);
  } finally {
    setIsSubmitting(false);
  }
};
\`\`\`

> **Note:** Because Google Apps Script uses redirects that browsers block via CORS when calling from `fetch`, using `mode: 'no-cors'` allows the POST to go through silently. You won't be able to read the JSON response from Google, but the data will be saved.
