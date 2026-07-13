require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const authRoutes = require("./routes/auth/auth");
const settingsRoutes = require("./routes/settings/user_settings");
const mapRoutes = require("./routes/map/map");
const reportRoutes = require("./routes/report/report");
const dashboardRoutes = require("./routes/dashboard/dashboard");

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

app.use(cors({
  origin: true,       // TODO(#6): Temporary we will replace it with an allowlist of approved frontend URL(s).
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/settings", settingsRoutes);
app.use("/map", mapRoutes);
app.use("/report", reportRoutes);
app.use("/dashboard", dashboardRoutes);

const { getEnergyPrice } = require("./energyPrice");
const { getWeather } = require('./weather');

console.log("My API Token is:", process.env.ENERGY_API_TOKEN);


app.get('/api/energy-prices', getEnergyPrice);


app.get('/api/weather', getWeather);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));