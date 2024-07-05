require('dotenv').config()
const express = require('express')
const connectDb = require('./db/conn')
const app = express()


const port = 3000
connectDb()




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})