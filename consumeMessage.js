require('dotenv').config()
const consumer = require("./Consumer")

const readMessage = async (data) => {
    console.log(data.Messages[0].Body)
    const message = await consumer.getContentHugeMessage(data)
    console.log(
        JSON.parse(
            message
        )
    )
}

consumer.consume(readMessage)

