
module.exports = {
    OPTIONS_PAYLOAD_HUGE: {
        s3BucketName: process.env.AWS_BUCKET,
        region: process.env.AWS_REGION,
        s3DeleteAfterLoad: false,
        maxMessageSize: 262144,
        queueName: process.env.AWS_QUEUE_NAME,
    }
}