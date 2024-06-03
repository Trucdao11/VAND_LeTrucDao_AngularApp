import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as _ from 'lodash';

@Component({
  selector: 'app-filter-stats',
  templateUrl: './filter-stats.component.html',
  styleUrls: ['./filter-stats.component.scss']
})
export class FilterStatsComponent implements OnInit {
  public filterList = [
    {'id' : 0, 'name': 'Min total', 'key': 'min_total', 'value': 0 },
    {'id' : 1, 'name': 'Max total', 'key': 'max_total', 'value': 0 },
    {'id' : 0, 'name': 'Min speed', 'key': 'min_speed', 'value': 0 },
    {'id' : 0, 'name': 'Max speed', 'key': 'max_speed', 'value': 0 },
    {'id' : 0, 'name': 'Min Sp Def', 'key': 'min_sp_def', 'value': 0 },
    {'id' : 0, 'name': 'Max Sp Def', 'key': 'max_sp_def', 'value': 0 },
    {'id' : 0, 'name': 'Min Sp Atk', 'key': 'min_sp_atk', 'value': 0 },
    {'id' : 0, 'name': 'Max Sp Atk', 'key': 'max_sp_atk', 'value': 0 },
    {'id' : 0, 'name': 'Min Hp', 'key': 'min_hp', 'value': 0 },
    {'id' : 0, 'name': 'Max Hp', 'key': 'max_hp', 'value': 0 },
    {'id' : 0, 'name': 'Min Defense', 'key': 'min_defense', 'value': 0 },
    {'id' : 0, 'name': 'Max Defense', 'key': 'max_defense', 'value': 0 },
    {'id' : 0, 'name': 'Min Attack', 'key': 'min_attack', 'value': 0 },
    {'id' : 0, 'name': 'Max Attack', 'key': 'max_attack', 'value': 0 },
  ]
  public filterSelected: any = [];
  constructor(private dialog: MatDialog, private dialogRef: MatDialogRef<FilterStatsComponent>,) { }

  ngOnInit(): void {
  }

  chooseFilter(event: any, value: any){
    if(event.target.checked){
      this.filterSelected.push(value);
    } else{
      this.filterSelected = _.filter(this.filterSelected, a => { return a != value})
    }
  }

  close(){
    this.dialogRef.close(this.filterSelected);
  }

}
