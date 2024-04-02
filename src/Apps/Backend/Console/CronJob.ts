import cron from 'node-cron';

import { CharacterRepository } from '../Database/Repositories/CharacterRepository';
import { CharacterDTO, TRANSFORM_FROM_ARRAY_TO_DTO } from '../Shared/DataTransferObjects/Index';
import { RemoteAPIRepository } from '../RemoteAPI/RemoteApiRepository';
import { CharacterSynchronizationHelper } from '../Actions/CharacterDataSynchronization';
import { CacheRepository } from '../Cache/CacheRepository';

async function scheduledTask() {
    console.log('Running the scheduled task...', new Date().toLocaleString());

    const characters = await (new CharacterRepository).getUpdatedBeforeOneDay();

    if(characters.length = 0 ){
        return;
    }

    const ids: number[] = TRANSFORM_FROM_ARRAY_TO_DTO(CharacterDTO,  characters).map(character => character.id);
    const remoteCharacters = await (new RemoteAPIRepository).getCharactersByIds(ids);

    await new CharacterSynchronizationHelper().synchronizeMultipleCharacters(remoteCharacters);

    await (new CacheRepository).delByPattern('characters:*');
}

/**
 * Schedule the task to run at 00:00 and 12:00 every day
 */
cron.schedule('0 0,12 * * *', scheduledTask, {
    scheduled: true,
    timezone: "America/New_York"
});