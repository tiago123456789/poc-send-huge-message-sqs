const { AWS, credentials } = require("./Aws")
const sqsHandler = require('@battleline/sqs-large-payload-nodejs');
const Constant = require("./Constant");

const DEFAULT_TIME_TIMEOUT = 1000;

class Consumer {

    constructor() {
        this.pollNewMessageTimeout;
        this.client = new AWS.SQS({
            region: process.env.AWS_REGION,
            credentials
        });
        this.clientSqsHugeMessage = new sqsHandler.SqsLargePayloadService(
            Constant.OPTIONS_PAYLOAD_HUGE
        );
    }

    async getContentHugeMessage(message) {
        const expectedResultFromQeueu = await this.clientSqsHugeMessage.ProcessReceivedMessage(message.Messages[0].Body);
        return JSON.parse(expectedResultFromQeueu).message;
    }

    consume(callback) {
        return this.client.receiveMessage({
            QueueUrl: process.env.AWS_QUEUE_URL
        })
            .promise()
            .then((data) => {
                clearTimeout(this.pollNewMessageTimeout)
                return data;
            })
            .then(async data => {
                if (data.Messages) {
                    await callback(data)
                    await this.client.deleteMessage({
                        QueueUrl: process.env.AWS_QUEUE_URL,
                        ReceiptHandle: data.Messages[0].ReceiptHandle
                    }).promise()
                }
            })
            .finally(() => {
                this.pollNewMessageTimeout = setTimeout(
                    () => this.consume(callback), 
                    DEFAULT_TIME_TIMEOUT
                )
            })
    }
}

const consumer = new Consumer();

module.exports = consumer;


