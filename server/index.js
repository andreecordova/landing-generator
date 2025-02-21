// index.js
const express = require("express");
const cors = require("cors");
const { connection } = require("./db/connection");
const LandingRoutes = require("./routes/LandingRoutes");

connection();

const app = express();
const port = 3900;

app.use(cors());
app.use(express.json());
app.use("/api/landings", LandingRoutes);

app.listen(port, () => {
  console.log(`connected:${port}`);
});
