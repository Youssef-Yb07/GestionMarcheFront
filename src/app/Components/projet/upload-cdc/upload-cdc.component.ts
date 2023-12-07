import {Component, OnInit} from '@angular/core';
import {Project} from "../../../Classes/project";
import {ProjectService} from "../../../Services/Project/project.service";

@Component({
  selector: 'app-upload-cdc',
  templateUrl: './upload-cdc.component.html',
  styleUrls: ['./upload-cdc.component.scss']
})
export class UploadCDCComponent implements OnInit{

  Projects:Project[] = [];

  selectedProject!:number;

  selectedFile!: File;
  ngOnInit() {
    this.getProjects();
  }
  constructor(private projetService:ProjectService) {}

  getProjects(){
    this.projetService.getAllProjects().subscribe(
      (data:Project[])=>{
      this.Projects = data;
    },
    (err)=>{
      console.log(err);
    }
    );
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile(){
    this.projetService.uploadCdc(this.selectedProject,this.selectedFile).subscribe(
      (data)=>{
        console.log(data);
      },
      (err)=>{
        console.log(err);
      }
    );
  }

}
