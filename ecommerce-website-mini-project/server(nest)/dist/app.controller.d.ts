import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(name: string, age: number): string;
    postTest(data: any): string;
    putTest(id: string, data: any): string;
    deleteTest(test: string): string;
}
