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
import { NivelAcademico } from 'src/app/enums/nivel-academico';
import { Professions } from 'src/app/enums/professions';
import { UserwithjobsService } from 'src/app/services/userwithjobs.service';

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
  professions: string[] = [];
  academicProfileList: string[] = [];
  jobs: Job[] = [];

  constructor(private userWithJobsService: UserwithjobsService, private cvService: CvService,
    private blobService: BlobService, private jobService: JobService) { }

  ngOnInit(): void {
    this.academicProfileList = Object.values(NivelAcademico);
    this.professions = Object.values(Professions);
    this.userWithJobsService.get_all_user_with_jobs()
      .subscribe(
        (userjobs) => {
          this.usersWithJobs = userjobs;
        },
        (error) => {
          swal.fire('Error', 'Error obteniendo lista de usuarios', 'error')
        }
      )
    this.jobService.getAllJobs()
      .subscribe(
        (jobs) => {
          this.jobs = jobs;
        },
        (error) => {
          swal.fire('Error', 'Error obteniendo lista de empleos', 'error')
        })
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
