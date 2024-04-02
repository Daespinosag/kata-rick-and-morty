import { FilterMapper } from '../Types/FilterMapper';
import { default as Context} from '../../Context/ContextContract';
import { FilterDefinition, PageInfo } from '../../Shared/generics';
import { MeasureExecutionTime } from '../../Decorators/MeasureExecutionTime';
import { CacheDataSourceStrategy, DataFetcherService, LocalDataSourceStrategy, RemoteDataSourceStrategy } from '../../Actions/DataSorceWithMultipleRepositories';
import { CharacterSynchronizationHelper } from '../../Actions/CharacterDataSynchronization';

class CharactersResolver {
    constructor(private filterDefinitions: Record<string, FilterDefinition>) {}

    @MeasureExecutionTime("EXECUTION TIME :: Character Query Resolve")
    async resolve(
        _parent: any, 
        args: { page?: number; filter?: Record<string, string> }, 
        context: Context
    ): Promise<{ info: PageInfo, results: any }> {

        const sourceStrategyContext = {
            resource: 'characters',
            getter: { 
                cache: context.cache.repository.get.bind(context.cache.repository),
                local: context.repositories.character.get.bind(context.repositories.character),
                remote: context.remoteAPI.repository.getCharacters.bind(context.remoteAPI.repository)
            },
            count : {
                remote: context.remoteAPI.repository.countCharacters.bind(context.remoteAPI.repository)
            },
            data: {
                input_arguments: args,
                formatted_arguments: await FilterMapper.applyFiltersWithMapping(args, this.filterDefinitions),
                key: `characters:${args.page}:${JSON.stringify(args.filter)}`
            } 
        };

        const dataFetcherService = new DataFetcherService([
            new CacheDataSourceStrategy(), new LocalDataSourceStrategy(), new RemoteDataSourceStrategy()
        ]);

        const resultDataFetcher = await dataFetcherService.fetch(sourceStrategyContext);

        if (resultDataFetcher.require_delete_cache){
            await context.cache.repository.delByPattern('characters:*');
        }

        if (resultDataFetcher.require_sync_local_data){
            await new CharacterSynchronizationHelper().synchronizeMultipleCharacters(resultDataFetcher.response.results);
        }

        if (resultDataFetcher.require_save_cache){
            await context.cache.repository.set(
                `characters:${args.page}:${JSON.stringify(args.filter)}`, 
                JSON.stringify(resultDataFetcher.response)
            );
        }

        return resultDataFetcher.response;
    }
}
export { CharactersResolver }