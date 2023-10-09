import { Component, OnInit } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { UserService } from 'app/core/user/user.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    standalone: true,
    imports: [MatTableModule, MatIconModule, MatMenuModule],
})
export class UsersComponent implements OnInit {
    users: any[];

    displayedColumns: string[] = [
        'name',
        'surname',
        'email',
        'role',
        'actions',
    ];

    constructor(private userService: UserService) {}
    ngOnInit(): void {
        this.getAllUsers();
    }
    getAllUsers() {
        this.userService.getAllUsers().subscribe({
            next: (next: any) => {
                this.users = next;
                console.log('users', next);
            },
            error: (error: any) => {
                console.log(error);
            },
        });
    }
}

export interface User {
    name: string;
    surname: string;
    email: string;
    role: string;
}
