## Bank Transactions Analysis
<img src="https://nodejs.org/static/images/logos/nodejs-new-pantone-black.svg"
     alt="Markdown Node icon"
     height="50px"
/>

### Introduction
An app which creates a user, connects them to a specified bank, fetches their transactions and calculates the average expenditure for each transaction category.

**NOTE**: The app relies on [BasiQ API](https://api.basiq.io/reference#getting-started).

### Usage

Install the depenencies.
**`npm ci`**

Modify the **.env-template** `API_KEY` value with correct value from your BasiQ account and rename the file to **.env**.

Run the script. 
**`npm start`**