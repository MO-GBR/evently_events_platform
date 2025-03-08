export const handleError = (error: unknown) => {
    console.error(error);
    throw new Error(typeof error === 'string' ? error : JSON.stringify(error));
};

export class ActionResponse {
    public statusCode: number;
    public data: any;

    constructor(statusCode: number, data: any) {
        this.statusCode = statusCode
        this.data = data;
    }
}