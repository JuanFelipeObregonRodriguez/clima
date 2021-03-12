const api = {
    key:"b9be6ec4a819e540a5dd8d8c3bd8e70c", 
    baseurl: "https://api.openweathermap.org/data/2.5/"}

const barraBuscar = document.querySelector(".buscar")
barraBuscar.addEventListener("keypress", setQuery)

function setQuery(evento){
    if (evento.keyCode == 13){
        buscarResultado(barraBuscar.value)
    }
}

function buscarResultado(query){
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(wheather => {
            return wheather.json()
        }).then(mostrarResultado)
}

function mostrarResultado (weather){
    let ciudad = document.querySelector(".lugar .ciudad")
    ciudad.innerText = `${weather.name}, ${weather.sys.country}`
    let fechaActual = new Date()
    let fecha = document.querySelector(".lugar .fecha")
    fecha.innerText = constructorFecha(fechaActual)

    let temperatura = document.querySelector(".current .temperatura")
    temperatura.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`

    let clima = document.querySelector(".current .clima")
    clima.innerText = weather.weather[0].main

    let maxmin = document.querySelector(".current .max-min")
    maxmin.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`
}

function constructorFecha(fechaActual){
    let meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
    let dias = ["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"]

    let dia = dias[fechaActual.getDay()]
    let fecha = fechaActual.getDate()
    let mes = meses[fechaActual.getMonth()]
    let anio = fechaActual.getFullYear()
    return `${dia} ${fecha} ${mes} ${anio}`
}