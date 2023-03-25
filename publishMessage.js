require("dotenv").config()
const producer = require("./Producer")

let itens = []
for (let index = 0; index < 10000; index++) {
    itens.push({
        name: `teste_${index}`,
        email: `teste${index}@gmail.com`
    })
}

producer.publish({ itens }).then(console.log)
