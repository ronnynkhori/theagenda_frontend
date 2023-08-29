import { HttpHeaders } from "@angular/common/http";

export const environment = {
    name: 'prod',
    production: true,
    apiBaseUrl: 'http://164.92.135.84:9090',
    httpOptions:{
        headers: new HttpHeaders({'Content-Type': 'application/json'}),
        observe: 'response',
        responseType: 'json'
    }
};
