const countriesContainer = document.querySelector('#countries-container')
const newCountryForm = document.querySelector('#new-country-form')
const newCountryNameInput = document.getElementById('new-country-name')
const newCountryDescriptionInput = document.getElementById('new-country-description')

newCountryForm.addEventListener('submit', function(event){
  event.preventDefault()
  //send a post request, change the dom
  fetch("http://localhost:3000/countries", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Accepts: 'application/json'
    },
    body: JSON.stringify({
      name: newCountryNameInput.value,
      description: newCountryDescriptionInput.value
    })
  })
  .then(function(resp){
    return resp.json()
  })
  .then(function(jsonCountryObj){
    countriesContainer.innerHTML += `
      <div id="${jsonCountryObj.name}" data-id="${jsonCountryObj.id}" class="country-div">
        <h3>${jsonCountryObj.name}</h3>
        <p>${jsonCountryObj.description}</p>
        <p>Cities I've visited:</p>
        <ul id="${jsonCountryObj.name}-visited-cities">
          Cities will go here
        </ul>
      </div>
    `
  })
})

fetch("http://localhost:3000/countries")
  .then(function(responseFromNetWorkRequest){
    return responseFromNetWorkRequest.json()
  })
  .then(function(countriesJsObj){
    countriesJsObj.forEach(function(countryObj){
      countriesContainer.innerHTML += `
        <div id="${countryObj.name}" data-id="${countryObj.id}" class="country-div">
          <h3>${countryObj.name}</h3>
          <p>${countryObj.description}</p>
          <p>Cities I've visited:</p>
          <ul id="${countryObj.name}-visited-cities">
            Cities will go here
          </ul>
        </div>
      `
    })
  })
