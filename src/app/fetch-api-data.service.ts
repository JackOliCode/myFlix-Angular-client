import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://jackoc-myflix.onrender.com/';
@Injectable({ // A decorator is a function that augments a piece of code—usually another function or a class.//
  providedIn: 'root'
})

/**
 *Creates a new service to load the data from the API.
 */
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  /**
  *  Makes the API call for the user registration endpoint.
  * @param userDetails The user credentials
  * @returns http POST request
  */  
 public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

   /**
  *  Makes the API call for the user login endpoint.
  * @param userDetails the user credentials
  * @returns http POST request
  */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
    catchError(this.handleError)
    );
  }

 /**
  *  Makes the API call for the get all Movies endpoint. 
  * @returns http GET request
  */  
 getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

 /**
  *  Makes the API call for the get one movie endpoint.
  * @param title (the movie title)
  * @returns http GET request
  */
   getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + title, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

   /**
  *  Makes the API call for the get director endpoint.
  * @param directorName
  * @returns http GET request
  */
  getOneDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/director/' + directorName, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  
 /**
  *  Makes the API call for the get genre endpoint.
  * @param genreName
  * @returns http GET request
  */
  getOneGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/' + genreName, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  
   /**
  *  Makes the API call for the get user endpoint.
  * @returns http GET request
  */
  getOneUser(): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + username, { headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );  
  }
  

   /**
  *  Makes the API call for the update user endpoint.
  * @param updatedUser
  * @returns http PUT request
  */
  editUser(updatedUser: any): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + username, updatedUser, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

 /**
  *  Makes the API call for the delete user endpoint.
  * @returns http DELETE request
  */
   deleteUser(): Observable<any> {
    const userid = localStorage.getItem('userid');
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + userid, { headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

 /**
  *  Makes the API call for the add to favourites endpoint.
  * @param MovieID
  * @returns http POST request
  */
   addFavoriteMovie(MovieID: string): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + 'users/' + username + '/movies/' + MovieID, {}, {headers: new HttpHeaders(
    {
    Authorization: 'Bearer ' + token,
    })
    }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
    );
    }

 /**
  *  Makes the API call for the remove from favourites endpoint.
  * @param MovieID
  * @returns http DELETE request
  */
   removeFavoriteMovie(MovieID: string): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    
    return this.http.delete(apiUrl + 'users/' + username + '/movies/' + MovieID, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }



private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
    }
  }