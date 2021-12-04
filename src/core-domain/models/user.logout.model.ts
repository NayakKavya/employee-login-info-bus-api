export class UserLogoutModel {
    constructor(public userId: string, public browser: string, public machineId: string,
        public shopId: number, public loginDate: Date, public logoutDate: Date) { }
}


export class LogoutStatus {
    constructor(public statusCode: number, public timestamp: Date, public path: string,
        public message: string, public responseCode: string) { }
}