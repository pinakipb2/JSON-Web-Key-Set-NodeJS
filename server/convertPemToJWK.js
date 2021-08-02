const fs = require("fs")
const rsaPemToJwk = require("rsa-pem-to-jwk")

// If this does not work try copy pasting the private.pem in a variable
const privateKey = fs.readFileSync("./certs/private.pem")
const jwk = rsaPemToJwk(privateKey, { use: "sig" }, "public")

console.log(jwk)
