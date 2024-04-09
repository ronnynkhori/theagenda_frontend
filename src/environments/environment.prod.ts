import { HttpHeaders } from "@angular/common/http";

export const environment = {
    name: 'prod',
    production: true,
    apiBaseUrl: 'https://backend.theagenda.co.bw',
    httpOptions:{
        headers: new HttpHeaders({'Content-Type': 'application/json'}),
        observe: 'response',
        responseType: 'json'
    }
};
