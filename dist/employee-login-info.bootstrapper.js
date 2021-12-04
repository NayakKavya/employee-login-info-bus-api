"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const user_module_1 = require("./routes/user.module");
const config_service_1 = require("./infrastructure/configuration/config.service");
const http_exception_filter_1 = require("./infrastructure/Exception-filter/http.exception.filter");
const all_exceptions_filter_1 = require("./infrastructure/Exception-filter/all.exceptions.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(user_module_1.UserModule);
    app.enableCors();
    var port = config_service_1.ConfigService.create().getPort();
    console.log(port);
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.useGlobalFilters(new all_exceptions_filter_1.AllExceptionsFilter());
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=employee-login-info.bootstrapper.js.map