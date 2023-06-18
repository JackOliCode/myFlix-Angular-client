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
  favouriteMovies: any[] = []; //defines FM as an empty array

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    //public dialogRef: MatDialogRef<UserProfileComponent>,
    public snackBar: MatSnackBar,
    private router: Router
    ) { }

    // on component initialisation, the getUser function will be run
    ngOnInit(): void {
      this.getUser();
    }

    getUser(): void {
      this.fetchApiData.getOneUser().subscribe((user: any) => {
        this.user = user;
        this.userData.Username = user.Username;
        this.userData.Email = user.Email;
        this.userData.Birthday = user.Birthday;
      });
    }

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
}
