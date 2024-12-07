const locations = [];
const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener("click", getLocations);

function getLocations(){
    const input = document.getElementById("search").value.toLowerCase();

    fetch('travel_recommendation_api.json').then(response => response.json()).then(data =>{
        let location;
        if(validateBeach(input)){
            location = data.beaches;
        }
        else if(validateTemples(input)){
            location = data.temples;
        }else{
            location = validateCountry(input,data);
            if(location === null){
                alert("No data could be found, please enter a valid search term (beaches, temples, countries)");
            }
        }
        console.log(location);
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
    let countryInfo = data.countries.find(country=>country.name.toLowerCase()===input);
    if(!countryInfo){
        return null;
    }
    return countryInfo;
}