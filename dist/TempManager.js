class City {
    constructor(name, temperature, conditions, icon, fromSearchFlag){
        this.name = name,
        this.temperature = temperature,
        this.conditions = conditions,
        this.conditionPic = icon
        this.fromSearchFlag = fromSearchFlag
    }
}

class TempManager{
    constructor(){
        this.cityData = []
    }   

    getDataFromDB = async function(){
        this.cityData = await $.get(`/cities/`)
        return this.cityData
    }

    getCityData = async function(cityName){
        let data = await $.get(`/city/${cityName}`)
        data =JSON.parse(data)
        let Celsius =  Math.round(data.main.temp - 273.15)
        const city = new City (data.name, Celsius , data.weather[0].description, data.weather[0].icon, true)
        this.cityData.push(city)
    }

    saveCity = function (cityName){
        for (let index = 0; index < this.cityData.length; index++) {
            if (this.cityData[index].name==cityName){
                $.post("/city/", this.cityData[index], function (data, textStatus, jqXHR) {})
                break
            }
        }
    }

    removeCity = function (cityName){
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
}


