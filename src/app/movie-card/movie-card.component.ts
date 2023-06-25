import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { GenreDetailsComponent } from '../genre-details/genre-details.component';
import { DirectorDetailsComponent } from '../director-details/director-details.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favoriteMovies: any[] = []; // Array to store favorite movie IDs

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  /**
   * Calls the get movies method on the API.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      });
    
  }

  /**
  * Calls the check favorite movie method on the API.
  * @param id The movie ID
  */
    isFavorite(MovieID: string): boolean {
    return this.favoriteMovies.includes(MovieID);
  }

  /**
   * Calls the add favorite movie method on the API.
   * @param id The movie ID
   */
  addToFavorites(id: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {
      console.log(result);
      this.snackBar.open('Movie added to favorites', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  /**
   * Calls the delete favorite movie method on the API.
   * @param id The movie ID
   */
  removeFromFavorites(id: string): void {
    this.fetchApiData.removeFavoriteMovie(id).subscribe((result) => {
      console.log(result);
      this.snackBar.open('Movie removed from favorites', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

/** 
 * calls getOneSure function to populate favoriteMovies array
*/
  getFavoriteMovies(): void {
    this.fetchApiData.getOneUser().subscribe((user: any) => {
    this.favoriteMovies = user.FaveMovies;
    });
    }


/**
   * Opens the movie description dialog.
   * @param description The text to show on the dialog
   */   
 openSummary(title: string, description: string): void {
  this.dialog.open(MovieDetailsComponent, {
    data: {
      Title: title,
      Description: description,
    },
    width: '25rem',
  });
}

/**
   * Opens the genre dialog.
   * @param name The genre's name to show on the dialog (title)
   * @param description The genre's description to show on the dialog
   */
openGenre(name: string, description: string): void {
  this.dialog.open(GenreDetailsComponent, {
    data: {
      Name: name,
      Description: description,
    },
    width: '25rem',
  });
}

/**
   * Opens the director dialog.
   * @param name The director's name to show on the dialog (title)
   * @param bio The director's biography to show on the dialog
  */
openDirector(name: string, bio: string, birthday: string): void {
  this.dialog.open(DirectorDetailsComponent, {
    data: {
      Name: name,
      Bio: bio,
      Birth: birthday,
    },
    width: '25rem',
  });
}

}
