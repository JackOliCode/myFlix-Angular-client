import { Component, OnInit, Input } from '@angular/core';

// Use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// Import is used to display notifications 
import { MatSnackBar } from '@angular/material/snack-bar';

// Brings in the API calls
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: any = {}; //defines user as an object
  favoriteMovies: any[] = []; //defines FM as an empty array

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router
    ) { }

    // on component initialisation, the getUser function will be run
    ngOnInit(): void {
      this.getUser();
    }

    /**
    * Gets the user info and favorite movies from the API.
    */
    getUser(): void {
      this.fetchApiData.getOneUser().subscribe((user: any) => {
        this.user = user;
        this.userData.Username = user.Username;
        this.userData.Email = user.Email;
        this.userData.Birthday = user.Birthday;
      
        this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.favoriteMovies = resp.filter((m: { _id: any; }) => 
        this.user.FaveMovies.indexOf(m._id) >= 0);
        });
      });
    }

    /**
   *Calls the API to update the user info.
   */
    editUser(): void {
      this.fetchApiData.editUser(this.userData).subscribe((result) => {
        console.log('User:', result);
        localStorage.setItem('username', result.Username);
        this.snackBar.open('User successfully updated', 'OK', {
          duration: 2000
        });
      }, (error) => {
        const errorMessage = error.message || 'An error occurred.';
        this.snackBar.open(errorMessage, 'OK', {
          duration: 2000
        });
      });
    }

    updateUser(): void {
      this.editUser();
      setTimeout(() => {
        this.getUser();
      }, 1000); // added 1ms delay as code async
    }

    /**
    *Calls the API to delete the user.
    */
    deleteUser(): void {
      this.fetchApiData.deleteUser().subscribe((result) => {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open('User successfully deleted', 'OK', {
          duration: 2000
        });
      }, (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000
        });
      });
    }


  }

