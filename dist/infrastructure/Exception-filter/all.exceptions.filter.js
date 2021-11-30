"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
let AllExceptionsFilter = class AllExceptionsFilter {
    catch(exception, host) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        const getCircularReplacer = () => {
            const seen = new WeakSet();
            return (key, value) => {
                if (typeof value === "object" && value !== null) {
                    if (seen.has(value)) {
                        return;
                    }
                    seen.add(value);
                }
                return value;
            };
        };
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let err;
        console.log('status from catch block http++--', JSON.stringify(exception, getCircularReplacer()));
        const msg = (_a = JSON.parse(JSON.stringify(exception, getCircularReplacer()))) === null || _a === void 0 ? void 0 : _a.details;
        console.log('+++++++++++++++++++', msg);
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let mesage = msg;
        let errCode;
        if (exception instanceof Error) {
            let excep = exception;
            console.log('+++++++++++++++++++____Error_', (_b = excep === null || excep === void 0 ? void 0 : excep.response) === null || _b === void 0 ? void 0 : _b.data);
            status = (_d = (_c = excep === null || excep === void 0 ? void 0 : excep.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.statusCode;
            mesage = ((_f = (_e = excep === null || excep === void 0 ? void 0 : excep.response) === null || _e === void 0 ? void 0 : _e.data) === null || _f === void 0 ? void 0 : _f.message) === undefined ? exception === null || exception === void 0 ? void 0 : exception.message : (_h = (_g = excep === null || excep === void 0 ? void 0 : excep.response) === null || _g === void 0 ? void 0 : _g.data) === null || _h === void 0 ? void 0 : _h.message;
            errCode = +((_k = (_j = excep === null || excep === void 0 ? void 0 : excep.response) === null || _j === void 0 ? void 0 : _j.data) === null || _k === void 0 ? void 0 : _k.errorCode);
        }
        if (exception instanceof common_1.HttpException) {
            console.log('+++++++++++++++++++_____', exception.getResponse());
            let responseMsg = exception.getResponse();
            status = exception.getStatus();
            mesage = exception === null || exception === void 0 ? void 0 : exception.message;
            errCode = +(responseMsg === null || responseMsg === void 0 ? void 0 : responseMsg.code);
        }
        if (exception instanceof microservices_1.RpcException) {
            mesage = exception.message;
        }
        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: mesage,
            errorCode: errCode
        });
    }
};
AllExceptionsFilter = __decorate([
    (0, common_1.Catch)()
], AllExceptionsFilter);
exports.AllExceptionsFilter = AllExceptionsFilter;
//# sourceMappingURL=all.exceptions.filter.js.map