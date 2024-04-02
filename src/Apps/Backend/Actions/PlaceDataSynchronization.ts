import { plainToInstance } from 'class-transformer';
import { PlaceRepository } from '../Database/Repositories/PlaceRepository';
import { PlaceDTO } from '../Shared/DataTransferObjects/Index';

class PlaceDataSynchronizationAction {
    constructor(private placeRepository: PlaceRepository) {}

    private async synchronizePlace(dto: PlaceDTO): Promise<void> {
        await this.placeRepository.createOrUpdate(dto.id, dto);
    }

    public async synchronizePlaces(places: PlaceDTO[]): Promise<void> {
        const placeDTOs = plainToInstance(PlaceDTO, places, { enableImplicitConversion: true });
        for (const dto of placeDTOs) {
            await this.synchronizePlace(dto);
        }
    }
}

class SinglePlaceSynchronizationAction {
    constructor(private syncAction: PlaceDataSynchronizationAction) {}

    public async synchronize(place: any): Promise<void> {
        await this.syncAction.synchronizePlaces([place]);
    }
}

class MultiplePlacesSynchronizationAction {
    constructor(private syncAction: PlaceDataSynchronizationAction) {}

    public async synchronize(places: any[]): Promise<void> {
        await this.syncAction.synchronizePlaces(places);
    }
}

class PlaceSynchronizationHelper {
    private placeRepository: PlaceRepository;
    private placeSyncAction: PlaceDataSynchronizationAction;
    private singleSyncAction: SinglePlaceSynchronizationAction;
    private multipleSyncAction: MultiplePlacesSynchronizationAction;

    constructor() {
        this.placeRepository    = new PlaceRepository();
        this.placeSyncAction    = new PlaceDataSynchronizationAction(this.placeRepository);
        this.singleSyncAction   = new SinglePlaceSynchronizationAction(this.placeSyncAction);
        this.multipleSyncAction = new MultiplePlacesSynchronizationAction(this.placeSyncAction);
    }

    public async synchronizeSinglePlace(place: any): Promise<void> {
        await this.singleSyncAction.synchronize(place);
    }

    public async synchronizeMultiplePlaces(places: any[]): Promise<void> {
        await this.multipleSyncAction.synchronize(places);
    }
}

export { 
    PlaceDataSynchronizationAction, 
    SinglePlaceSynchronizationAction, 
    MultiplePlacesSynchronizationAction,
    PlaceSynchronizationHelper
};
