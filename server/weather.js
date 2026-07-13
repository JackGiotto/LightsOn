const getWeather = async (req, res) => {

  try {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=46.066666&lon=11.116667&appid=471a4d8a745f3370551e0e257ac8e944', {
      method: 'GET'
    });

    if (!response.ok) {
      throw new Error(`External API responded with status: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error('Error fetching weather:', error);
    res.status(500).json({ error: 'Failed to fetch weather' });
  }

};

module.exports = {getWeather};