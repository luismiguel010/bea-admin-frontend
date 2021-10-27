import { JobService } from './../../services/job.service';
import { BlobService } from './../../services/blob.service';
import { Component, OnInit } from '@angular/core';
import { Cv } from 'src/app/models/Cv';
import { User } from 'src/app/models/User';
import { CvService } from 'src/app/services/cv.service';
import { UsersService } from 'src/app/services/users.service';
import swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import { UserWithJobs } from 'src/app/models/UserWithJobs';
import { Job } from 'src/app/models/Job';
import { Observable, Subject, throwError } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  cv: Cv = new Cv();
  job: Job = new Job();
  usersWithJobs: UserWithJobs[] = [];
  filterUser = '';

  constructor(private userService: UsersService, private cvService: CvService,
    private blobService: BlobService, private jobService: JobService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  mapUserWithJob(users: User[]) {
    users.forEach(user => {
      var _userWithJobs = new UserWithJobs();
      _userWithJobs.idUser = user.idUser;
      _userWithJobs.names = user.names;
      _userWithJobs.lastnames = user.lastnames;
      _userWithJobs.identificationCard = user.identificationCard;
      _userWithJobs.email = user.email;
      _userWithJobs.address = user.address;
      _userWithJobs.academicProfile = user.academicProfile;
      _userWithJobs.phone = user.phone;
      _userWithJobs.jobName = [];
      this.cvService.getCvByIdUser(user.idUser)
        .subscribe(cv => {
          this.cv = cv
          this.cv.jobCvList.forEach(jobcv => {
            this.jobService.getJobById(jobcv.idJob)
              .subscribe(job => {
                this.job = job
                _userWithJobs.jobName.push(this.job.name)
              })
            this.usersWithJobs.push(_userWithJobs)
          })
        })
    });
  }

  getAllUsers() {
    this.userService.get_all_user()
      .subscribe(
        (users) => {
          this.users = users
          this.mapUserWithJob(this.users)
        },
        (error) => {
          swal.fire('Error', 'Error obteniendo usuarios', 'error')
        }
      )
  }

  downloadCvByIdUser(idUser: string): void {
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

  getCvByIdUser(idUser: string) {
    this.cvService.getCvByIdUser(idUser)
      .subscribe(
        (cv) => {
          this.cv = cv
        },
        (error) => {
          swal.fire('Error', 'Error obteniendo la hojas de vida, comuníquese con el desarrollador', 'error')
        }
      )
  }

  getNameJob(idJob: string): void {
    this.jobService.getJobById(idJob)
      .subscribe(
        (job) => {
          this.job = job;
        },
        (error) => {
          swal.fire('Error', 'Error obteniendo trabajos, comuníquese con el desarrollador', 'error')
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
