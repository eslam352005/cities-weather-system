
var theWeather = document.getElementById('theWeather');

async function getWeather(location = "cairo") {
  const apiKey = "6b735de1303846e597a172615241112";
  const days = 3;

  try {
   
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=${days}`
    );

    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

   
    display(data);

  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}


  function display(data) {
    let box = "";
  
    
    const forecast = data.forecast.forecastday;
  
    
    forecast.forEach((day, index) => {
      
      const dateObj = new Date(day.date);
      const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
  
      
      if (index === 0) {
       
        box += `
          <div class="col-md-4 p-2  main-w">
            <h4 class="p-2 ">${dayName}</h4>
            <p class="p-2">${data.location.name}</p>
            <h3 class="p-2">${day.day.avgtemp_c}°C</h3>
            <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}" />
            <h6 class="p-2">${day.day.condition.text}</h6>
            
          </div>
        `;
      } else {
        
        box += `
          <div class="col-md-4 text-center p-2  notmain-w">
            <p class="p-2">${dayName}</p>
            <h5 class="p-2">${day.day.avgtemp_c}°C</h5>
            <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}" />
            <h6 class="p-2">${day.day.condition.text}</h6>
            <p class="p-2">${day.date}</p>
          </div>
        `;
      }
    });
  
    theWeather.innerHTML = `
      <div class="row">
        ${box}
      </div>
    `;
  }
    

 function search(input){

    const location=input.value

getWeather(location)

 }

  


getWeather();




   