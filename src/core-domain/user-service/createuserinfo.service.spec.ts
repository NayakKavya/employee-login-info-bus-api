import { HttpModule, HttpService } from "@nestjs/axios";
import { Test } from "@nestjs/testing";
import { HttpClient } from "../../infrastructure/client/http.client";
import { ConfigService } from "../../infrastructure/configuration/config.service";
import { WinstonLoggerModule } from "../../infrastructure/logger/winston.logger.module";
import { UserController } from "../../routes/user.controller";
import CreateUserInfo from "./createuserinfo.service"
import GetUserByUserId from "./getuserbyuserid.service";
import LogoutUserInfo from "./logoutuserinfo.service";
import { AxiosResponse } from "axios";
import { of } from "rxjs";

describe('CreateUserInfo Service', () => {
    let createUserInfo: CreateUserInfo;
    let httpService: HttpService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [HttpModule,
                WinstonLoggerModule.forRoot({ level: ConfigService.create().getLogLevel() }),],
            controllers: [UserController],
            providers: [CreateUserInfo, GetUserByUserId, LogoutUserInfo, HttpClient]
        }).compile();

        createUserInfo = module.get<CreateUserInfo>(CreateUserInfo);
        httpService = module.get<HttpService>(HttpService);
    });

    it('CreateUserInfo to be defined', async () => {
        expect(createUserInfo).toBeDefined();
    });

    it('CreateUserInfo to be equal', async () => {
        let date = new Date()

        const data = [{
            "userId": "User17",
            "browser": "chrome",
            "machineId": "10.102.20.45",
            "shopId": 123,
            "userLogin": "login",
            "loginDate": date
        }]
        const result: AxiosResponse = await {
            data,
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
        };

        const loginUserService = {
            userId: "User17",
            browser: "chrome",
            machineId: "10.102.20.45",
            shopId: 123,
            userLogin: "login",
            loginDate: date
        };

        jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(result));
        const res = await createUserInfo.handle(loginUserService)
        console.log('ressss', res)
        expect(res.status).toEqual('SUCCESS')
    });
});