import { Component, Input, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { MoviesService } from 'src/app/shared/services/movies.service';

@Component({
  selector: 'app-top-studios',
  templateUrl: './top-studios.component.html',
  styleUrls: ['./top-studios.component.scss'],
})
export class TopStudiosComponent implements OnInit {
  winnerStudios: IWinnerStudio[] = [];

  constructor(private movieService: MoviesService) {}

  ngOnInit(): void {
    this.load();
  }

  private async load() {
    const response = await firstValueFrom(this.movieService.getWinsByStudio());

    this.winnerStudios = response.studios.slice(0, 3);
  }
}

export interface IWinnerStudio {
  name: string;
  winCount: number;
}
