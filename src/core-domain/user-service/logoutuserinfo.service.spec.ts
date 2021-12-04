import { HttpModule, HttpService } from "@nestjs/axios";
import { Test } from "@nestjs/testing";
import { HttpClient } from "../../infrastructure/client/http.client";
import { ConfigService } from "../../infrastructure/configuration/config.service";
import { WinstonLoggerModule } from "../../infrastructure/logger/winston.logger.module";
import { UserController } from "../../routes/user.controller";
import CreateUserInfo from "./createuserinfo.service";
import GetUserByUserId from "./getuserbyuserid.service";
import LogoutUserInfo from "./logoutuserinfo.service";
import { AxiosResponse } from "axios";
import { of } from "rxjs";

describe('LogoutUserInfo', () => {
    let logoutUserInfo: LogoutUserInfo;
    let httpService: HttpService;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [HttpModule,
                WinstonLoggerModule.forRoot({ level: ConfigService.create().getLogLevel() }),],
            controllers: [UserController],
            providers: [CreateUserInfo, GetUserByUserId, LogoutUserInfo, HttpClient]
        }).compile();

        logoutUserInfo = module.get<LogoutUserInfo>(LogoutUserInfo);
        httpService = module.get<HttpService>(HttpService);
    });

    it('LogoutuserInfo to be defined', async () => {
        expect(logoutUserInfo).toBeDefined();
    });

    describe('LogoutUserInfo to be equal', () => {
        it('GetUserByUserId', async () => {
            let date = new Date();

            const data = [{
                "userId": "User17",
                "browser": "chrome",
                "machineId": "10.102.20.45",
                "shopId": 123,
                "userLogin": "login",
                "loginDate": date,
            }];

            const result: AxiosResponse = await {
                data,
                status: 200,
                statusText: 'OK',
                headers: {},
                config: {},
            };

            const logoutUserService = {
                userId: "User17",
                browser: "chrome",
                machineId: "10.102.20.45",
                shopId: 123,
                loginDate: date,
                logoutDate: date,
            };

            jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(result));

            const res = await logoutUserInfo.handle(logoutUserService)
            expect(res.responseCode).toEqual("LOGGED_OUT")

        });
    });


});