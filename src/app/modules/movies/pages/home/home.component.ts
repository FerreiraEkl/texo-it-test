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
      .pipe(debounceTime(1000))
      .subscribe(async (year) => {

        this.curentFilter.page = 1;

        if (!year) {
          delete this.curentFilter.year;
        } else {
          this.curentFilter.year = year;
        }

       await this.search();
      });
  }

  async ngOnInit() {
    await this.search();
  }

  ngOnDestroy(){
    this.formSub.unsubscribe();
  }

  private async search() {
    const targetPage= this.curentFilter.page - 1;

    const response = await firstValueFrom(
      this.movieService.getMoviesPaginated({
        ...this.curentFilter,
        page: targetPage,
      }),
    );

    this.pages = [];

    while (this.pages.length < response.totalPages) {
      this.pages.push(this.pages.length + 1);
    }

    this.movies = response.content;
  }

  async winnerSearch(winner?: string) {
    this.curentFilter.page = 1;

    if (winner == 'undefined') {
      delete this.curentFilter.winner;
    } else {
      this.curentFilter.winner = winner as unknown as boolean;
    }

    await this.search();
  }

  // PAGINATION OPTIONS =================================
  async navigate(page: number) {
    if (!this.pages.includes(page)) {
      return;
    }
    
    this.curentFilter.page = page;

    await this.search();
  }
  
  goNext(){
    const target = this.curentFilter.page +1
    this.navigate(target)
  }

  goPrevious(){
    const target = this.curentFilter.page -1
    this.navigate(target)
  }

  goLast(){
    const latsPage = this.pages[this.pages.length-1];
    this.navigate(latsPage);
  }

  goFirst(){
    const firstPage = this.pages[0];
    this.navigate(firstPage);
  }
}
