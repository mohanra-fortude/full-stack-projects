import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import { join } from "path";
import * as helmet from "helmet";
import { config } from "aws-sdk";

// boostraping : initialising or setting up the application
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix("api");
  app.useGlobalPipes(new ValidationPipe()); // enable app level validation for request data
  app.enableCors();
  // app.use(helmet()); should be uncommented later ...
  app.setBaseViewsDir(join(__dirname, "..", "templates"));
  app.setViewEngine("hbs");
  // SWAGGER CONFIG
  const configs = new DocumentBuilder()
    .setTitle("My Api")
    .setDescription("The swagger API documentation sample")
    .setVersion("1.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "JWT",
        description: "Enter JWT token",
        in: "header",
      },
      "JWT-auth" // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .build();

  const configService = app.get(ConfigService);
  config.update({
    accessKeyId: configService.get("AWS_ACCESS_KEY_ID"),
    secretAccessKey: configService.get("AWS_SECRET_ACCESS_KEY"),
    region: configService.get("AWS_REGION"),
  });
  const document = SwaggerModule.createDocument(app, configs);
  SwaggerModule.setup("api-docs", app, document);
  const port = process.env.PORT || 8080;
  await app.listen(port);
  Logger.log(`Server running at port ${port}`);
}
bootstrap();
