import { ExpressYogaServer } from './Server';

export class BackendApp {
	server?: ExpressYogaServer;

	async start(): Promise<void> {
		this.server = new ExpressYogaServer(process.env.URL || "http://localhost", process.env.PORT || "8080");
	
		return this.server.start();
	}

	get httpServer(): any {
		return this.server?.server
	}

	async stop(): Promise<void> {
		return this.server?.stop();
	}
}
