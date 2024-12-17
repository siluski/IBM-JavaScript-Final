let locations = [];
const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('resetSearchBtn');
searchBtn.addEventListener("click", getLocations);
clearBtn.addEventListener("click", clearSearch);


function getLocations(){
    const input = document.getElementById("search").value.toLowerCase();
    let resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    fetch('travel_recommendation_api.json').then(response => response.json()).then(data =>{
        //let location;
        if(validateBeach(input)){
            locations = data.beaches;
            console.log("HERE");
            locations.forEach(location =>{
                resultDiv.innerHTML+='<div id = "location">';
                resultDiv.innerHTML+=`<img src=${location.imageUrl}>`;
                resultDiv.innerHTML+=`<h3>${location.name}</h3>`
                resultDiv.innerHTML+=`<p>${location.description}</p>`
                resultDiv.innerHTML+='</div>'
            });
        }
        else if(validateTemples(input)){
            locations = data.temples;
            locations.forEach(location =>{
                resultDiv.innerHTML+='<div id = "location">';
                resultDiv.innerHTML+=`<img src=${location.imageUrl}>`;
                resultDiv.innerHTML+=`<h3>${location.name}</h3>`
                resultDiv.innerHTML+=`<p>${location.description}</p>`
                resultDiv.innerHTML+='</div>'
            });
        }else{
            locations = validateCountry(input,data);
            if(locations === false){
                alert("No data could be found, please enter a valid search term (beaches, temples, countries)");
            }else{
                locations = data.countries;
                locations.forEach(location=>{
                    resultDiv.innerHTML+='<div id="location">';
                    resultDiv.innerHTML+=`<h3>${location.name}</h3>`;
                    location.cities.forEach(city=>{
                        resultDiv.innerHTML+='<div id="city">';
                        resultDiv.innerHTML+=`<img src=${city.imageUrl}>`;
                        resultDiv.innerHTML+=`<h5>${city.name}<h5>`;
                        resultDiv.innerHTML+=`<p>${city.description}<p>`;
                        resultDiv.innerHTML+='</div>';
                    });
                    resultDiv.innerHTML+='</div>';
                });
            }
        }
        console.log(locations);
    }).catch(error=>{
        console.error(error);
        alert("Error while fetching your data, please try again with different input");
    })
}

function validateBeach(input){
    if(input !== 'beach' && input !== 'beaches'){
        return false;
    }
    return true;
}

function validateTemples(input){
    if(input !== 'temple' && input !=='temples'){
        return false;
    }
    return true;
}

function validateCountry(input, data){
    // let countryInfo = data.countries.find(country=>country.name.toLowerCase()===input);
    // if(!countryInfo){
    //     return null;
    // }
    // return countryInfo;
    if(input !== 'country' && input !== 'countries'){
        return false;
    }
    return true;
}

function clearSearch(){
    let resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    locations = [];
    document.getElementById("search").value = '';

}

