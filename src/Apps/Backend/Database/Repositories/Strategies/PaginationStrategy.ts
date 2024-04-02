class PaginationStrategy {
    apply(page: number | undefined, query: any): void {
        if (typeof page === 'number' && page > 0) {
            const limit = 20;
            const offset = (page - 1) * limit;
            query.limit = limit;
            query.offset = offset;
        }
    }
}

export {PaginationStrategy}