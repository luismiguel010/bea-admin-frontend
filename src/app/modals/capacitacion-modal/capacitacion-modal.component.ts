import swal from 'sweetalert2';
import { Categorias } from 'src/app/enums/categorias';
import { CapacitacionService } from './../../services/capacitacion.service';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Capacitacion } from './../../models/Capacitacion';
import { v4 as uuid } from 'uuid';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-capacitacion-modal',
  templateUrl: './capacitacion-modal.component.html',
  styleUrls: ['./capacitacion-modal.component.css']
})
export class CapacitacionModalComponent implements OnInit {

  capacitacion: Capacitacion = new Capacitacion();
  category_array: string[] = new Array();
  newCategory!: string;

  constructor(public modalRef: MdbModalRef<CapacitacionModalComponent>, private capacitacionService: CapacitacionService) { }

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
    this.capacitacion.idCapacitacion = uuid().toString();
    if (this.capacitacion.name == null) {
      swal.fire('Error al crear capacitación', 'Campo del nombre vacío', 'error')
      return;
    }
    if (this.capacitacion.description == null) {
      swal.fire('Error al crear capacitación', 'Campo de descripción vacío', 'error')
      return;
    }
    if (this.capacitacion.objetivo == null) {
      swal.fire('Error al crear capacitación', 'Campo de objetivo vacío', 'error')
      return;
    }
    if (this.capacitacion.dirigido == null) {
      swal.fire('Error al crear capacitación', 'Campo dirigido vacío', 'error')
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
      swal.fire('Error al crear capacitación', 'Especifique la fecha de vencimiento', 'error')
      return;
    }
    if (this.capacitacion.categoria == 'Otro') {
      if (this.newCategory != null) {
        this.capacitacion.categoria = this.newCategory;
      } else {
        swal.fire('Error al crear capacitación', 'Campo de categoría vacío', 'error')
        return
      }
    }
    if (this.capacitacion.modalidad == null) {
      this.capacitacion.modalidad = "Presencial"
    }
    if (this.capacitacion.contactos == null) {
      swal.fire('Error al crear capacitación', 'Campo de contactos para más información vacío', 'error')
      return
    }
    if (this.capacitacion.lugar == null) {
      swal.fire('Error al crear capacitación', 'Campo de lugar de la capacitación vacío', 'error')
      return
    }
    if (this.capacitacion.cupos == null) {
      this.capacitacion.cupos = "No se especifica"
    }
    this.capacitacionService.createCapacitacion(this.capacitacion)
      .subscribe(() => {
        swal.fire('Creada', 'Capacitación publicada con éxito', 'success')
        this.refresh();
      },
        (error) => {
          swal.fire('Error', 'Error publicando capacitación', 'error')
        }
      )

  }

}
