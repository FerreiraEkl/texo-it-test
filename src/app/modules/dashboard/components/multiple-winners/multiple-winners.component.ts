import { Component, Input, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { MoviesService } from 'src/app/shared/services/movies.service';

@Component({
  selector: 'app-multiple-winners',
  templateUrl: './multiple-winners.component.html',
  styleUrls: ['./multiple-winners.component.scss'],
})
export class MultipleWinnersComponent implements OnInit {
  years: IWinnersByYear[] = [];

  constructor(private movieService: MoviesService) {}

  ngOnInit(): void {
    this.load();
  }

  private async load() {
    const response = await firstValueFrom(
      this.movieService.getYearsWithMultipleWinners(),
    );

    this.years = response.years;
  }
}

export interface IWinnersByYear {
  year: number;
  winnerCount: number;
}
