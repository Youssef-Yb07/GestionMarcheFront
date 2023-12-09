import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../../Services/Project/project.service";
import {Project} from "../../../Classes/project";
import {TacheService} from "../../../Services/Tache/tache.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-mes-projets',
  templateUrl: './mes-projets.component.html',
  styleUrls: ['./mes-projets.component.scss']
})
export class MesProjetsComponent implements OnInit{


  idEmployee!:number;
  projects: Project[] = [];
  constructor(private projetService:ProjectService,private router:Router) {}

  ngOnInit(): void {
    this.idEmployee=Number(sessionStorage.getItem("idUser"));
    this.getProjects();
  }

  getProjects(){
    this.projetService.getAllProjectsByEmployee(this.idEmployee).subscribe(
      (response)=>{
        console.log(response);
        this.projects=response;
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  downloadFile(idProject: number, libelle: string) {
    this.projetService.downloadCDC(idProject).subscribe(
      (response: any) => {
        const contentDispositionHeader = response.headers.get('content-disposition');
        console.log("contentDispositionHeader: " + contentDispositionHeader);

        let fileName = libelle || 'cahier de charge.txt'; // Use libelle if available, or a default filename

        if (contentDispositionHeader) {
          const fileNameMatch = contentDispositionHeader.match(/filename=["']?([^'"\s]+)["']?/);
          fileName = fileNameMatch ? fileNameMatch[1] : fileName;
        }

        const contentType = response.headers.get('content-type');
        const blob = new Blob([response.body], { type: contentType });

        const downloadLink = document.createElement('a');
        const url = URL.createObjectURL(blob);

        downloadLink.href = url;
        downloadLink.download = fileName;

        document.body.appendChild(downloadLink);
        downloadLink.click();

        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(url);
      },
      (error: any) => console.error('Error downloading the file:', error),
    );
  }

  private readonly daysThreshold = 30;

  isDateCloseToCurrent(date: string): boolean {
    const dateParts = date.split('/'); // Assuming the date is in the format "DD/MM/YYYY"
    if (dateParts.length === 3) {
      const [day, month, year] = dateParts;
      const dateFin = new Date(`${month}/${day}/${year}`);
      const currentDate = new Date();

      // Check if the date is in the future
      if (dateFin.getTime() > currentDate.getTime()) {
        // Calculate the difference in milliseconds between the current date and the "Date Fin"
        const differenceInMs = dateFin.getTime() - currentDate.getTime();
        const differenceInDays = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));

        // Return true if the difference is within the threshold, otherwise false
        return Math.abs(differenceInDays) <= this.daysThreshold;
      }
    }

    return false; // Return false if the date is in the past or the date format is invalid
  }


  sortProjectsByDateFin() {
    return this.projects.slice().sort((a, b) => {
      const dateA = new Date(a.dateFin).getTime();
      const dateB = new Date(b.dateFin).getTime();
      return dateA - dateB;
    });
  }

  redirectToTaches(idProject:number){
    sessionStorage.setItem("idProject",String(idProject));
    this.router.navigate(["/mes/taches"]);
  }


}
