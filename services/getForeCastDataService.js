export const getForeCastDataService = async ({
  location,
  coords,
  units = 'metric',
  count = 7,
}) => {
  const apiKey = '26cd1bc87183be4803bf8e83c754ede3';

  let response;
  try {
    if (coords) {
      response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${coords.lat}&lon=${coords.long}&units=${units}&cnt=${count}&appid=${apiKey}`,
      );
    } else {
      response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast/daily?q=${location}&units=${units}&cnt=${count}&appid=${apiKey}`,
      );
    }

    // https://api.openweathermap.org/data/2.5/forecast/daily?q=tampere&units=metric&cnt=7&appid=26cd1bc87183be4803bf8e83c754ede3
    response = await response.json();
  } catch (e) {
    console.log(e);
  }

  return response;
};
