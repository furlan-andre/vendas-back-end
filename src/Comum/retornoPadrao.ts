export class RetornoPadrao {
    constructor(status: number, message:string) {
        this.message = message;
        this.status = status;
    }
    
    status: number;
    message: string;    
}