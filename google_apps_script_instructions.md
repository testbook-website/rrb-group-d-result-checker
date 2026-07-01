To store the data into the Google Sheet you created, follow these steps:

1. Open your Google Sheet.
2. Go to Extensions > Apps Script.
3. Replace the existing code with the following snippet:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var timestamp = new Date();
    
    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Name", "Mobile Number", "Roll Number", "Zone", "Status"]);
    }
    
    var newRow = [
      timestamp,
      e.parameter.name || "",
      e.parameter.mobile || "",
      e.parameter.rollNumber || "",
      e.parameter.zone || "",
      e.parameter.status || ""
    ];
    
    sheet.appendRow(newRow);
    
    return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
  } catch (error) {
    return ContentService.createTextOutput("Error: " + error.toString()).setMimeType(ContentService.MimeType.TEXT);
  }
}
```

4. Click the "Save" (disk) icon.
5. Click "Deploy" > "New deployment".
6. Click the gear icon next to "Select type" and choose "Web app".
7. Under "Execute as", choose "Me".
8. Under "Who has access", choose "Anyone".
9. Click "Deploy". (You may need to authorize the app the first time).
10. Copy the "Web app URL" that is generated.
11. Paste this URL into the `script.js` file in your repository:
    `const GOOGLE_SCRIPT_URL = "PASTE_YOUR_URL_HERE";`

Once this is done, every time a student checks their result, their details will be added to your Google Sheet!
