import dotenv from 'dotenv';
dotenv.config();

class GraphQLClient {
    private readonly headers: HeadersInit  = {
        'Content-Type'  : 'application/json',
        'Accept'        : 'application/json',
    };

    async query(query: string): Promise<any> {
        const { default: fetch } = await import('node-fetch')
        const response = await fetch(`${process.env.REMOTE_URL}/${process.env.REMOTE_PROTOCOL}`, {
            method: process.env.REMOTE_METHOD,
            headers: this.headers,
            body: JSON.stringify({ query }),
        });

        return await response.json();
    }
}

export { GraphQLClient };