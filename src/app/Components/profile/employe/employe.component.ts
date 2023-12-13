  import {Component, ElementRef, ViewChild} from '@angular/core';
  import {ProjectService} from "../../../Services/Project/project.service";
  import {Project} from "../../../Classes/project";
  import Chart from "chart.js/auto";
  import {right} from "@popperjs/core";

  @Component({
    selector: 'app-employe',
    templateUrl: './employe.component.html',
    styleUrls: ['./employe.component.scss']
  })
  export class EmployeComponent {

    idEmployee:number;
    projets:Project[]=[];
    chartType: 'bar' | 'doughnut' | 'pie' = 'doughnut';
    constructor(private projetservice:ProjectService) { }

    ngOnInit(): void {
      this.idEmployee=Number(sessionStorage.getItem('idUser'));
      this.getAllProjectsByEmployee();
      this.getProjectCountByTaskEmployee(this.idEmployee);
    }

    getAllProjectsByEmployee(){
      this.projetservice.getAllProjectsByEmployee(this.idEmployee).subscribe((data) => {
        console.log("Mes Projets ==>",data);
        this.projets=data;
      },
        (error)=>{
          console.log(error);
        }
        );
    }
    /*=============================================================================================*/

    ProjectCountByTaskEmployee!:Map<string,number>;

    chartProjectCountByTaskEmployee!:Chart;
    getProjectCountByTaskEmployee(idEmployee:number){
      this.projetservice.getProjectCountByTaskEmployee(idEmployee).subscribe(
        (data)=>{
          this.ProjectCountByTaskEmployee=data;
          console.log(this.ProjectCountByTaskEmployee);
          this.createChartProjectCountByTaskEmployee(this.ProjectCountByTaskEmployee);
        },
        (error)=>{
          console.log(error);
        }
      )
    }

    @ViewChild('ProjectCountByTaskEmployee')ProjectCountByTaskEmployeeChartCanvas!: ElementRef;
    createChartProjectCountByTaskEmployee(data: Map<string, number>): void {

      const labels = Object.keys(data);
      console.log("LabelsProject", labels);
      const values = Object.values(data);
      console.log("ValuesProject", values);

      if (this.chartProjectCountByTaskEmployee) {
        this.chartProjectCountByTaskEmployee.destroy();
      }

      const ctx = this.ProjectCountByTaskEmployeeChartCanvas.nativeElement.getContext('2d');

      if (ctx) {
        this.chartProjectCountByTaskEmployee = new Chart(ctx, {
          type: this.chartType as any,
          data: {
            labels: labels,
            datasets: [
              {
                data: values,
                backgroundColor: [
                  'rgba(73,117,22,0.6)',
                  'rgba(0,0,0,0.6)',
                  'rgb(61,18,105)',
                  'rgb(183,210,241)',
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
                display:false
              },
            },
          },
        });
        console.log('Chart created successfully');
      } else {
        console.error('Canvas context is null. Canvas may not be rendered yet.');
      }
    }

    changeChartType(type: 'bar' | 'doughnut' | 'pie'): void {
      this.chartType = type;
      // Re-create the chart with the new chart type
      this.createChartProjectCountByTaskEmployee(this.ProjectCountByTaskEmployee);
    }
  }
