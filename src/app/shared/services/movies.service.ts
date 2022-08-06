import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpUtilsService } from '../utils/http-utils.service';

const DEFAULT_URL = `${environment.moviesUrl}`;

@Injectable({ providedIn: 'root' })
export class MoviesService {
  constructor(
    private http: HttpClient,
    private httpUtilsService: HttpUtilsService,
  ) {}

  getMoviesPaginated(filter: IPaginatedMovieFilter) {
    return this.http.get<IWinnerMoviesPaginated>(
      `${DEFAULT_URL}?${this.httpUtilsService.build(filter)}`,
    );
  }

  getMovies(filter: IMovieFilter) {
    return this.http.get<IWinnerMovie[]>(
      `${DEFAULT_URL}?${this.httpUtilsService.build(filter)}`,
    );
  }

  getYearsWithMultipleWinners() {
    return this.http.get<IMultipleWinners>(
      `${DEFAULT_URL}?projection=${projection.MULTIPLE_WINNERS}`,
    );
  }

  getWinsByStudio() {
    return this.http.get<IStudioWins>(
      `${DEFAULT_URL}?projection=${projection.WIN_BY_STUDIO}`,
    );
  }

  getWinInterval() {
    return this.http.get<IWinIntervalResponse>(
      `${DEFAULT_URL}?projection=${projection.WIN_INTERVAL}`,
    );
  }
}

enum projection {
  WIN_INTERVAL = 'max-min-win-interval-for-producers',
  WIN_BY_STUDIO = 'studios-with-win-count',
  MULTIPLE_WINNERS = 'years-with-multiple-winners',
}

export interface IMovieFilter {
  /** If movie was winner in the search year */
  winner?: boolean;

  /** Search year */
  year?: number;
}

export interface IPaginatedMovieFilter extends IMovieFilter {
  /** Search page*/
  page: number;

  /** Page size */
  size: number;
}

interface IWinnerMoviesPaginated {
  content: IWinnerMovie[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
    };
    pageSize: number;
    pageNumber: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalElements: number;
  last: boolean;
  totalPages: number;
  first: boolean;
  sort: {
    sorted: boolean;
    unsorted: boolean;
  };
  number: number;
  numberOfElements: number;
  size: number;
}

export interface IWinnerMovie {
  id: number;
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
}

interface IMultipleWinners {
  years: [
    {
      year: number;
      winnerCount: number;
    },
  ];
}

interface IStudioWins {
  studios: {
    name: string;
    winCount: number;
  }[];
}

interface IWinIntervalResponse {
  min: IProducer[];
  max: IProducer[];
}

export interface IProducer {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}
