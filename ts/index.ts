import * as request from "request-promise-native";
declare const Buffer

interface TokenSettings{
    method: string;
    uri: string;
    headers: object;
    form: object;
    json: boolean;
}

interface PaymentSettings{
    method: string;
    uri: string;
    headers: object;
    body: object;
    json: boolean;
}

interface AuthorizationSettings{
    method: string;
    uri: string;
    headers: object;
    json: boolean;
}

interface RefundSettings{
    method: string;
    uri: string;
    headers: object;
    body: string;
    json: boolean;
}

class GoPay {

    private apiUrl: string;
    private sid: string;
    private cid: string;
    constructor(clientId: string, secretID: string, sandbox: boolean = true) {
        this.cid = clientId;
        this.sid = secretID;
        this.apiUrl = sandbox ? "https://gw.sandbox.gopay.com/api" : "https://gate.gopay.cz/api";
    }

    async getToken(scope: string = "payment-all") {
        const authString: string = `Basic ${toBase64(`${this.cid}:${this.sid}`)}`;
        const settings: TokenSettings = {
            method: 'POST',
            uri: `${this.apiUrl}/oauth2/token`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': authString
            },
            form: {
                grant_type: 'client_credentials',
                scope: scope
            },
            json: true
        }
        try {
            const res =  await request(settings);
            return res.access_token;
        }
        catch (error) {
            return `StatusCode: ${error.statusCode}, message: ${error.message}`;
        }
    }

    async createPayment(data: object) {
        const token = await this.getToken();
        if (!token || token === '') return 'Error: Missing token';
        const settings: PaymentSettings = {
            method: 'POST',
            uri: `${this.apiUrl}/payments/payment`,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: data,
            json: true
        }
        try {
            const res =  await request(settings);
            return res;
        }
        catch (error) {
            return `StatusCode: ${error.statusCode}, message: ${error.message}`;
        }
    }

    async voidAuthorization(id: string) {
        const token = await this.getToken();
        if (!token || token === '') return 'Error: Missing token';
        const settings: AuthorizationSettings = {
            method: 'POST',
            uri: `${this.apiUrl}/payments/payment/${id}/void-authorization`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${token}`
            },
            json: true
        }
        try {
            const res =  await request(settings);
            return res;
        }
        catch (error) {
            return `StatusCode: ${error.statusCode}, message: ${error.message}`;
        }
    }

    async captureAuthorization(id: string) {
        const token = await this.getToken();
        if (!token || token === '') return 'Error: Missing token';
        const settings: AuthorizationSettings = {
            method: 'POST',
            uri: `${this.apiUrl}/payments/payment/${id}/capture`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${token}`
            },
            json: true
        }
        try {
            const res =  await request(settings);
            return res;
        }
        catch (error) {
            return `StatusCode: ${error.statusCode}, message: ${error.message}`;
        }
    }

    async partialAuthorization(id: string, data: object) {
        const token = await this.getToken();
        if (!token || token === '') return 'Error: Missing token';
        const settings: PaymentSettings = {
            method: 'POST',
            uri: `${this.apiUrl}/payments/payment/${id}/capture`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${token}`
            },
            body: data,
            json: true
        }
        try {
            const res =  await request(settings);
            return res;
        }
        catch (error) {
            return `StatusCode: ${error.statusCode}, message: ${error.message}`;
        }
    }

    async createRecurrence(id: string, data: object) {
        const token = await this.getToken();
        if (!token || token === '') return 'Error: Missing token';
        const settings: PaymentSettings = {
            method: 'POST',
            uri: `${this.apiUrl}/payments/payment/${id}/create-recurrence`,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: data,
            json: true
        }
        try {
            const res =  await request(settings);
            return res;
        }
        catch (error) {
            return `StatusCode: ${error.statusCode}, message: ${error.message}`;
        }
    }

    async voidRecurrence(id: string) {
        const token = await this.getToken();
        if (!token || token === '') return 'Error: Missing token';
        const settings: AuthorizationSettings = {
            method: 'POST',
            uri: `${this.apiUrl}/payments/payment/${id}/void-recurrence`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${token}`
            },
            json: true
        }
        try {
            const res =  await request(settings);
            return res;
        }
        catch (error) {
            return `StatusCode: ${error.statusCode}, message: ${error.message}`;
        }
    }

    async getStatus(id: string) {
        const token = await this.getToken();
        if (!token || token === '') return 'Error: Missing token';
        const settings: AuthorizationSettings = {
            method: 'GET',
            uri: `${this.apiUrl}/payments/payment/${id}`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${token}`
            },
            json: true
        }
        try {
            const res =  await request(settings);
            return res;
        }
        catch (error) {
            return `StatusCode: ${error.statusCode}, message: ${error.message}`;
        }
    }

    async refundPayment(id: string, amount: number) {
        const token = await this.getToken();
        if (!token || token === '') return 'Error: Missing token';
        const settings: RefundSettings = {
            method: 'POST',
            uri: `${this.apiUrl}/payments/payment/${id}`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${token}`
            },
            json: true,
            body: `amount=${amount}`
        }
        try {
            const res =  await request(settings);
            return res;
        }
        catch (error) {
            return `StatusCode: ${error.statusCode}, message: ${error.message}`;
        }
    }
}

function toBase64(s) {
    return new Buffer(s).toString("base64");
}