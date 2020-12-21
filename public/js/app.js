console.log("Client side javascript file is loaded!")

//Getting data from index.hbs
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#msg1')
const message2 = document.querySelector('#msg2')

// message1.textContent = 'from javascript' used to update or change the data in the html file or web page

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value
    message1.textContent = 'Loading...'
    message2.textContent = ''

    //fetch is client side javascript, allows us to fetch a data from url and do something with it.
    fetch('http://localhost:3000/weather?address='+ location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                message1.textContent = data.error
            }else{
                message1.textContent = data.location
                message2.textContent = data.forecast
            }
        })
    })
})
