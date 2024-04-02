import { ExpressYogaServer } from './Server';

export class BackendApp {
	server?: ExpressYogaServer;

	async start(): Promise<void> {
		const port = process.env.PORT ?? '8090';
		this.server = new ExpressYogaServer(port);
	
		return this.server.start();
	}

	get httpServer(): any {
		return this.server?.server
	}

	async stop(): Promise<void> {
		return this.server?.stop();
	}
}
