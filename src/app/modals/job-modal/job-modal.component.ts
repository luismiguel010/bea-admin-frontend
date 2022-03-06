import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Categorias } from 'src/app/enums/categorias';
import { Job } from 'src/app/models/Job';
import { JobService } from 'src/app/services/job.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-job-modal',
  templateUrl: './job-modal.component.html',
  styleUrls: ['./job-modal.component.css']
})
export class JobModalComponent implements OnInit {

  job!: Job;
  category_array: string[] = new Array();
  newCategory!: string;

  constructor(public modalRef: MdbModalRef<JobModalComponent>, private jobService: JobService) { }

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
    console.log(this.job.dateFinish.toString.length)
    if (this.job.name == null) {
      swal.fire('Error al actualizar oferta', 'Campo del nombre vacío', 'error')
      return;
    }
    if (this.job.description == null) {
      swal.fire('Error al actualizar oferta', 'Campo de descripción vacío', 'error')
      return;
    }
    if (this.job.category == 'Otro') {
      if (this.newCategory != null) {
        this.job.category = this.newCategory;
      } else {
        swal.fire('Error al actualizar oferta', 'Campo de categoría vacío', 'error')
        return
      }
    }
    if (this.job.dateFinish == null) {
      swal.fire('Error al actualizar oferta', 'Especifique fecha de vencimiento', 'error')
      return
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
    this.jobService.updateJob(this.job)
      .subscribe(() => {
        swal.fire('Actualizado', 'Oferta laboral actualizada con éxito', 'success')
        this.refresh();
      },
        (error) => {
          swal.fire('Error', 'Error actualizando oferta laboral', 'error')
        })
  }

  stateSpanish(state: boolean): string {
    if (state) {
      return "Activar"
    } else {
      return "Desactivar"
    }
  }



}
