export const getWeatherDataService = async ({
  location,
  units = 'metric',
  coords,
}) => {
  const apiKey = '26cd1bc87183be4803bf8e83c754ede3';

  let response;
  try {
    if (coords) {
      response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.long}&units=${units}&appid=${apiKey}`,
      );
    } else {
      response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${apiKey}`,
      );
    }

    // https://api.openweathermap.org/data/2.5/weather?q=tampere&units=metric&appid=26cd1bc87183be4803bf8e83c754ede3
    response = await response.json();
  } catch (e) {
    console.log(e);
  }

  return response;
};
