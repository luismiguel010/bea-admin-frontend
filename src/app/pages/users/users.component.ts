import { BlobService } from './../../services/blob.service';
import { Component, OnInit } from '@angular/core';
import { Cv } from 'src/app/models/Cv';
import { User } from 'src/app/models/User';
import { CvService } from 'src/app/services/cv.service';
import { UsersService } from 'src/app/services/users.service';
import swal from 'sweetalert2';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  cv: Cv = new Cv();


  constructor(private userService: UsersService, private cvService: CvService, private blobService: BlobService) { }

  ngOnInit(): void {
    this.userService.get_all_user()
      .subscribe(
        (users) => {
          this.users = users;
        },
        (error) => {
          swal.fire('Error', 'Error obteniendo usuarios', 'error')
        }
      )
  }

  getCvByIdUser(idUser: string): void {
    this.cvService.getCvByIdUser(idUser)
      .subscribe(
        (cv) => {
          this.cv = cv;
          this.downloadCv(this.cv.directoryFile)
        },
        (error) => {
          swal.fire('Error', 'Error obteniendo hoja de vida, comuníquese con el desarrollador', 'error')
        }
      )
  }

  downloadCv(directoryFile: string): void {
    this.blobService.downloadCv(directoryFile)
      .subscribe(
        (blob) => {
          saveAs(blob, directoryFile)
        },
        (error) => {
          swal.fire('Error descargando la hoja de vida', 'Consulto al administrador', 'error')
        }
      )

  }



}
