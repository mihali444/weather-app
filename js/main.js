const apiKey = '7f916ea8b52c4166ad665713231608'

// Элементы на странице
const header = document.querySelector('.header')
const form = document.querySelector('#form')
const input = document.querySelector('#input-city')

function removeCard() {
    const prevCard = document.querySelector('.card')
     if (prevCard) prevCard.remove()
}

function showCard(name, country, temp, condition) {

    const html = `<div class="card">
                    <h2 class="card-city">${name} <span>${country}</span></h2>

                    <div class="card-wather">
                        <div class="card-value">${temp}<sup>°c</sup></div>
                        <img class="card-img" src="./img/weather1.png" alt="Weather">
                    </div>

                    <div class="card-desc">${condition}</div>

                </div>`

        header.insertAdjacentHTML('afterend', html)
}

function showError(errorMessage) {
    const html = `<div class="card">${errorMessage}</div>`

    header.insertAdjacentHTML('afterend', html)
}

async function getWeather (city) {
    // Делаем запрос на сервер
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
    const response = await fetch(url)
    const data = await response.json()
    return data
}

// Слушаем отправку формы
form.onsubmit = async function (e) {

    // Отменяем отправку формы
    e.preventDefault()

    // Берём значение из инпута, обрезаем пробелы
    let city = input.value.trim()

    const data = await getWeather(city)

    if (data.error) {
        removeCard()
        showError(data.error.message)

    } else {
        
        removeCard()
        showCard(
            data.location.name,
            data.location.country, 
            data.current.temp_c, 
            data.current.condition.text
        )
    

    }

}