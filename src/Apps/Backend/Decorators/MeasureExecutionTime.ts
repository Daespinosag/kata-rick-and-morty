import chalk from 'chalk';

function MeasureExecutionTime(description?: string) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function(...args: any[]) {
            const message: string = description ?? `EXECUTION TIME :: ${propertyKey}`;

            const start = performance.now();
            const result = originalMethod.apply(this, args);
            const end = performance.now();

            console.log(
                `[${chalk.yellow(new Date().toISOString())}][${chalk.blue(message)}] - ${chalk.green((end - start).toFixed(2))} ${('ms')}`
            );
        
            return result;
        };

        return descriptor;
    };
}


export { MeasureExecutionTime }
