import { Filter, PageInfo } from "../../Shared/generics";
import { FilterStrategy } from "./Strategies/FilterStrategy";
import { PaginationStrategy } from "./Strategies/PaginationStrategy";

export abstract class Repository {
  protected async paginateAndFilter<T>(
    model: any,
    page: number = 0,
    filters: Filter[] = [],
    strategies: { pagination: PaginationStrategy; filter: FilterStrategy }
  ): Promise<{ info: PageInfo; results: T[] }> {
    let query: any = { where: {} };

    strategies.pagination.apply(page, query);
    strategies.filter.apply(filters, query);

    const { count, rows } = await model.findAndCountAll(query);

    const info: PageInfo = {
      count,
      pages: query.limit ? Math.ceil(count / query.limit) : null,
      prev: page > 1 ? page - 1 : null,
      next: query.limit && query.offset !== undefined && (query.offset + query.limit < count) ? page + 1 : null,
    };

    const results: T[] = rows.map((row: any) => row.toJSON() as T);

    return { info, results };
  }
}
