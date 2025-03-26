export interface EmailOptions {
    host: string;
    port: number;
    auth: {
        user: string;
        pass: string;
    };
    from?: string;
}