const form = document.querySelector('#form');
const formBtn = document.querySelector('#form-btn');
const inputCountry = document.querySelector('#input-country');
const countryInfo = document.querySelector('#country-info');


let countries = [];

// API DE PAISES

const getCountry = async () => {
    try {
        // siempre que utilicemos una api tenemos que utilizar await
        const response = await (await fetch('https://restcountries.com/v3.1/all')).json();

        countries = response;

    } catch (error) {
        alert('Hubo un error con tu internet.')
    }
};

getCountry();


// inputCountry.addEventListener('input', e => {
//     const filteredCountries = countries.filter(country => );
// });


inputCountry.addEventListener('input', e => {
    e.preventDefault();
    const filteredCountries = countries.filter(country =>  country.name.common.toLowerCase().startsWith(inputCountry.value.toLowerCase()))

        countryInfo.innerHTML = '';
             
  
  function showCountries(){
    filteredCountries.forEach(p =>  {
        countryInfo.innerHTML += `
        <div class="country-card" id="country-card">
                <img class="country-flag" src="${p.flags.svg}">
                <span class="country-title">${p.name.common}</span>
            </div>
        `;
    });
  }

//   if (inputCountry.value= false) {
//     countryInfo.innerHTML='';
//   }

if (inputCountry.value === '') {
    countryInfo.innerHTML='';
    return;
}


    
    else if(filteredCountries.length > 10) {
        countryInfo.classList.remove('columns')
        countryInfo.innerHTML= `
        <p class="country-text-info">Your search has to be more specific please.</p>
        `;
        return
    } 
    else if (filteredCountries.length >0 && filteredCountries.length !== 1) {
        countryInfo.innerHTML='';
        countryInfo.classList.add('columns')
        // console.log("menos de 10");
        showCountries();
        return

    }
    else if (filteredCountries.length == 1) {    
        // console.log("1 solo");
        countryInfo.classList.remove('columns');
        filteredCountries.forEach(p =>  {
            // console.log(p.latlng[0]);
            // console.log(p.latlng[1]);

            // console.log(p.latlng);

            let weather = [];

        const getWeather = async () => {
            try {
                // const response = await (await fetch('https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=ebc7989613fd848ce3a1ea3dcdbcd7f5')).json();
                const response = await fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${p.latlng[0]}&lon=${p.latlng[1]}&appid=ebc7989613fd848ce3a1ea3dcdbcd7f5&lang=es&units=metric`);
                const data = await response.json();
        
                clima = data; 
                // console.log(clima.main.feels_like);
               
                countryInfo.innerHTML= `
            <div class="country-card-details">
                <img class="country-flag" src="${p.flags.svg}">
                <span>Country: ${p.name.common}</span>
                <span>Capital: ${p.capital[0]} </span>
                <span>Population: ${p.population}</span>
                <span>Region: ${p.region}</span>
                <span>Tempeture: ${clima.main.feels_like}°</span>
                <span>Current weather: ${clima.weather[0].description}</span>
             </div>
            `;
        
            } catch (error) {
                alert('There was an error with your internet.')
            }
        };
            
            getWeather();
            
        });
    }

  else if (filteredCountries.length === 0) {
    countryInfo.classList.remove('columns');
    countryInfo.innerHTML= `
        <p class="country-text-info">Sorry, there is no country with those characters.</p>
        `;
        return;
  }

    else {
        
    }

});







// {
//     const filteredCountries = countries.filter(country => )
// }

// Combinacion de api y logica

// // creamos un array copia de la lista de opciones (paises) para poder dividirlo y eliminarle la parte del numero
// [...inputCountry.children].