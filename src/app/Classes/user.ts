
import { Commentaire } from './commentaire';
import { Role } from './role';
import { Service } from './service';

export class User {
    idUser: number;
    nom: string;
    prenom: string;
    email: string;
    password: string;
    role: Role;
    service: Service;
    commentaire: Commentaire;
}
