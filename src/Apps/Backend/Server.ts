import express, { Express } from 'express';
import { createServer, Server } from 'http';
import { createYoga } from 'graphql-yoga';
import { GraphQLSchema } from 'graphql';

import schemas from './Schemas/Index';
import logResponseMetrics from './Middlewares/logResponseMetrics';
import context from './Context/Context';
import Context from './Context/ContextContract';

export class ExpressYogaServer {
    private readonly url: string;
    private readonly port: string;
    private readonly expressApp: Express;
    public readonly server: Server;

    constructor(url: string,port: string) {
        this.url        = url;
        this.port       = port;
        this.expressApp = express();

        this.expressApp.use(logResponseMetrics);

        const yoga = createYoga({
            schema: schemas as GraphQLSchema,
            context: context as Context, 
        });

        this.expressApp.use('/graphql', yoga);
        this.server = createServer(this.expressApp);
    }

    async start(): Promise<void> {
        return new Promise(resolve => {
            this.server.listen(this.port, () => {
                console.log(`Server is running on ${this.url}:${this.port}/graphql`);
                resolve();
            });
        });
    }

    async stop(): Promise<void> {
        return new Promise(resolve => {
            this.server.close(() => {
                console.log('Server stopped.');
                resolve();
            });
        });
    }
}
