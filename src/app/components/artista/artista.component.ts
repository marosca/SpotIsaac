import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
    selector: 'app-artista',
    templateUrl: './artista.component.html',
    styleUrls: ['./artista.component.css']
})
export class ArtistaComponent implements OnInit {

    cantante:any;
    tracks: any[];

    constructor( private _activatedRoute:ActivatedRoute,
        private _spotifyService:SpotifyService) { }

        ngOnInit() {
            this._activatedRoute.params
                .map(params => params['id'])
                .subscribe(id => {
                    this._spotifyService.getToken().subscribe( token => {
                        this._spotifyService.getArtista( id, String(token) )
                        .subscribe( data =>{
                            this.cantante = data;
                            }
                        );
                    });

                    this._spotifyService.getToken().subscribe( token => {
                        this._spotifyService.getTopTracks( id, String(token) )
                        .subscribe( data =>{
                            this.tracks = data;
                            }
                        );
                    });
                })
        }


}
