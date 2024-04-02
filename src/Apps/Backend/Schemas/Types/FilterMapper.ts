
import { Filter, FilterDefinition } from "../../Shared/generics";

class FilterMapper {
    static mapFilters(inputs: Record<string, string>, filterDefinitions: Record<string, FilterDefinition>): Filter[] {
        return Object.keys(inputs).map(key => {
            const value = inputs[key];
            const type = filterDefinitions[key]?.strategy;

            if (!type) {
                throw new Error(`Filter type for key '${key}' is not defined.`);
            }

            return { key, value, type };
        });
    }

    static  async applyFiltersWithMapping(args: { page?: number; filter?: Record<string, string> }, filterDefinitions: Record<string, FilterDefinition>) {
        const { page, filter = {} } = args;

        const filtersArray = FilterMapper.mapFilters(filter, filterDefinitions);

        return { page, filters: filtersArray };
    }
}

export { FilterMapper };