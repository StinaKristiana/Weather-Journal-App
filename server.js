let projectData = {}

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())

app.use(express.static('website'))

app.get('/all', returnProjectData)

const server = app.listen(port, () => {
  console.log(`You are now on port: ${port}`)
})

function returnProjectData (req, res) {
  res.send(projectData)
}

app.post('/add', addIncomingData)

function addIncomingData (req, res) {
  projectData['temp'] = req.body.temp
  projectData['date'] = req.body.date
  projectData['content'] = req.body.content
  res.send(projectData)
}
