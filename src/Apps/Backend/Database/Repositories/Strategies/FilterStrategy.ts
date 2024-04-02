import { Op } from "sequelize";
import { Filter } from "../../../Shared/generics";

interface FilterStrategy {
    apply(filters: Filter | Filter[], query: any): void;
}

class StringFilterStrategy implements FilterStrategy {
    apply(filters: Filter | Filter[], query: any): void {
        if (!Array.isArray(filters)) {
            filters = [filters];
        }

        if (filters.length === 0) {
            return;
        }

        query.where = query.where || {};

        filters.forEach(filter => {
            switch (filter.type) {
                case 'filter_substring_no_sensitive':
                    query.where[filter.key] = { [Op.iLike]: `%${filter.value}%` };
                    break;
                case 'filter_string_exact':
                    query.where[filter.key] = filter.value;
                    break;
                default:
                    console.warn(`Filter type '${filter.type}' not supported.`);
            }
        });
    }
}

export { StringFilterStrategy, FilterStrategy };
