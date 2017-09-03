import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';


@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    termino:string = "";
    // artistas:any[] = [];

    constructor( private _spotifyService:SpotifyService ) {
     }

    ngOnInit() {console.log(this);}

    buscarArtista(){
		this._spotifyService.getToken().subscribe( token => {
            this._spotifyService.getArtistas( this.termino, String(token) ).subscribe( /*data => this.artistas = data*/);

        });
    }

}
