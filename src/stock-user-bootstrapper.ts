import { NestFactory } from "@nestjs/core";
import { UserModule } from "./routes/user.module";
import { ConfigService } from "./infrastructure/configuration/config.service";
import { HttpExceptionFilter } from "./infrastructure/Exception-filter/http.exception.filter";
import { AllExceptionsFilter } from "./infrastructure/Exception-filter/all.exceptions.filter";

async function bootstrap() {
    const app = await NestFactory.create(UserModule)
    app.enableCors();
    var port = ConfigService.create().getPort();
    console.log(port);
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalFilters(new AllExceptionsFilter());
    await app.listen(port);

}

bootstrap();
