const express = require("express")
const createError = require("http-errors")
require("dotenv").config()
const expressJWT = require("express-jwt")
const jwksClient = require("jwks-rsa")

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(
  expressJWT({
    secret: jwksClient.expressJwtSecret({
      jwksUri: "http://localhost:5000/.well-known/jwks.json",
      cache: true,
      rateLimit: true,
    }),
    algorithms: ["RS256"],
  }).unless({ path: ["/"] })
)

app.get("/", async (req, res, next) => {
  res.send({ message: "This is Not a Protected Route" })
})

app.get("/protected", async (req, res, next) => {
  res.send({ message: "This is a Protected Route" })
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

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`))
