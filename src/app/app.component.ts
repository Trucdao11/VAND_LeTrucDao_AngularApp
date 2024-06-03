import { Component, Inject } from '@angular/core';
import { PokemonService } from './services/pokemon.service';
import * as _ from "lodash";
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FilterStatsComponent } from './components/filter-stats/filter-stats.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'VAND_LeTrucDao';
  public listPokemons: any;
  public pokemon: any;
  public pokemonTypes: any;
  public pageSize = 100;
  public pageNumber = 0;
  public sort: any;
  public isSortedByNumber = false;
  public payloadRequest = `page[number]=${this.pageNumber}&page[size]=${this.pageSize}`;
  public filterTypeName = '';
  public paginationData: any;
  public paginationCountArr: any;
  

  constructor(private pokemonServices: PokemonService, private dialog: MatDialog, private dialogRef: MatDialogRef<PokemonDetailComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any){

  }
  
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getPokemonPagination();
    this.getPokemonTypes();
  }

  public getPokemonPagination(){
    this.pokemonServices.getPokemonList(this.payloadRequest).subscribe({
      next: data => {
        this.paginationData = data.meta;
        // this.paginationCountArr = Array(data.meta.last_page).fill(0).map((x, i) => i);
        this.paginationCountArr = Array(data.meta.last_page);
        console.log(this.pokemonTypes);
        
        this.listPokemons = data.data;
        _.each(this.listPokemons, pokemon => {
          if(pokemon.type_1){
            let typeName1: any;
            typeName1 = _.find(this.pokemonTypes, type => {
              return pokemon.type_1 == type.id
            });
            pokemon.type_name_1 = typeName1.name;
          }
          
          if(pokemon.type_2){
            let typeName2: any;
            typeName2 = _.find(this.pokemonTypes, type => {
              return pokemon.type_2 == type.id
            });
            pokemon.type_name_2 = typeName2.name;
          }        
          
        })
        console.log(this.listPokemons);
        
      },
      error: err => {

      }
    })
  }

  public getPokemonDetail(id: any){
    this.pokemonServices.getPokemonById(id).subscribe({
      next: data => {
        this.pokemon = data;
      },
      error: err => {

      }
    })
  }

  public getPokemonTypes(){
    this.pokemonServices.getPokemonTypes().subscribe({
      next: data => {
        this.pokemonTypes = data.data;
      },
      error: err => {

      }
    })
  }

  filterByPokemonType(type: any){
    this.filterTypeName = type.name;
    this.payloadRequest += `&filter[type]=${type.id}`;
    this.getPokemonPagination();
  }

  filterByPokemonNumber(){
    this.isSortedByNumber = !this.isSortedByNumber;
    this.isSortedByNumber ? this.sort = 'number' : this.sort = '';
    this.payloadRequest += `&sort=${this.sort}`;
    this.getPokemonPagination();
   
  }

  removeFilterType(){
    this.filterTypeName = '';
    this.payloadRequest = `page[number]=${this.pageNumber}&page[size]=${this.pageSize}`;
    this.getPokemonPagination();
  }

  pokemonDetail(id: any){
    this.dialog.open(PokemonDetailComponent, {
      panelClass: 'col-md-3',
      data:  {
        pokemonId: id,
      }
    })
  }

  filterStats(){
    const dialogRef = this.dialog.open(FilterStatsComponent, {
      panelClass: 'col-md-6',
      data:  {
        // pokemonId: id,
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      console.log('res', data);
      if(data){
        _.each(data, item =>{
          this.payloadRequest += `&filter[${item.key}]=${item.value}`
        })
        this.getPokemonPagination();
      }
      
      
    })
  }

  onChangePage(pageOfItems: Array<any>){
    console.log('pageOfItems', pageOfItems);
    // if
    this.pageNumber ++;
    console.log('this.pageNumber',  this.pageNumber);
    
    // this.getPokemonPagination()
  }

}
