const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || '127.0.0.1';

// Serve static files from the "public" folder
app.use(express.static('public'));

app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
