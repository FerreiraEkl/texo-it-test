import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import {
  IProducer,
  MoviesService,
} from 'src/app/shared/services/movies.service';

@Component({
  selector: 'app-wins-interval',
  templateUrl: './wins-interval.component.html',
  styleUrls: ['./wins-interval.component.scss'],
})
export class WinsIntervalComponent implements OnInit {
  constructor(private movieService: MoviesService) {}

  public minIntervals: IProducer[] = [];
  public maxIntervals: IProducer[] = [];

  ngOnInit(): void {
    this.load();
  }

  private async load() {
    const response = await firstValueFrom(this.movieService.getWinInterval());
    this.maxIntervals = response.max;
    this.minIntervals = response.min;
  }
}
