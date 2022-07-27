# Tax utilities
Software for tax related actions

## GST Builder
Create GST invoices from user interface forms. 
The invoice generated is an excel sheet which calculates total cost of all the items entered along with the GST tax calculations.

It is developed using html, bootstrap, along with xlsx-populate library.
Special thanks to https://github.com/dtjohnson/xlsx-populate for the browser version of xlsx-populate. This code helped me a lot.

Steps to follow:
1. Enter all the necessary information in template like company name, logo, address, bank details, GST IN, PAN, authorized signatory.
2. Open index.html and fill all the buyer and item information.
3. Select 'existing workbook' and select the xlsx file template from the 'templates' folder.
4. Click 'Get invoice'.
5. The excel file will get downloaded.

The code is still a work-in-progress. Further versions will have the code generating the invoice without having to upload a template... 
