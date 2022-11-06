const { Kafka } = require("kafkajs");

module.exports = async (data) => {
  //   try {
  //   const kafka = new Kafka({
  //     clientId: "my-app",
  //     brokers: ["localhost:9092"],
  //   });
  //     const producer = kafka.producer();

  //     await producer.connect();
  //     await producer.send({
  //       topic: "kafka_afitra_betest",
  //       messages: [{ value: "Hello KafkaJS user!" }],
  //     });

  //     await producer.disconnect();
  //   } catch (error) {}

  try {
    const kafka = new Kafka({
      clientId: "my-app",
      brokers: ["localhost:9092"],
    });
    const consumer = kafka.consumer({ groupId: "test-group" });

    await consumer.connect();
    await consumer.subscribe({
      topic: "kafka_afitra_betest",
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          value: message.value.toString(),
        });
      },
    });
  } catch (error) {}
};
