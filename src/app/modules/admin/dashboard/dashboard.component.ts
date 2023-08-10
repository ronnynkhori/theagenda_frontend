import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApexOptions } from 'apexcharts';
import { Subject, takeUntil } from 'rxjs';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  chartVisitors: ApexOptions;
  chartConversions: ApexOptions;
  chartImpressions: ApexOptions;
  chartVisits: ApexOptions;
  chartVisitorsVsPageViews: ApexOptions;
  chartNewVsReturning: ApexOptions;
  chartGender: ApexOptions;
  chartAge: ApexOptions;
  chartLanguage: ApexOptions;
  data: any;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
      private _analyticsService: DashboardService,
      private _router: Router
  )
  {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void
  {
  }
}
