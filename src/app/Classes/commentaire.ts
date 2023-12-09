import { Tache } from './tache';
import { User } from './user';

export interface Commentaire {
    idCommentaire: number;
    contenu: string;
    etat:string;
    task: Tache;
    employee: User;
}
