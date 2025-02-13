const Output_container = document.getElementById("Output_container");
const GetWeatherBtn = document.getElementById("GetWeather");

async function GetWeatherData() {
  const CityInput = document.getElementById("CityInput");
  const location = CityInput.value;

  if (!location) {
    Output_container.innerHTML = `<h2>Please Enter Location</h2>`;
    return;
  }

  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=fc96ba419c344e00a3c70125251002&q=${location}&aqi=yes`
    );

    if (!response.ok) {
      throw new Error("Failed to Fetched Weather Data");
    }

    if (response.status === 404) {
      Output_container.innerHTML = `<h2>City Not Found</h2>`;
      return;
    }

    const data = await response.json();
    console.log(data.location.country);

    Output_container.innerHTML = `
        <p class="output_text"><strong>Location : </strong>${location},${data.location.country}</p>
        <p class="output_text"><strong>Temperature : </strong>${data.current.temp_c}°C</p>
        <p class="output_text"><strong>Condition : </strong>${data.current.condition.text}</p>
    `;
  } catch (error) {
    console.log(error);
    Output_container.innerHTML = `<h2>Error ${error}</h2>`;
  }
}

document.getElementById("weatherForm").addEventListener("submit", (e) => {
  e.preventDefault();
  GetWeatherData();
});
