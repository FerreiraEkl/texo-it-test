import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import {
  IWinnerMovie,
  MoviesService,
} from 'src/app/shared/services/movies.service';

@Component({
  selector: 'app-winners-by-year',
  templateUrl: './winners-by-year.component.html',
  styleUrls: ['./winners-by-year.component.scss'],
})
export class WinnersByYearComponent {
  public winners: IWinnerMovie[] = [];

  constructor(private movieService: MoviesService) {}

  async search(year: string) {
    const response = await firstValueFrom(
      this.movieService.getMovies({ winner: true, year: parseInt(year) }),
    );

   this.winners = response
  }
}
