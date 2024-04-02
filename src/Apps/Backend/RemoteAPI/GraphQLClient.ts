class GraphQLClient {
    private readonly endpoint: string = 'https://rickandmortyapi.com/graphql';
    private readonly headers: HeadersInit  = {
        'Content-Type'  : 'application/json',
        'Accept'        : 'application/json',
    };

    async query(query: string): Promise<any> {
        const { default: fetch } = await import('node-fetch')
        const response = await fetch(this.endpoint, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({ query }),
        });

        return await response.json();
    }
}

export { GraphQLClient };