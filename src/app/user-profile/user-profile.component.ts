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
        this.userData.Birthday = formatDate(user.Birthday, 'dd-mm-yyyy', 'en-GB', 'GMT'); // this isn't working
      });
    }

}
