require('dotenv').config();
const express = require('express');
const cors = require('cors'); 

const app = express();
const { getEnergyPrice } = require("./energyPrice");

console.log("My API Token is:", process.env.ENERGY_API_TOKEN);

app.use(cors({ origin: 'http://localhost:5173' })); 

app.get('/api/energy-prices', getEnergyPrice);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));