import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-multiple-winners',
  templateUrl: './multiple-winners.component.html',
  styleUrls: ['./multiple-winners.component.scss'],
})
export class MultipleWinnersComponent implements OnInit {
  @Input()
  yersList: IWinnersByYear[] = [];

  constructor() {}

  ngOnInit(): void {}
}

export interface IWinnersByYear {
  year: number;
  winners: number;
}
