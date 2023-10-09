import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'app/core/user/user.types';
import { environment } from 'environments/environment';
import { map, Observable, ReplaySubject, tap } from 'rxjs';

const GETALLUSERS = environment.apiBaseUrl + '/api/auth/v1/users';
const GETUSERBYID = environment.apiBaseUrl + '/api/auth/v1/users/';
const UPDATEUSERBYID = environment.apiBaseUrl + '/api/auth/v1/users/update/';
const CREATEUSER = environment.apiBaseUrl + '/api/auth/v1/users/create';

@Injectable({ providedIn: 'root' })
export class UserService {
    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User) {
        // Store the value
        this._user.next(value);
    }

    get user$(): Observable<User> {
        return this._user.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current logged in user data
     */
    get(): Observable<User> {
        return this._httpClient.get<User>('api/common/user').pipe(
            tap((user) => {
                this._user.next(user);
            })
        );
    }

    /**
     * Update the user
     *
     * @param user
     */
    update(user: User): Observable<any> {
        return this._httpClient.patch<User>('api/common/user', { user }).pipe(
            map((response) => {
                this._user.next(response);
            })
        );
    }

    getAllUsers(): Observable<any> {
        return this._httpClient.get<any>(GETALLUSERS);
    }
    createUser(user: any): Observable<any> {
        return this._httpClient.post(CREATEUSER, user);
    }
    updateUser(userId: any, user: any): Observable<any> {
        return this._httpClient.patch(UPDATEUSERBYID + `${userId}`, user);
    }

    getUserById(userId: any): Observable<any>{
        return this._httpClient.get(GETUSERBYID + `${userId}`);
    }
}
