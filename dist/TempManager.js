let cityData = []

class City {
    constructor(name, temperature, conditions, icon, fromSearchFlag){
        this.name = name,
        this.temperature = temperature,
        this.conditions = conditions,
        this.conditionPic = icon
        this.fromSearchFlag = fromSearchFlag
    }
}

const getDataFromDB = function(){
    return new Promise(resolve => {
        resolve($.get(`/cities/`, function (cities) {
            cityData = cities
        })
        )
    })
}

const getCityData = async function(cityName){
    let data = await $.get(`/city/${cityName}`)
    data =JSON.parse(data)
    let Celsius =  Math.round(data.main.temp - 273.15)
    const city = new City (data.name, Celsius , data.weather[0].description, data.weather[0].icon, true)
    cityData.push(city)
}


const saveCity = function (cityName){
    for (let index = 0; index < cityData.length; index++) {
        if (cityData[index].name==cityName){
            $.post("/city/", cityData[index], function (data, textStatus, jqXHR) {})
            break
        }
    }
}

const removeCity = function (cityName){
    $.ajax({
        method: "DELETE",
        url: `/city/${cityName}`,
        success: function (data) {
            console.log(data);
        },
        error: function (xhr, text, error) {
            console.log(text);
        }
    })
}



