import { HttpHeaders } from "@angular/common/http";

export const environment = {
    name: 'prod',
    production: true,
    apiBaseUrl: 'http://nginx_proxy_manager',
    httpOptions:{
        headers: new HttpHeaders({'Content-Type': 'application/json'}),
        observe: 'response',
        responseType: 'json'
    }
};
