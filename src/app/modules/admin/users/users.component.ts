import { Component } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  standalone   : true,
  imports      : [MatTableModule, MatIconModule, MatMenuModule],
})
export class UsersComponent {
  users: User[] = [
    { name: 'John', surname: 'Doe', email: 'john@example.com', role: 'Admin' },
    { name: 'Jane', surname: 'Smith', email: 'jane@example.com', role: 'User' },
    // Add more users here
  ];

  displayedColumns: string[] = ['name', 'surname', 'email', 'role', 'actions'];

}
export interface User {
  name: string;
  surname: string;
  email: string;
  role: string;
}