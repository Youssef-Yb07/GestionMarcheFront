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

  ngOnInit() {
    this.idUser= Number(sessionStorage.getItem('idUser'));
    this.getProjectByUser();
    this.CountTachesParStatut();
    this.getProjectCountByStatus();
    this.getProjectCountByEmployee();

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

  /*---------------------------------------------------------------------------------------------------*/

  chartTaskState!: Chart;
  countTaskState!: Map<string, number>;

  CountTachesParStatut() {
    this.tacheService.getTasksCountByStatus().subscribe(
      (data: Map<string, number>) => {
        this.countTaskState = data;
        console.log(this.countTaskState);
        this.createChartTacheParStatut(this.countTaskState);

      },
      (error) => {
        console.error('Error fetching ratios:', error);
      }
    );
  }


  @ViewChild('TacheParStatut')TacheParStatutChartCanvas!: ElementRef;
  createChartTacheParStatut(data: Map<string, number>): void {

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
                'rgb(250,0,0)',
                'rgb(31,47,107)',
                'rgb(61,18,105)',
                'rgba(73,117,22,0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgb(203,52,87)',
              ],
              borderColor: 'rgb(255,255,255)',
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
            },
          },
        },
      });
      console.log('Chart created successfully');
    } else {
      console.error('Canvas context is null. Canvas may not be rendered yet.');
    }
  }


   /*---------------------------------------------------------------------------------------------------*/


  countProjectState!:Map<string,number>;

  chartProjectState!:Chart;
  getProjectCountByStatus(){
    this.projetService.getProjectCountByStatus().subscribe(
      (data: Map<string, number>) => {
        this.countProjectState = data;
        console.log(this.countProjectState);
        this.createChartProjetParStatut(this.countProjectState);

      },
      (error) => {
        console.error('Error fetching ratios:', error);
      }
    );
  }

  @ViewChild('ProjetParStatut')ProjetParStatutChartCanvas!: ElementRef;
  createChartProjetParStatut(data: Map<string, number>): void {

      const labels = Object.keys(data);
      console.log("LabelsProject", labels);
      const values = Object.values(data);
      console.log("ValuesProject", values);

      const ctx = this.ProjetParStatutChartCanvas.nativeElement.getContext('2d');

      if (ctx) {
        this.chartProjectState = new Chart(ctx, {
          type: 'doughnut' as any,
          data: {
            labels: labels,
            datasets: [
              {
                data: values,
                backgroundColor: [
                  'rgb(250,0,0)',
                  'rgb(31,47,107)',
                  'rgb(61,18,105)',
                  'rgba(73,117,22,0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgb(203,52,87)',
                ],
                borderColor: 'rgb(255,255,255)',
                borderWidth: 2,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom',
              },
            },
          },
        });
        console.log('Chart created successfully');
      } else {
        console.error('Canvas context is null. Canvas may not be rendered yet.');
      }
  }

  /*---------------------------------------------------------------------------------------------------*/

  chartProjectEmployee!: Chart;
  countProjectEmployee!: Map<string, number>;
  getProjectCountByEmployee(){
    this.projetService.getProjectCountByEmployee().subscribe(
      (data: Map<string, number>) => {
        this.countProjectEmployee = data;
        console.log(this.countProjectEmployee);
        this.createChartEmployeesByProjet(this.countProjectEmployee);

      },
      (error) => {
        console.error('Error fetching ratios:', error);
      }
    );
  }


  @ViewChild('EmployeesByProject')EmployeParProjetChartCanvas!: ElementRef;
  createChartEmployeesByProjet(data: Map<string, number>): void {

      const labels = Object.keys(data);
      console.log("LabelsProject", labels);
      const values = Object.values(data);
      console.log("ValuesProject", values);

      const ctx = this.EmployeParProjetChartCanvas.nativeElement.getContext('2d');

      if (ctx) {
        this.chartProjectEmployee = new Chart(ctx, {
          type: 'bar' as any,
          data: {
            labels: labels,
            datasets: [
              {
                data: values,
                backgroundColor: [
                  'rgb(250,0,0)',
                  'rgb(31,47,107)',
                  'rgb(61,18,105)',
                  'rgba(73,117,22,0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgb(203,52,87)',
                ],
                borderColor: 'rgb(255,255,255)',
                borderWidth: 2,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              x: {
                grid: {
                  display: false
                }
              },
              y: {
                beginAtZero: true,
                grid: {
                  color: 'rgb(255,255,255)',
                  lineWidth: 1
                },
                ticks: {
                  stepSize: 1
                }
              }
            },
            plugins: {
              legend: {
                display: false
              },
            },
          }
        });
        console.log('Chart created successfully');
      } else {
        console.error('Canvas context is null. Canvas may not be rendered yet.');
      }
  }


}


