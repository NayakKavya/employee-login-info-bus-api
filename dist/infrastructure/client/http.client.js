"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = void 0;
const axios_1 = require("@nestjs/axios");
const config_service_1 = require("../configuration/config.service");
const user_setting_1 = require("../constants/user-setting");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let HttpClient = class HttpClient {
    constructor(httpService) {
        this.httpService = httpService;
        console.log("Httpclient object created");
    }
    async post(url, data) {
        let responsedata;
        var baseUrl = config_service_1.ConfigService.create().getBaseURl(user_setting_1.UserSettingConstants.MASTER_BASE_URL);
        console.log("URl :", baseUrl + url);
        var env = config_service_1.ConfigService.create().isProduction();
        if (env) {
            console.log("Enter into production Block");
            const tokenObservable = this.getIdentityToken(baseUrl);
            console.log(tokenObservable);
            var token = await (await (0, rxjs_1.lastValueFrom)(tokenObservable)).data;
            const requestConfig = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            };
            responsedata = await (0, rxjs_1.lastValueFrom)(this.httpService.post(baseUrl + url, data, requestConfig));
        }
        else {
            console.log("Enter into Dev Block", baseUrl + url);
            responsedata = await (0, rxjs_1.lastValueFrom)(this.httpService.post(baseUrl + url, data));
        }
        console.log(responsedata.data);
        return responsedata.data;
    }
    async patch(url, data) {
        let responsedata;
        var baseUrl = config_service_1.ConfigService.create().getBaseURl(user_setting_1.UserSettingConstants.MASTER_BASE_URL);
        console.log("URl :", baseUrl + url);
        var env = config_service_1.ConfigService.create().isProduction();
        if (env) {
            console.log("Enter into production Block");
            const tokenObservable = this.getIdentityToken(baseUrl);
            console.log(tokenObservable);
            await tokenObservable.subscribe(response => {
                var token = response.data;
                console.log("token :", token);
                const requestConfig = {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                };
                responsedata = this.httpService.patch(baseUrl + url, data).pipe((0, rxjs_1.map)(resp => (resp.data)));
            });
        }
        else {
            console.log("Enter into Dev Block");
            responsedata = this.httpService.patch(baseUrl + url, data).pipe((0, rxjs_1.map)(resp => (resp.data)));
        }
        console.log(responsedata);
        return responsedata;
    }
    async get(url, data) {
        let responsedata;
        var baseUrl = config_service_1.ConfigService.create().getBaseURl(user_setting_1.UserSettingConstants.MASTER_BASE_URL);
        console.log("URl :", baseUrl + url);
        var env = config_service_1.ConfigService.create().isProduction();
        if (env) {
            console.log("Enter into production Block");
            const tokenObservable = this.getIdentityToken(baseUrl);
            console.log(tokenObservable);
            await tokenObservable.subscribe(response => {
                var token = response.data;
                console.log("token :", token);
                const requestConfig = {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                };
                responsedata = this.httpService.get(baseUrl + url, data).pipe((0, rxjs_1.map)(resp => (resp.data)));
            });
        }
        else {
            console.log("Enter into Dev Block");
            responsedata = this.httpService.get(baseUrl + url, data).pipe((0, rxjs_1.map)(resp => (resp.data)));
        }
        console.log(responsedata);
        return responsedata;
    }
    async delete(url) {
        let responsedata;
        var baseUrl = config_service_1.ConfigService.create().getBaseURl(user_setting_1.UserSettingConstants.MASTER_BASE_URL);
        console.log("URl :", baseUrl + url);
        var env = config_service_1.ConfigService.create().isProduction();
        if (env) {
            console.log("Enter into production Block");
            const tokenObservable = this.getIdentityToken(baseUrl);
            console.log(tokenObservable);
            var token = await (await (0, rxjs_1.lastValueFrom)(tokenObservable)).data;
            const requestConfig = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            };
            responsedata = await (0, rxjs_1.lastValueFrom)(this.httpService.delete(baseUrl + url, requestConfig));
        }
        else {
            console.log("Enter into Dev Block", baseUrl + url);
            responsedata = await (0, rxjs_1.lastValueFrom)(this.httpService.delete(baseUrl + url));
        }
        console.log(responsedata.data);
        return responsedata.data;
    }
    getIdentityToken(recipientUrl) {
        const requestConfig = {
            params: {
                audience: recipientUrl,
            },
            headers: {
                'metadata-flavor': 'Google',
            }
        };
        return this.httpService.get(process.env.GCP_IDENTITY_TOKEN_URL, requestConfig);
    }
};
HttpClient = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], HttpClient);
exports.HttpClient = HttpClient;
//# sourceMappingURL=http.client.js.map