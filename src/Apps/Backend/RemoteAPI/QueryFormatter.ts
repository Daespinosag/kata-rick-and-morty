type InfoField = string;
type ResultField = string | { [key: string]: ResultField[] };

class QueryFormatter {
    private functionName: string = '';
    private args: string = '';
    private infoFields: InfoField[] = [];
    private resultsFields: ResultField[] = [];

    defineFunction(functionName: string): QueryFormatter {
        this.functionName = functionName;
        return this;
    }

    addArgs(args: { page?: number; filter?: Record<string, any>, ids?: number[] }): QueryFormatter {
        const argsList: string[] = [];

        if (args.page !== undefined) {
            argsList.push(`page: ${args.page}`);
        }

        if (args.filter && Object.keys(args.filter).length > 0) {
            const filterStrings = Object.entries(args.filter)
                .map(([key, value]) => `${key}: "${value}"`);
            argsList.push(`filter: { ${filterStrings.join(', ')} }`);
        }

        if (args.ids && args.ids.length > 0){
            argsList.push(`ids: [${args.ids.join(', ')}]`);
        }

        this.args = argsList.length > 0 ? `(${argsList.join(', ')})` : '';
        return this;
    }

    addInfo(fields: InfoField[]): QueryFormatter {
        this.infoFields = fields;
        return this;
    }

    addResults(fields: ResultField[]): QueryFormatter {
        this.resultsFields = fields;
        return this;
    }

    private formatFields(fields: ResultField[]): string {
        return fields.map(field => {
            if (typeof field === 'string') {
                return field;
            } else {
                const key = Object.keys(field)[0];
                return `${key} { ${this.formatFields(field[key])} }`;
            }
        }).join('\n');
    }

    build(): string {
        const queryParts: string[] = [`query { ${this.functionName}${this.args} {`];

        if (this.infoFields.length > 0) {
            const infoStr = this.infoFields.join('\n');
            queryParts.push(`info {\n${infoStr}\n}`);
        }

        if (this.resultsFields.length > 0) {
            const resultsStr = this.formatFields(this.resultsFields);
            queryParts.push(`results {\n${resultsStr}\n}`);
        }

        queryParts.push('}}');
        return queryParts.join('');
    }
}

export {QueryFormatter}
