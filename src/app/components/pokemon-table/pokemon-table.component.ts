import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';
import * as _ from 'lodash';
import { FilterStatsComponent } from '../filter-stats/filter-stats.component';

@Component({
  selector: 'app-pokemon-table',
  templateUrl: './pokemon-table.component.html',
  styleUrls: ['./pokemon-table.component.scss']
})
export class PokemonTableComponent implements OnInit {
  @Input() pokemonList : any ;
  public sortType: any;
  public sortOrders: string = 'asc';

  constructor(private dialog: MatDialog, private dialogRef: MatDialogRef<PokemonDetailComponent>) { }

  ngOnInit(): void {
    console.log('sortType', this.sortType);
    
  }

  pokemonDetail(id: any){
    this.dialog.open(PokemonDetailComponent, {
      panelClass: 'col-md-3',
      data:  {
        pokemonId: id,
      }
    })
  }

  sort(sortType: any){
    this.sortType = sortType
    if(this.sortOrders.includes('asc')){
      this.pokemonList = _.orderBy(this.pokemonList, [ sortType ], ['asc']);
      this.sortOrders = 'desc';
    } else if(this.sortOrders.includes('desc')){
      this.pokemonList = _.orderBy(this.pokemonList, [ sortType ], ['desc']);
      this.sortOrders = 'asc';
    }
  }

  getTypeColor(type: any){
    return 'type-'+ type;

  }


}
