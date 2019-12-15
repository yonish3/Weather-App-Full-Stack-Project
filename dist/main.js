render = new Render 
const loadPage = async function(){
    let data = await getDataFromDB()
    render.renderData(data)
}

const handleSearch = async function(){
    let cityInput = $('input').val()
    $('input').val("")

    await getCityData(cityInput)
    render.renderData(cityData)
}

loadPage()

$('button').on('click', function () {
    handleSearch()
})

$('#container').on('click','.addIcon', function () { 
    let cityName= $(this).siblings('.name').text()
    saveCity(cityName)
    loadPage()
})

$('#container').on('click','.removeIcon', function () { 
    let cityName= $(this).siblings('.name').text()
    removeCity(cityName)
    loadPage()
})