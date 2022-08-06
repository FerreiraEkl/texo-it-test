import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { MoviesService } from 'src/app/shared/services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private movieService: MoviesService) {}

  ngOnInit(): void {
    this.loadMultipleWinnersByYear();
  }

  private async loadMultipleWinnersByYear() {
    const response = await firstValueFrom(
      this.movieService.getYearsWithMultipleWinners(),
    ); 
  }
}
