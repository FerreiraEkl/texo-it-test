import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-studios',
  templateUrl: './top-studios.component.html',
  styleUrls: ['./top-studios.component.scss'],
})
export class TopStudiosComponent implements OnInit {
  @Input()
  winnerStudios: IWinnerStudio[] = [];

  constructor() {}

  ngOnInit(): void {}
}

export interface IWinnerStudio {
  name: string;
  wins: number;
}
