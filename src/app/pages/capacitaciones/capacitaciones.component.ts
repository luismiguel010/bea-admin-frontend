import swal from 'sweetalert2';
import { CapacitacionService } from './../../services/capacitacion.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Capacitacion } from './../../models/Capacitacion';
import { Component, OnInit } from '@angular/core';
import { CapacitacionModalComponent } from 'src/app/modals/capacitacion-modal/capacitacion-modal.component';
import { CapacitacionUpdateModalComponent } from 'src/app/modals/capacitacion-update-modal/capacitacion-update-modal.component';

@Component({
  selector: 'app-capacitaciones',
  templateUrl: './capacitaciones.component.html',
  styleUrls: ['./capacitaciones.component.css']
})
export class CapacitacionesComponent implements OnInit {

  capacitaciones: Capacitacion[] = [];
  modalRef!: MdbModalRef<CapacitacionModalComponent>;

  constructor(private modalService: MdbModalService, private capacitacionService: CapacitacionService) { }

  openModalUpdateCapacitacion(capacitacion: Capacitacion) {
    this.modalRef = this.modalService.open(CapacitacionUpdateModalComponent, {
      data: { capacitacion }
    });
  }

  openModalCreateCapacitacion() {
    this.modalRef = this.modalService.open(CapacitacionModalComponent);
  }


  ngOnInit(): void {
    this.capacitacionService.getAllCapacitaciones()
      .subscribe(
        (capacitaciones) => {
          this.capacitaciones = capacitaciones;
        },
        (error) => {
          swal.fire('Error', 'Error obteniendo lista de capacitaciones', 'error')
        }
      )
  }

  stateSpanish(state: boolean): string {
    if (state) {
      return "Activo"
    } else {
      return "Desactivado"
    }
  }

  deleteCapacitacion(idCapacitacion: string) {
    this.capacitacionService.deleteCapacitacion(idCapacitacion)
      .subscribe(
        () => {
          swal.fire('Eliminado', 'Se eliminó correctamente la capacitación', 'success');
        },
        (error) => {
          swal.fire('Error', 'Error al eliminar capacitación', 'error')
        }
      )
  }

}
