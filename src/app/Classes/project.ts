import { Market } from './market';
import { Tache } from './tache';
import {User} from "./user";

export class Project {
    idProject: number;
    nom: string;
    description: string;
    dateDebut: Date;
    dateFin: Date;
    budget: number;
    statusProject: string;
    market: Market;
    tasks: Array<Tache>;
    fileName: string;
    employees:User[];
    directeur:User;
    chefService:User;
    marketName: string;
}

