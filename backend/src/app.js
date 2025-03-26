const express = require("express");
const cors = require("cors");
const simuladorRoutes = require("./routes/simulatorRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/simulate", simuladorRoutes);

module.exports = app;
