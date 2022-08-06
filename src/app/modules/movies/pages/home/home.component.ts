import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, firstValueFrom, pipe, Subscription } from 'rxjs';
import {
  IPaginatedMovieFilter,
  IWinnerMovie,
  MoviesService,
} from 'src/app/shared/services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  // PODERIA SER USADO FORM GROUP PARA O FILTRO CASO PRECISAR DE VAIDAÇÃO

  public pages: number[] = [];

  public movies: IWinnerMovie[] = [];

  public curentFilter: IPaginatedMovieFilter = {
    page: 1,
    size: 15,
  };

  public yearControl = new FormControl();

  private formSub: Subscription;

  constructor(private movieService: MoviesService) {
    this.formSub = this.yearControl.valueChanges
      .pipe(debounceTime(750))
      .subscribe((year) => {
        if (!year) {
          delete this.curentFilter.year;
        } else {
          this.curentFilter.year = year;
        }

        this.search();
      });
  }

  ngOnInit(): void {
    this.search();
  }

  ngOnDestroy(): void {
    this.formSub.unsubscribe();
  }

  private async search() {
    const response = await firstValueFrom(
      this.movieService.getMoviesPaginated({
        ...this.curentFilter,
        page: this.curentFilter.page - 1,
      }),
    );

    this.pages = [];

    while (this.pages.length < response.totalPages) {
      this.pages.push(this.pages.length + 1);
    }

    this.movies = response.content;
  }

  async yearSearch(year?: number) {
    this.curentFilter.year = year;
    this.search();
  }

  async winnerSearch(winner?: string) {
    if (winner == 'undefined') {
      delete this.curentFilter.winner;
    } else {
      this.curentFilter.winner = winner as unknown as boolean;
    }

    console.log(this.curentFilter);

    await this.search();
  }

  async navigate(page: number) {
    if (!this.pages.includes(page)) {
      return;
    }
    this.curentFilter.page = page;
    this.search();
  }
}
