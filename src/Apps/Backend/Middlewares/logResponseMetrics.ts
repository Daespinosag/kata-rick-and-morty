import { Request, Response, NextFunction } from 'express';
import chalk from 'chalk';

export default function logResponseMetrics(req: Request, res: Response, next: NextFunction): void {
    const startHrTime = process.hrtime();

    res.on('finish', () => {
        const elapsedHrTime = process.hrtime(startHrTime);
        const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
        
        console.log(
            `[${chalk.blue(new Date().toISOString())}][${chalk.yellow('LRM')}] ${chalk.yellowBright(req.connection.remoteAddress)}:${chalk.yellow(req.connection.remotePort)} - ${req.method} ${req.originalUrl} - ${res.statusCode} ${res.statusCode === 200 ? chalk.green(res.statusMessage) : chalk.red(res.statusMessage)} - ${res.statusCode === 200 ? chalk.green(elapsedTimeInMs.toFixed(2)) : chalk.red(elapsedTimeInMs.toFixed(2))} ms`
        );               
    });

    next();
}
