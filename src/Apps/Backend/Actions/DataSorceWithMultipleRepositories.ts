import { PageInfo } from "../Shared/generics";

export interface DataSourceContractStrategy {
    fetchData(sourceStrategyContext: any): Promise<{ info: PageInfo, results: any } | null>;
}

export class DataFetcherService {
    constructor(private strategies: DataSourceContractStrategy[]) {}

    async fetch(sourceStrategyContext: any): Promise<any> {
        for (const strategy of this.strategies) {
            const result = await strategy.fetchData(sourceStrategyContext);
            
            if (result) return result;
        }
        throw new Error("Data could not be fetched from any source.");
    }
}

/**
 * Cache return strategy
 * 
 * When the value of the key, pagination and filters is found on the cache server 
 * 
 */
export class CacheDataSourceStrategy implements DataSourceContractStrategy {
    async fetchData(sourceStrategyContext: any): Promise<any | null> {
        const cachedResult = await sourceStrategyContext.getter.cache(
            sourceStrategyContext.data.key
        );
        
        if (!cachedResult) return null; 
        
        return {
            require_save_cache      : false,
            requite_delete_cache    : false,
            require_sync_local_data : false,
            response                : JSON.parse(cachedResult)
        };
    }
}

/**
 * Local return strategy
 * 
 * When the amount of data is equal to or greater than 20, that means we have enough 
 * data locally to deliver one page of data
 * 
 * When the amount of data locally is equal to or greater than the amount of data remotely, 
 * that means we have enough data locally to deliver one page of data.
 */
export class LocalDataSourceStrategy implements DataSourceContractStrategy {
    async fetchData(sourceStrategyContext: any): Promise<any | null> {
        try {
            const data = await sourceStrategyContext.getter.local(
                sourceStrategyContext.data.formatted_arguments.page, 
                sourceStrategyContext.data.formatted_arguments.filter
            );

            if (data.results.length >= 20 ) {
                return {
                    require_save_cache      : true,
                    require_delete_cache    : false,
                    require_sync_local_data : false,
                    response                : data
                };
            }

            const countRemote = await sourceStrategyContext.count.remote(
                sourceStrategyContext.data.formatted_arguments.filter
            );

            if (data.info.count >= countRemote.info.count) {
                return {
                    require_save_cache      : true,
                    require_delete_cache    : false,
                    require_sync_local_data : false,
                    response                : data
                };
            }

            return null; 

        } catch (error) {
            console.error("Error fetching data from local source:", error);

            return null;
        }
    }
}

/**
 * Remote return strategy
 * 
 * When the local data is not enough to satisfy the user's needs,
 * the data from the remote system must be returned
 */
export class RemoteDataSourceStrategy implements DataSourceContractStrategy {
    async fetchData(sourceStrategyContext: any): Promise< any | null> {
        try {
            const data = await sourceStrategyContext.getter.remote(
                sourceStrategyContext.data.input_arguments.page, 
                sourceStrategyContext.data.input_arguments.filter
            );

            return {
                require_save_cache      : true,
                require_delete_cache    : true,
                require_sync_local_data : true,
                response                : data
            };

        } catch (error) {
            console.error("Error fetching data from remote source:", error);
            
            return null;
        }
    }
}
