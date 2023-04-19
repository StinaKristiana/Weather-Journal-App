const apiKey = '811eee9c924702ee34682cfc72905715&units=imperial'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?'
const generateBtn = document.getElementById('generate')

let d = new Date()
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear()

generateBtn.addEventListener('click', integrationAPI)

const getWeatherData = async (baseUrl, apiKey) => {
  const zipCode = document.getElementById('zip').value
  const res = await fetch(`${baseUrl}q=${zipCode}&appid=${apiKey}`)
  try {
    const data = await res.json()
    return data
  } catch (error) {
    alert('There seems to be some error:', error)
  }
}

function integrationAPI (e) {
  const content = document.getElementById('feelings').value
  e.preventDefault()
  getWeatherData(baseUrl, apiKey)
    .then(data => {
      postData('/addDatatoServer', {
        temp: data.main.temp,
        date: newDate,
        content: content
      })
    })
    .then(() => {
      showData()
    })
    .catch(error => {
      alert('Please try again, or check if zipcode is valid', error)
    })
  document.getElementById('userInfo').reset()
}

const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      temp: data.temp,
      date: data.date,
      content: data.content
    })
  })
  try {
    const postedData = await response.json()
    return postedData
  } catch (error) {
    alert('There seems to be an error', error)
  }
}

const showData = async () => {
  const request = await fetch('/all')
  try {
    const allData = await request.json()
    {
      document.getElementById('date').innerHTML = allData.date
      document.getElementById('temp').innerHTML = allData.temp + 'C'
      document.getElementById('content').innerHTML = allData.content
    }
  } catch (error) {
    alert('Hmmm, looks like there is some error', error)
  }
}
