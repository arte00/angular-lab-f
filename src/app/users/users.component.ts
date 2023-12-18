import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {User} from "../user";
import {tap} from "rxjs";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users!: User[];

  constructor(
    private dataService: DataService
  ) {
  }

  ngOnInit(): void {
    this.dataService.users()
      .pipe(
        tap(users => {
          this.users = users
        })
      )
      .subscribe();
  }

  public isUserAdmin(user: User): boolean {
    return user.roles.includes('ADMIN')
  }



}
