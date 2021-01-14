const countriesContainer = document.querySelector('#countries-container')
const newCountryForm = document.querySelector('#new-country-form')
const newCountryNameInput = document.getElementById('new-country-name')
const newCountryDescriptionInput = document.getElementById('new-country-description')

countriesContainer.addEventListener('submit', handleSubmitCityForm)

function handleSubmitCityForm(e){
  e.preventDefault()

  //it's good to specify targets of events to make sure the correct actions are being fired, even though in this case
  //we know that a submit event can only happen on a form and there are no other forms in this div which would fire an event
  if(e.target.className = "country-city-form"){
    let name = e.target.elements[0].value
    let population = e.target.elements[1].value
    let countryId = e.target.dataset.countryId

    fetch("http://localhost:3000/cities", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json'
      },
      body: JSON.stringify({
        name: name,
        population: population,
        country_id: countryId
      })
    })
    .then(function(resp){
      return resp.json()
    })
    .then(function(cityJsonObj){
      let countryCitiesUl = document.getElementById(`${cityJsonObj.country_id}-cities`)
      countryCitiesUl.innerHMTL += makeOneCityObjLI(cityJsonObj)
    })
  }
}

function makeBody(){
  return JSON.stringify({
    name: newCountryNameInput.value,
    description: newCountryDescriptionInput.value
  })
}

newCountryForm.addEventListener('submit', function(event){
  event.preventDefault()
  //send a post request, change the dom
  fetch("http://localhost:3000/countries", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Accepts: 'application/json'
    },
    body: makeBody()
  })
  .then(function(resp){
    return resp.json()
  })
  .then(function(jsonCountryObj){
    countriesContainer.innerHTML += buildCountryDiv(jsonCountryObj)
  })
})

fetch("http://localhost:3000/countries")
  .then(function(responseFromNetWorkRequest){
    return responseFromNetWorkRequest.json()
  })
  .then(function(countriesJsObj){
    countriesJsObj.forEach(function(countryObj){

      // function map(array, aFunc){
      //
      //   let array = []
      //   for(let i = 0; i < array.length, i++){
      //     array.push(aFunc(array[i]))
      //   }
      //   return array
      // }

      // map(cities, makeOneCityObjLI())

      countriesContainer.innerHTML += buildCountryDiv(countryObj)
    })
  })

function makeOneCityObjLI(cityObj){
  console.log("Is this firing?");
  return `<li>${cityObj.name} - Population: ${cityObj.population}</li>`
}

function buildCountryDiv(countryObj){

  let stringOfCityLIs = countryObj.cities.map(makeOneCityObjLI).join("")

  return `
    <div id="${countryObj.name}" data-id="${countryObj.id}" class="country-div">
      <h3>${countryObj.name}</h3>
      <p>${countryObj.description}</p>
      <p>Cities in this country:</p>
      <ul id="${countryObj.id}-cities">
        ${stringOfCityLIs.length === 0 ? "No cities entered yet" : stringOfCityLIs}
      </ul>
      <form data-country-id="${countryObj.id}" class="country-city-form">
        <input type="text" placeholder="City name">
        <br>
        <input type="text" placeholder="City population">
        <br>
        <input type="Submit" value="Add A City!">
      </form>
    </div>
  `
}
