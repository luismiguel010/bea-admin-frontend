import { JobService } from './../../services/job.service';
import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/models/Job';
import swal from 'sweetalert2';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { JobModalComponent } from 'src/app/modals/job-modal/job-modal.component';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  jobs: Job[] = [];
  modalRef!: MdbModalRef<JobModalComponent>;

  constructor(private modalService: MdbModalService, private jobService: JobService) { }

  openModal(job: Job) {
    this.modalRef = this.modalService.open(JobModalComponent, {
      data: { job }
    });
  }

  ngOnInit(): void {
    this.jobService.getAllJobs()
      .subscribe(
        (jobs) => {
          this.jobs = jobs;
        },
        (error) => {
          swal.fire('Error', 'Error obteniendo lista de empleos', 'error')
        })
  }

  stateSpanish(state: boolean): string {
    if (state) {
      return "Activo"
    } else {
      return "Desactivado"
    }
  }

}
