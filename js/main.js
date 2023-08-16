const apiKey = '7f916ea8b52c4166ad665713231608'

// Элементы на странице
const header = document.querySelector('.header')
const form = document.querySelector('#form')
const input = document.querySelector('#input-city')

// Слушаем отправку формы
form.onsubmit = function (e) {

    // Отменяем отправку формы
    e.preventDefault()

    // Берём значение из инпута, обрезаем пробелы
    let city = input.value.trim()
    
    // Делаем запрос на сервер
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`

    fetch(url).then((response) => {
        return response.json()
    })
    .then((data) => {
        
        //Проверка на ошибки

        if (data.error) {
            const prevCard = document.querySelector('.card')
            if (prevCard) prevCard.remove()

            const html = `<div class="card">${data.error.message}</div>`

            header.insertAdjacentHTML('afterend', html)
        } else {
            //Удаляем предыдущую карточку
        const prevCard = document.querySelector('.card')
        if (prevCard) prevCard.remove()

        // Разметка для карточки
        const html = `<div class="card">
                    <h2 class="card-city">${data.location.name} <span>${data.location.country}</span></h2>

                    <div class="card-wather">
                        <div class="card-value">${data.current.temp_c}<sup>°c</sup></div>
                        <img class="card-img" src="./img/weather1.png" alt="Weather">
                    </div>

                    <div class="card-desc">${data.current.condition.text}</div>

                </div>`

        //Отображаем карточку на странице
        header.insertAdjacentHTML('afterend', html)
        }
    })

}