import { Commentaire } from './commentaire';
import { Project } from './project';
import {User} from "./user";

export class Tache {
    idTask: number;
    libelle: string;
    deadline: Date;
    description: string;
    duration: string;
    etat: string;
    project: Project;
    commentaires: Commentaire[];
    employee:User;
}
