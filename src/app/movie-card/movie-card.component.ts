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
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.fetchApiData.getUser().subscribe((userResp: any) => {
        this.favoriteMovies = userResp.FavoriteMovies;
        console.log(this.movies);
      });
    });
  }

  // fave movie logic starts here //

    isFavorite(MovieID: string): boolean {
    return this.favoriteMovies.includes(MovieID);
  }

  addToFavorites(id: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {
      console.log(result);
      this.snackBar.open('Movie added to favorites', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  removeFromFavorites(id: string): void {
    this.fetchApiData.removeFavoriteMovie(id).subscribe((result) => {
      console.log(result);
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

//genre component 

openGenre(name: string, description: string): void {
  this.dialog.open(GenreDetailsComponent, {
    data: {
      Name: name,
      Description: description,
    },
    width: '25rem',
  });
}

// director component //

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
