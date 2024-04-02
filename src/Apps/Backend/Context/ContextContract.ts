import { RemoteAPIRepository } from "../RemoteAPI/RemoteApiRepository";
import { CharacterRepository } from "../Database/Repositories/CharacterRepository";
import { CacheRepository } from "../Cache/CacheRepository";

interface RepositoriesContext {
    character: CharacterRepository;
}

interface RemoteAPI {
    repository: RemoteAPIRepository
}

interface Cache {
    repository: CacheRepository;
}

interface LoadersContext {
    /** TODO */
}

export default interface Context {
    remoteAPI       : RemoteAPI;
    repositories    : RepositoriesContext;
    cache           : Cache;
    loaders         : LoadersContext;
}