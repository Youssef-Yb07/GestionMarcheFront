import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Project} from "../../../Classes/project";
import {ProjectService} from "../../../Services/Project/project.service";
import {TacheService} from "../../../Services/Tache/tache.service";
import Chart from 'chart.js/auto'

@Component({
  selector: 'app-directeur',
  templateUrl: './directeur.component.html',
  styleUrls: ['./directeur.component.css']
})
export class DirecteurComponent implements OnInit{

  idUser:number;
  projet!:Project;
  countTaskState: Map<string, number> = new Map<string, number>();
  chartTaskState!: Chart;


  ngOnInit() {
    this.idUser= Number(sessionStorage.getItem('idUser'));
    this.getProjectByUser();
    this.CountTachesParStatut();

  }

  constructor(private projetService:ProjectService,private tacheService: TacheService) {}
  getProjectByUser(){
    this.projetService.getProjectsByDirecteurOrChiefService(this.idUser).subscribe(
      (data) => {
        this.projet = data;
        console.log(this.projet);
        if (this.projet) {
          sessionStorage.setItem('idProject', String(this.projet.idProject));
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  CountTachesParStatut() {
    this.tacheService.getTasksCountByStatus().subscribe(
      (data: Map<string, number>) => {
        this.countTaskState = data;
        console.log(this.countTaskState);
        this.createChart(this.countTaskState);

      },
      (error) => {
        console.error('Error fetching ratios:', error);
      }
    );
  }


  @ViewChild('TacheParStatut')TacheParStatutChartCanvas!: ElementRef;
  createChart(data: Map<string, number>): void {

    const labels = Object.keys(data);
    console.log("Labels", labels);
    const values = Object.values(data);
    console.log("Values", values);

    const ctx = this.TacheParStatutChartCanvas.nativeElement.getContext('2d');

    if (ctx) {
      console.log('Creating chart');
      this.chartTaskState = new Chart(ctx, {
        type: 'pie' as any,
        data: {
          labels: labels,
          datasets: [
            {
              data: values,
              backgroundColor: [
                'rgb(241,61,61)',
                'rgb(31,47,107)',
                'rgb(170,147,255)',
                'rgba(124,227,0,0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgb(203,52,87)',
              ],
              borderColor: 'rgb(255,255,255)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
            },
            title: {
              display: false,
              text: "Pourcentage Par Etat de tache",
            },
          },
        },
      });
      console.log('Chart created successfully');
    } else {
      console.error('Canvas context is null. Canvas may not be rendered yet.');
    }
  }

}


