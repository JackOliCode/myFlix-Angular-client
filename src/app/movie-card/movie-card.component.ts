import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';


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
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
    });
  }

  // fave movie logic starts here //

    isFavorite(MovieID: string): boolean {
    return this.favoriteMovies.includes(MovieID);
  }

  addToFavorites(_id: string): void {
    this.fetchApiData.addFavoriteMovie(_id).subscribe((result) => {
      this.snackBar.open('Movie added to favorites', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  removeFromFavorites(id: string): void {
    this.fetchApiData.deleteFavoriteMovie(id).subscribe((result) => {
      this.snackBar.open('Movie removed from favorites', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }


 //Movie Details dialog modal displaying the movie title and description//
   
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
 * Open the Genre dialog modal diplaying the movie genre info
 * @param name
 * @param description
 *
openGenre(name: string, description: string): void {
  this.dialog.open(GenreComponent, {
    data: {
      Name: name,
      Description: description,
    },
    width: '25rem',
  });
}

**
 * Open the Director dialog modal displaying the movie director info
 * @param name
 * @param bio 
 * @param birthday
 *
openDirector(name: string, bio: string, birthday: string): void {
  this.dialog.open(DirectorComponent, {
    data: {
      Name: name,
      Bio: bio,
      Birth: birthday,
    },
    width: '25rem',
  });
}*/
}
