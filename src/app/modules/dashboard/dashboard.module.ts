import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { TopStudiosComponent } from './components/top-studios/top-studios.component';
import { MultipleWinnersComponent } from './components/multiple-winners/multiple-winners.component';
import { WinnersByYearComponent } from './components/winners-by-year/winners-by-year.component';
import { WinsIntervalComponent } from './components/wins-interval/wins-interval.component';

@NgModule({
  declarations: [
    HomeComponent,
    TopStudiosComponent,
    MultipleWinnersComponent,
    WinnersByYearComponent,
    WinsIntervalComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
