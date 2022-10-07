import fs = require('fs')

module.exports = { 
    apology: apology
}

function apology(message: string, code=400) {
    let apologyHTML: string = fs.readFileSync("templates/layout.html", "utf-8")
    console.log(test())
    apologyHTML.replace(/TITLE/, "Apology")
   //apologyHTML.replace("{{{}}}")
   return apologyHTML
}