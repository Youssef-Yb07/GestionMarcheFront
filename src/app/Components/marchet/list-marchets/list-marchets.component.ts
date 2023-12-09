import {Component, OnInit} from '@angular/core';
import {Market} from "../../../Classes/market";
import {MarcheService} from "../../../Services/Marche/marche.service";

@Component({
  selector: 'app-list-marchets',
  templateUrl: './list-marchets.component.html',
  styleUrls: ['./list-marchets.component.scss']
})
export class ListMarchetsComponent implements OnInit{

  Markets:Market[] = [];
  constructor(private marcheService:MarcheService) { }

  ngOnInit() {
    this.getMarkets();
  }

  getMarkets(){
    this.marcheService.getMarches().subscribe(
      (data)=>{
        this.Markets=data;
        console.log(data);
      },
      (error)=>{
        console.log(error);
      }
    );
  }

}
