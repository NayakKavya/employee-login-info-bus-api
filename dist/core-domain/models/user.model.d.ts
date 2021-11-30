export declare class UserModel {
    userId: string;
    browser: string;
    machineId: string;
    shopId: number;
    userLogin: string;
    loginDate: Date;
    constructor(userId: string, browser: string, machineId: string, shopId: number, userLogin: string, loginDate: Date);
}
export declare class LoginStatus {
    status: string;
    response: UserModel;
    constructor(status: string, response: UserModel);
}
