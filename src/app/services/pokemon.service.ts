import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  getPokemonList(payload: any): Observable<any>{
    return this.http.get('https://api.vandvietnam.com/api/pokemon-api/pokemons?'+ payload);
  }

  getPokemonById(id: any): Observable<any>{
    return this.http.get('https://api.vandvietnam.com/api/pokemon-api/pokemons/'+ id);
  }

  getPokemonTypes(): Observable<any>{
    return this.http.get('https://api.vandvietnam.com/api/pokemon-api/types');
  }

  downLoadImg(id: any): Observable<any>{
    return this.http.get(`https://api.vandvietnam.com/api/pokemon-api/pokemons/${id}/sprite`, { responseType: 'blob' });
  }
}
