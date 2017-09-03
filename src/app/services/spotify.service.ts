import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SpotifyService {
    artistas:any [] = [];
    artista:any [] = [];

    urlBusqueda = 'https://api.spotify.com/v1/search';
    urlArtista = 'https://api.spotify.com/v1/artists';


    constructor( private http:Http ) { }

    getTokenFromSpotify(){

		let url = 'https://spotifygeneratetoken.herokuapp.com/get_token';
        let client_id = '9027c81b4bf0438d904415937a6757ee';
        let client_secret = 'c7a7d99ce2da4a7aa0b7b7e70f602e16';
        let grant_type = 'client_credentials';

        let headers = new Headers();
		headers.append('Content-Type', 'application/json');

        let data = JSON.stringify ({
            client_id: client_id,
            client_secret: client_secret,
            grant_type: grant_type

        });

        return this.http.post(url, data, { headers })
            .map(res => {
                let token =
                    JSON.stringify({
                        token: 'Bearer ' + res["_body"],
                        time: new Date()
                    });
                if (window.localStorage)
                    localStorage['spotifyToken'] = token;

                return 'Bearer ' + res["_body"];
            });
    };

    isTokenExpired(){
        let last = new Date( JSON.parse( localStorage.spotifyToken ).time );
        let now = new Date();
        let diff = ( Number(now) - Number(last) ) / (1000);
        return (diff >= 3600);
    }

    getToken(){
        if (localStorage.spotifyToken && !this.isTokenExpired() ){
            let localTokenObj = JSON.parse( localStorage.spotifyToken );

            let localToken = new Observable( observer => {
                observer.next( localTokenObj.token );
                observer.complete();
            });
            console.log('TOKEN EXTRAIDO DE LOCALSTORAGE');
            return localToken;

        } else {
            console.log('TOKEN de Spotify');
            return this.getTokenFromSpotify();
        }
    }

    getArtistas( termino:string, token?:string ){
        if(termino.length == 0) termino = " ";

        let headers = new Headers();
        headers.append( 'Authorization', token);

        let query = `?q=${ termino }&type=artist`;
        let url = this.urlBusqueda + query ;


        return this.http.get( url, { headers })
            .map( res => {
                this.artistas = res.json().artists.items;
                //return this.artistas;
            }
                //console.log( JSON.parse(res['_body']) ); //esto hace lo mismo que res.json(), json() es una función que traen los response pasados por un map y consiste en hacer un parse de lo que se envía en el body como respuesta
        );


    };

    getArtista(id:string, token:string){
        let headers = new Headers();
        headers.append( 'Authorization', token);

        let url = this.urlArtista + '/' + id ;

        return this.http.get( url , { headers })
            .map( res => {
                this.artista = res.json();
                return this.artista;
            });
    }

    getTopTracks(id:string, token:string){
        let headers = new Headers();
        headers.append( 'Authorization', token);

        let url = this.urlArtista + '/' + id + '/top-tracks?country=ES' ;

        return this.http.get( url , { headers })
            .map( res => {

                console.log(res.json().tracks);
                return res.json().tracks;
            });
    }

}
