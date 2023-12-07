import {Component, OnInit} from '@angular/core';
import {Project} from "../../../Classes/project";
import {Tache} from "../../../Classes/tache";
import {ProjectService} from "../../../Services/Project/project.service";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.scss']
})
export class ListProjectsComponent implements OnInit{

  projects: Project[] = [];

  marketNames: (string | undefined)[] = this.projects.map((project) => project.market?.nom);

  //SEARCH
  filteredData: Project[];
  searchTerm: string = '';

  //PAGINATION
  pageIndex = 1;
  totalItems = 0;
  //PAGINATION - items per page
  pageSize= 5;

  constructor(private projectService:ProjectService) {
  }
  ngOnInit(): void {
    this.getAllProjects();
    this.getPaginatedProjects();
  }

  onSearch(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    console.log('Search term:', searchTerm);
    this.filteredData = [];
    this.searchTerm = searchTerm;
    if(searchTerm){
      for (const project of this.getPaginatedProjects()) {
        if (
          project.nom.toLowerCase().includes(searchTerm) ||
          project.budget.toString() === (searchTerm) ||
          project.statusProject.toLowerCase().includes(searchTerm)||
          project.dateDebut.toDateString() === (searchTerm) ||
          project.dateFin.toDateString() === (searchTerm)||
          project.market.nom?.includes(searchTerm)||
          project.tasks.map((task)=>task.libelle.toLowerCase().includes(searchTerm))||
          project.description.toLowerCase().includes(searchTerm)||
          project.fileName.toLowerCase().includes(searchTerm)
        ) {
          this.filteredData.push(project);
          console.log('Project:', project, 'Matching: true');
        }else{
          this.filteredData = [];
        }}
    }else{
      this.getAllProjects();
    }
    console.log('Filtered Data:', this.filteredData);
  }

  getDisplayedData() {
    return this.searchTerm ? this.filteredData : this.getPaginatedProjects();
  }

  ////PAGINATION LOGIC
  onItemsPerPageChange() {
    this.pageIndex = 1;
    this.totalItems = this.getPaginatedProjects().length;
    if (this.pageIndex > this.getTotalPages()) {
      this.pageIndex = this.getTotalPages();
    }
    this.getPaginatedProjects();
  }

  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }
  onPageChange(page: number) {
    this.pageIndex = page;
  }
  paginatedProjects : any=[];
  getPaginatedProjects(): Project[] {
    const startIndex = (this.pageIndex - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedProjects = this.projects.slice(startIndex, endIndex);
    return this.paginatedProjects;
  }


  private getAllProjects() {
    this.projectService.getAllProjects().subscribe( data =>{
    this.projects = data;
      console.log(this.projects);
    },
      error => console.error(error));
  return this.projects;
  }

  downloadFile(idProject: number, libelle: string) {
    this.projectService.downloadCDC(idProject).subscribe(
      (response: any) => {
        const contentDispositionHeader = response.headers.get('content-disposition');
        console.log("contentDispositionHeader: " + contentDispositionHeader);

        let fileName = libelle || 'cahier de charge.txt'; // Use libelle if available, or a default filename

        if (contentDispositionHeader) {
          const fileNameMatch = contentDispositionHeader.match(/filename=["']?([^'"\s]+)["']?/);
          fileName = fileNameMatch ? fileNameMatch[1] : fileName;
        }

        const contentType = 'text/plain'; // Adjust based on the actual content type of the file
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


  deleteProject(idProject: number) {
    this.projectService.deleteProjectByID(idProject).subscribe(data => {
      console.log(data);
      this.getDisplayedData();
    }, error => console.log(error));
  }

  deleteProjectConfirmationDialog(id: number): void {
    Swal.fire({
      title: 'Voulez vous vraiment supprimer cet enregistrement ?',
      icon: 'question',
      iconHtml: '?',
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteProject(id);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: "Projet supprimé avec succès",
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
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
}
