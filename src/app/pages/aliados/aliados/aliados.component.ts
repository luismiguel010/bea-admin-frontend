import { AliadosModalComponent } from './../../../modals/aliados-modal/aliados-modal/aliados-modal.component';
import { Component, OnInit } from '@angular/core';
import { Aliado } from 'src/app/models/aliado';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AliadoService } from 'src/app/services/aliado.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-aliados',
  templateUrl: './aliados.component.html',
  styleUrls: ['./aliados.component.css']
})
export class AliadosComponent implements OnInit {

  aliados: Aliado[] = [];
  modalRef!: MdbModalRef<AliadosModalComponent>;

  constructor(private modalService: MdbModalService, private aliadoService: AliadoService) { }

  openModalCreateAliados() {
    this.modalRef = this.modalService.open(AliadosModalComponent);
  }

  deleteAliado(idAliado: string) {
    this.aliadoService.deleteAliado(idAliado)
      .subscribe(
        () => {
          swal.fire('Eliminado', 'Se eliminó correctamente el aliado', 'success');
        },
        (error) => {
          swal.fire('Error', 'Error al eliminar aliado', 'error')
        }
      )
  }

  ngOnInit(): void {
    this.aliadoService.getAllAliado()
      .subscribe(
        (aliados) => {
          this.aliados = aliados;
        },
        (error) => {
          swal.fire('Error', 'Error obteniendo lista de aliados', 'error')
        }
      )
  }

}
