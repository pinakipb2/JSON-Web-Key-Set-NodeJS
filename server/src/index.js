const express = require("express")
const createError = require("http-errors")
require("dotenv").config()
const fs = require("fs")
const JWT = require("jsonwebtoken")

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static("public"))

app.get("/", async (req, res, next) => {
  const secret = fs.readFileSync("./certs/private.pem")
  const token = JWT.sign({}, secret, { algorithm: "RS256" })
  res.send({ token })
})

app.use((req, res, next) => {
  next(createError.NotFound())
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    status: err.status || 500,
    message: err.message,
  })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`))
