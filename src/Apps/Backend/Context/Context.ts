import { CacheRepository } from '../Cache/CacheRepository';
import { default as ContextContract} from './ContextContract';
import { RemoteAPIRepository } from '../RemoteAPI/RemoteApiRepository';
import { CharacterRepository } from '../Database/Repositories/CharacterRepository';

const context: ContextContract = {
    remoteAPI : {
        repository: new RemoteAPIRepository(),
    },
    repositories: {
        character: new CharacterRepository(),
    },
    cache: {
        repository: new CacheRepository(),
    },
    loaders: {
        /** TODO */
    }
};

export default context;