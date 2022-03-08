import swal from 'sweetalert2';
import { Categorias } from 'src/app/enums/categorias';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Capacitacion } from './../../models/Capacitacion';
import { Component, OnInit } from '@angular/core';
import { CapacitacionService } from 'src/app/services/capacitacion.service';

@Component({
  selector: 'app-capacitacion-update-modal',
  templateUrl: './capacitacion-update-modal.component.html',
  styleUrls: ['./capacitacion-update-modal.component.css']
})
export class CapacitacionUpdateModalComponent implements OnInit {

  capacitacion!: Capacitacion;
  category_array: string[] = new Array();
  newCategory!: string;

  constructor(public modalRef: MdbModalRef<CapacitacionUpdateModalComponent>, private capacitacionService: CapacitacionService) { }

  ngOnInit(): void {
    this.category_array = Object.values(Categorias)
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
    if (this.capacitacion.name == null) {
      swal.fire('Error al actualizar capacitación', 'Campo del nombre vacío', 'error')
      return;
    }
    if (this.capacitacion.description == null) {
      swal.fire('Error al actualizar capacitación', 'Campo de descripción vacío', 'error')
      return;
    }
    if (this.capacitacion.objetivo == null) {
      swal.fire('Error al actualizar capacitación', 'Campo de objetivo vacío', 'error')
      return;
    }
    if (this.capacitacion.dirigido == null) {
      swal.fire('Error al actualizar capacitación', 'Campo dirigido vacío', 'error')
      return;
    }
    if (this.capacitacion.contenido == null) {
      this.capacitacion.contenido = "No se especifica"
    }
    if (this.capacitacion.requisitos == null) {
      this.capacitacion.requisitos = "No se especifica"
    }
    if (this.capacitacion.facilitador == null) {
      this.capacitacion.facilitador = "No se especifica"
    }
    this.capacitacion.state = true;
    this.capacitacion.dateInit = new Date()
    if (this.capacitacion.dateFinish == null) {
      swal.fire('Error al actualizar capacitación', 'Especifique la fecha de vencimiento', 'error')
      return;
    }
    if (this.capacitacion.categoria == 'Otro') {
      if (this.newCategory != null) {
        this.capacitacion.categoria = this.newCategory;
      } else {
        swal.fire('Error al actualizar capacitación', 'Campo de categoría vacío', 'error')
        return
      }
    }
    if (this.capacitacion.modalidad == null) {
      this.capacitacion.modalidad = "Presencial"
    }
    if (this.capacitacion.contactos == null) {
      swal.fire('Error al actualizar capacitación', 'Campo de contactos para más información vacío', 'error')
      return
    }
    if (this.capacitacion.lugar == null) {
      swal.fire('Error al actualizar capacitación', 'Campo de lugar de la capacitación vacío', 'error')
      return
    }
    if (this.capacitacion.cupos == null) {
      this.capacitacion.cupos = "No se especifica"
    }
    this.capacitacionService.updateCapacitacion(this.capacitacion)
      .subscribe(() => {
        swal.fire('Actualizado', 'Capacitación actualizada con éxito', 'success')
        this.refresh();
      },
        (error) => {
          swal.fire('Error', 'Error actualizando capacitación', 'error')
        }
      )
  }

  stateSpanish(state: boolean): string {
    if (state) {
      return "Activar"
    } else {
      return "Desactivar"
    }
  }

}
