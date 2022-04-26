const path = require("path");
const express = require("express");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.static(path.join(__dirname, "..", "client", "build")));
app.use(express.static("public"));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

app.listen(PORT, () => {
  console.info(`Server is running on port ${PORT}`);
});
