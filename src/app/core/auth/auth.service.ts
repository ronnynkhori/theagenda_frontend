import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { environment } from 'environments/environment';
import { catchError, Observable, of, switchMap, tap, throwError } from 'rxjs';



@Injectable({providedIn: 'root'})
export class AuthService
{
    private readonly HELLO = environment.apiBaseUrl + '/api/auth/v1/hello';
    private readonly SIGIN = environment.apiBaseUrl + '/api/auth/v1/login';
  private readonly SIGUP = environment.apiBaseUrl + '/api/auth/v1/register';
  private readonly RESETPASSWORD = environment.apiBaseUrl + '/api/auth/v1/resetpassword';
  private readonly FORGOTPASSWORD = environment.apiBaseUrl + '/api/auth/v1/forgotpassword';
    private _authenticated: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService,
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string)
    {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string
    {
        return localStorage.getItem('accessToken') ?? '';
    }


    forgotPassword(email: string): Observable<any>
    {
        return this._httpClient.post('api/auth/forgot-password', email);
    }


    resetPassword(password: string): Observable<any>
    {
        return this._httpClient.post('api/auth/reset-password', password);
    }


    signIn(credentials: { email: string; password: string }): Observable<any> {
        if (this._authenticated) {
          return throwError('User is already logged in.');
        }
      
        return this._httpClient.post(this.SIGIN, credentials).pipe(
          tap((response: any) => {
            console.log("response", response);
            this.accessToken = response.accessToken;
            this._authenticated = true;
            this._userService.user = response;
          }),
          catchError((error) => {
            // Handle error here (log, show message, etc.)
            console.error('Authentication error:', error);
            return throwError('Authentication failed.');
          })
        );
      }
    
    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any>
    {
        // Sign in using the token
        return this._httpClient.post('api/auth/sign-in-with-token', {
            accessToken: this.accessToken,
        }).pipe(
            catchError(() =>

                // Return false
                of(false),
            ),
            switchMap((response: any) =>
            {
                // Replace the access token with the new one if it's available on
                // the response object.
                //
                // This is an added optional step for better security. Once you sign
                // in using the token, you should generate a new one on the server
                // side and attach it to the response object. Then the following
                // piece of code can replace the token with the refreshed one.
                if ( response.accessToken )
                {
                    this.accessToken = response.accessToken;
                }

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
              //  this._userService.user = response.user;

                // Return true
                return of(true);
            }),
        );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any>
    {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: any): Observable<any>
    {
        return this._httpClient.post(this.SIGUP, user);
    }

    test(): Observable<any>
    {
        return this._httpClient.get(this.HELLO);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean>
    {
        // Check if the user is logged in
        if ( this._authenticated )
        {
            return of(true);
        }

        // Check the access token availability
        if ( !this.accessToken )
        {
            return of(false);
        }

        // // Check the access token expire date
        // if ( AuthUtils.isTokenExpired(this.accessToken) )
        // {
        //     return of(false);
        // }

        // If the access token exists, and it didn't expire, sign in using it
        return this.signInUsingToken();
    }
}
