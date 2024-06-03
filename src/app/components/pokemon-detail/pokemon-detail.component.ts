import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PokemonService } from 'src/app/services/pokemon.service';
import * as _ from 'lodash';
import { zip } from 'rxjs';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  public pokemonId: any;
  public pokemonProfile: any;
  constructor( private pokemonServices: PokemonService,
    @Inject(MAT_DIALOG_DATA) private data: any,) { 
      this.pokemonId = data.pokemonId;
    }

  ngOnInit(): void {
    this.getPokemonDetail()
  }

  getPokemonDetail(){
    zip(this.pokemonServices.getPokemonById(this.pokemonId), this.pokemonServices.downLoadImg(this.pokemonId)).subscribe(([profile, img]) => {
      this.pokemonProfile = profile.data;
      console.log('img', img);
      console.log('this.pokemonProfile',this.pokemonProfile);
      this.createImageFromBlob(img);
      
    })
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.pokemonProfile.img = reader.result;
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
 }

}
