import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/models/Job';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { JobService } from 'src/app/services/job.service';
import swal from 'sweetalert2';
import { v4 as uuid } from 'uuid';
import { Categorias } from 'src/app/enums/categorias';

@Component({
  selector: 'app-job-create-modal',
  templateUrl: './job-create-modal.component.html',
  styleUrls: ['./job-create-modal.component.css']
})
export class JobCreateModalComponent implements OnInit {

  job: Job = new Job();
  category_array: string[] = new Array();
  newCategory!: string;
  daysFinishDefault: number = 30;

  constructor(public modalRef: MdbModalRef<JobCreateModalComponent>, private jobService: JobService) { }

  ngOnInit(): void {
    this.category_array = Object.values(Categorias);
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
      if (this.newCategory != null) {
        this.job.category = this.newCategory;
      } else {
        swal.fire('Error al crear oferta', 'Campo de categoría vacío', 'error')
        return
      }
    }
    if (this.job.dateFinish == null) {
      this.job.dateInit = new Date()
      let date: Date = this.job.dateInit
      date.setDate(date.getDate() + this.daysFinishDefault)
      this.job.dateFinish = date
    }
    if (this.job.requisito == null) {
      this.job.requisito = "No se especifica"
    }
    if (this.job.salary == null) {
      this.job.salary = "No se especifica"
    }
    if (this.job.address == null) {
      this.job.address = "No se especifica"
    }
    if (this.job.company == null) {
      this.job.company = "No se especifica"
    }
    this.job.idJob = uuid().toString();
    this.job.state = true;
    this.job.dateInit = new Date()
    this.jobService.createJob(this.job)
      .subscribe(() => {
        swal.fire('Creada', 'Oferta laboral publicada con éxito', 'success')
        this.refresh();
      },
        (error) => {
          swal.fire('Error', 'Error creando oferta laboral', 'error')
        })
  }



}
