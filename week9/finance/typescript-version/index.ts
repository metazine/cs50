import http = require("http");
import fs = require("fs")
let helpers = require("./helpers.js")

const server = http.createServer((request, response)=> {
    const template = fs.readFileSync("templates/layout.html")
    response.write(helpers.apology("template", 400))
    response.end()
})

server.listen(3000)

