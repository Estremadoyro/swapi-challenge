const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");

//Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.send("owo");
});

app.listen(PORT, (req_, res_) => {
  console.log(`Server running @ ${PORT}`);
});
