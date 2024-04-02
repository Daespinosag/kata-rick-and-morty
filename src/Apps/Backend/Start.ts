import 'reflect-metadata';
import { BackendApp } from './BackendApp';

void (async () => {
	try {
		await new BackendApp().start();
	} catch (e) {
		console.error(e);
		process.exit(1);
	}

	process.on('uncaughtException', err => {
		console.error('uncaughtException', err);
		process.exit(1);
	});
})();
