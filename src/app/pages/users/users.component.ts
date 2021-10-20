import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/users.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.userService.get_all_user()
      .subscribe(
        (users) => {
          this.users = users;
          console.log(this.users)
        },
        (error) => {
          swal.fire('Error', 'Error obteniendo usuarios', 'error')
        }
      )
  }

  downloadCv(idUser: string): void {
    console.log(idUser);
  }

}
