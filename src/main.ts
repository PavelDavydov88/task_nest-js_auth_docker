import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Transport } from "@nestjs/microservices";
import { ConfigModule } from "@nestjs/config";
async function start() {
  const configModule = ConfigModule.forRoot({
    envFilePath: `.${process.env.NODE_ENV}.env`
  });
  const rabbitUrls = process.env.RABBIT_URLS;
  const PORT = process.env.PORT || 4998;
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [rabbitUrls],
      queue: "user_queue",
      queueOptions: {
        durable: false
      }
    }
  });
  await app.startAllMicroservices();
  await app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
}

start();
