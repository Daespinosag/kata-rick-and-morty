import fs from 'fs';
import Place from '../Models/place';
import Episode from '../Models/episode';
import Character from '../Models/character';
import CharacterEpisode from '../Models/character_episode';

interface CharacterInterface {
    id: string;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    image: string;
    origin: DataPlacesInterface;
    location: DataPlacesInterface;
    episode: DataEpisodeInterface[];
    created: string;
}

interface DataEpisodeInterface {
    id: string;
    name: string;
    air_date: string;
    episode: string;
    created: string;
}

interface DataPlacesInterface {
    id: string;
    name: string;
    dimension: string;
    type: string;
    created: string;
}

interface DataSeederLoader {
    characters: CharacterInterface[];
}

interface JsonDataSeederLoader {
    data: DataSeederLoader;
}

class CharacterSeederLoader {
    private filePath: string;

    constructor(filePath: string) {
        this.filePath = filePath;
    }

    public loadCharacters(): CharacterInterface[] {
        const rawData = fs.readFileSync(this.filePath);
        const jsonData: JsonDataSeederLoader = JSON.parse(rawData.toString());
        return jsonData.data.characters;
    }

    public async insertOrUpdateCharacters(): Promise<void> {
        const characters = this.loadCharacters();
        for (const character of characters) {
            await this.insertOrUpdateCharacter(character);
        }        
    }

    private async insertOrUpdateCharacter(character: CharacterInterface): Promise<void> {
        if(character.origin.id){
            await this.loadPlace(character.origin);
        }

        if(character.location.id){
            await this.loadPlace(character.location);
        }

        let loadedCharacter = await this.loadCharacter(character);
        let loadedEpisodes  = await this.loadEpisodes(character.episode);
        
        await this.loadCharacterEpisodes(loadedEpisodes, loadedCharacter);
    }

    private async loadCharacter(data: CharacterInterface): Promise<number> {
        const [_character, _created] = await Character.findCreateFind({
            where: { id: parseInt(data.id) },
            defaults: {
                id: parseInt(data.id),
                location_id: data.location.id ? parseInt(data.location.id) : null,
                origin_id: data.origin.id ? parseInt(data.origin.id) : null,
                name: data.name,
                status: data.status,
                species: data.species,
                type: data.type,
                gender: data.gender,
                image: data.image,
                created: new Date(data.created),
                updated: new Date()
            }
        });
        
        return parseInt(data.id);
    }
    
    
    private async loadPlace(data: DataPlacesInterface): Promise<Place> {
        const [place, _created] = await Place.findCreateFind({
            where: { id: parseInt(data.id) },
            defaults: {
                id: parseInt(data.id),
                name: data.name,
                dimension: data.dimension,
                type: data.type,
                created: new Date(data.created),
                updated: new Date()
            }
        });
        
        return place;
    }
    

    private async loadEpisodes(episodes: DataEpisodeInterface[]): Promise<number[]> {
        const createdEpisodes: number[] = [];
        
        for (const episode of episodes) {
            const id = parseInt(episode.id)

            const [_newEpisode, _created] = await Episode.findCreateFind({
                where: { id: id },
                defaults: {
                    id: id,
                    name: episode.name,
                    air_date: episode.air_date,
                    episode: episode.episode,
                    created: new Date(episode.created),
                    updated: new Date()
                }
            });
    
            const isEpisodeAlreadyAdded = createdEpisodes.some(e => e === id);
            
            if (!isEpisodeAlreadyAdded) {
                createdEpisodes.push(id);
            }
        }
        
        return createdEpisodes;
    }
    

    private async loadCharacterEpisodes(episodes: number[], character: number): Promise<void> {    
        for (const episode of episodes) {
            const [_pivot, _created] = await CharacterEpisode.findOrCreate({
                where: { character_id: character, episode_id: episode},
                defaults: {
                    character_id    : character,
                    episode_id      : episode,
                }
            });
        }
    }
}

export default CharacterSeederLoader;
