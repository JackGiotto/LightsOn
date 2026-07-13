const getEnergyPrice = async (req, res) => {

  try {
    const response = await fetch('https://euenergy.live/api/v1/prices/today?zone=IT-NORTH', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.ENERGY_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`External API responded with status: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error('Error fetching energy prices:', error);
    res.status(500).json({ error: 'Failed to fetch energy prices' });
  }

};

module.exports = {getEnergyPrice};