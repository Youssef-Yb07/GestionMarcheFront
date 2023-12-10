import {Project} from "./project";

export class TaskDTO {

fi  idTask!: number;

  libelle!: string;

  deadline!: Date;

  description!: string;

  duration!: string;

  etat!: String;

  project!:Project;
}
