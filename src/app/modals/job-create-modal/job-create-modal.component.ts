import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/models/Job';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { JobService } from 'src/app/services/job.service';
import swal from 'sweetalert2';
import { v4 as uuid } from 'uuid';
import { Professions } from 'src/app/enums/professions';

@Component({
  selector: 'app-job-create-modal',
  templateUrl: './job-create-modal.component.html',
  styleUrls: ['./job-create-modal.component.css']
})
export class JobCreateModalComponent implements OnInit {

  job: Job = new Job();
  category_array: string[] = new Array();
  newCategory!: string;

  constructor(public modalRef: MdbModalRef<JobCreateModalComponent>, private jobService: JobService) { }

  ngOnInit(): void {
    this.category_array = Object.values(Professions);
  }

  addCategory(newCategory: string): void {
    this.category_array.push(newCategory);
  }

  close(): void {
    this.modalRef.close()
  }

  refresh(): void {
    window.location.reload();
  }

  public send(): void {
    if (this.job.name == null) {
      swal.fire('Error al crear oferta', 'Campo del nombre vacío', 'error')
      return;
    }
    if (this.job.description == null) {
      swal.fire('Error al crear oferta', 'Campo de descripción vacío', 'error')
      return;
    }
    if (this.job.category == null) {
      swal.fire('Error al crear oferta', 'Campo de categoría vacío', 'error')
    }
    if (this.job.category == 'Otro') {
      this.job.category = this.newCategory;
    }
    if (this.job.dateInit == null) {
      this.job.dateInit = new Date()
    }
    if (this.job.dateFinish == null) {
      let date: Date = this.job.dateInit
      date.setDate(date.getDate() + 90)
      this.job.dateFinish = date
    }
    if (this.job.salary == null) {
      this.job.salary = "No se especifica"
    }
    if (this.job.phone == null) {
      this.job.phone = "No se especifica"
    }
    if (this.job.company == null) {
      this.job.company = "No se especifica"
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
