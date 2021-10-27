import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/models/Job';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { JobService } from 'src/app/services/job.service';
import swal from 'sweetalert2';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-job-create-modal',
  templateUrl: './job-create-modal.component.html',
  styleUrls: ['./job-create-modal.component.css']
})
export class JobCreateModalComponent implements OnInit {

  job: Job = new Job();

  constructor(public modalRef: MdbModalRef<JobCreateModalComponent>, private jobService: JobService) { }

  ngOnInit(): void {
  }

  close(): void {
    this.modalRef.close()
  }

  refresh(): void {
    window.location.reload();
  }

  public send(): void {
    if (this.job.name == null) {
      swal.fire('Error al actualizar oferta', 'Campo del nombre vacío', 'error')
      return;
    }
    if (this.job.description == null) {
      swal.fire('Error al actualizar oferta', 'Campo de descripción vacío', 'error')
      return;
    }
    this.job.idJob = uuid().toString();
    this.job.state = true;
    console.log(this.job)
    this.jobService.createJob(this.job)
      .subscribe(() => {
        swal.fire('Creada', 'Oferta laboral creada con éxito', 'success')
        this.refresh();
      },
        (error) => {
          swal.fire('Error', 'Error creando oferta laboral', 'error')
        })
  }



}
