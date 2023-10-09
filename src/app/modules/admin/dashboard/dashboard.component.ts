import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApexOptions } from 'apexcharts';
import { Subject, takeUntil } from 'rxjs';
import { DashboardService } from './dashboard.service';
import { UserService } from 'app/core/user/user.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    data: any;
    userCount: any;
    requestCount: any;

    constructor(
        private _router: Router,
        private dashboardService: DashboardService,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        this.getAllUsers();
        this.getAllRequests();
    }

    getAllUsers() {
        this.userService.getAllUsers().subscribe({
            next: (response: any) => {
                this.userCount = response.length;
                console.log("lko",  this.userCount);
            },
            error: (err: any) => {
                console.log(err);
            },
        });
    }
    getAllRequests() {
        this.dashboardService.getAllRequests().subscribe({
            next: (response: any) => {
                this.requestCount = response.length;
                console.log("requets",  this.requestCount );
            },
            error: (err: any) => {
                console.log(err);
            },
        });
    }
}
