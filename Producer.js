require("./Aws")
const sqsHandler = require('@battleline/sqs-large-payload-nodejs');
const Constant = require("./Constant");

class Producer {

    constructor() {
        this.client = new sqsHandler.SqsLargePayloadService(
            Constant.OPTIONS_PAYLOAD_HUGE
        );
    }

    publish(message) {
        return this.client.SendMessage(JSON.stringify(message))
    }
}

const producer = new Producer();

module.exports = producer