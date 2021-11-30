import { HttpService } from "@nestjs/axios";
export declare class HttpClient {
    private httpService;
    constructor(httpService: HttpService);
    post(url: string, data: any): Promise<any>;
    patch(url: string, data: any): Promise<any>;
    get(url: string, data: any): Promise<any>;
    delete(url: string): Promise<any>;
    private getIdentityToken;
}
