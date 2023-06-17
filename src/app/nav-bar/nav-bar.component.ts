import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})


export class NavBarComponent {
  constructor(public router: Router) {}

  /* Navigates to the movies view*/
  
  toMovies(): void {
    this.router.navigate(['movies']);
  }

  /* Navigates to the user view*/

  toProfile(): void {
    this.router.navigate(['user']);
  }

  /* Logs out the user by clearing the localStorage,
   * thereby deleting the "user" and "token" key/values*/
  logout(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }
}
