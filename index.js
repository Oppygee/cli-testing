require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/user", require("./routes/user"));

app.use((req, res) => {
  res.status(404).json({
    status: false,
    message: "Seems, you're lost",
  });
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
