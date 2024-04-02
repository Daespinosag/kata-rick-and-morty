import { plainToInstance } from 'class-transformer';
import { CharacterDTO } from '../Shared/DataTransferObjects/Index';
import { CharacterRepository } from '../Database/Repositories/CharacterRepository';
import { PlaceSynchronizationHelper } from './PlaceDataSynchronization';

class CharacterDataSynchronizationAction {
    constructor(private characterRepository: CharacterRepository) {}

    private async synchronizeCharacter(dto: CharacterDTO): Promise<void> {
        if(dto.location?.id){
            await (new PlaceSynchronizationHelper()).synchronizeSinglePlace(dto.location);
        }

        if(dto.origin?.id){
            await (new PlaceSynchronizationHelper()).synchronizeSinglePlace(dto.origin);
        }

        await this.characterRepository.createOrUpdate(dto.id, dto);
    }

    public async synchronizeCharacters(characters: CharacterDTO[]): Promise<void> {
        const characterDTOs = plainToInstance(CharacterDTO, characters, { enableImplicitConversion: true });
        for (const dto of characterDTOs) {
            await this.synchronizeCharacter(dto);
        }
    }
}

class SingleCharacterSynchronizationAction {
    constructor(private syncAction: CharacterDataSynchronizationAction) {}

    public async synchronize(character: any): Promise<void> {
        await this.syncAction.synchronizeCharacters([character]);
    }
}

class MultipleCharactersSynchronizationAction {
    constructor(private syncAction: CharacterDataSynchronizationAction) {}

    public async synchronize(characters: any[]): Promise<void> {
        await this.syncAction.synchronizeCharacters(characters);
    }
}


class CharacterSynchronizationHelper {
    private characterRepository: CharacterRepository;
    private characterSyncAction: CharacterDataSynchronizationAction;
    private singleSyncAction: SingleCharacterSynchronizationAction;
    private multipleSyncAction: MultipleCharactersSynchronizationAction;

    constructor() {
        this.characterRepository = new CharacterRepository();
        this.characterSyncAction = new CharacterDataSynchronizationAction(this.characterRepository);
        this.singleSyncAction = new SingleCharacterSynchronizationAction(this.characterSyncAction);
        this.multipleSyncAction = new MultipleCharactersSynchronizationAction(this.characterSyncAction);
    }

    public async synchronizeSingleCharacter(character: any): Promise<void> {
        await this.singleSyncAction.synchronize(character);
    }

    public async synchronizeMultipleCharacters(characters: any[]): Promise<void> {
        await this.multipleSyncAction.synchronize(characters);
    }
}


export { 
    CharacterDataSynchronizationAction, 
    SingleCharacterSynchronizationAction, 
    MultipleCharactersSynchronizationAction,
    CharacterSynchronizationHelper
}
