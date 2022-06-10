import swal from 'sweetalert2';
import { Aliado } from './../../../models/aliado';
import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AliadoService } from 'src/app/services/aliado.service';
import { v4 as uuid } from 'uuid';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-aliados-modal',
  templateUrl: './aliados-modal.component.html',
  styleUrls: ['./aliados-modal.component.css']
})
export class AliadosModalComponent implements OnInit {

  aliado: Aliado = new Aliado();
  progress: number = 0;
  selectedFiles?: FileList;
  file?: File;

  constructor(public modalRef: MdbModalRef<AliadosModalComponent>, private aliadoService: AliadoService) { }

  ngOnInit(): void {

  }

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }

  close(): void {
    this.modalRef.close()
  }

  refresh(): void {
    window.location.reload();
  }

  public send(): void {
    if (this.aliado.name == null) {
      swal.fire('Error al crear aliado', 'Campo del nombre vacío', 'error')
    }
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.aliado.idAliado = uuid().toString();
        this.aliado.logo = "";
        this.file = file;
        this.aliadoService.save_aliado(this.aliado, file)
          .subscribe((event: HttpEvent<any>) => {
            switch (event.type) {
              case HttpEventType.Sent:
                console.log('Request has been made!');
                break;
              case HttpEventType.ResponseHeader:
                console.log('Response header has been received!');
                break;
              case HttpEventType.UploadProgress:
                console.log(event.total)
                this.progress = Math.round(event.loaded / event.total! * 100);
                console.log(`Uploaded! ${this.progress}%`);
                break;
              case HttpEventType.Response:
                console.log('User successfully created!', event.body);
                swal.fire('Usuario registrado', 'Usuario registrado con éxito', 'success')
                setTimeout(() => {
                  this.progress = 0;
                }, 1500);
            }
          }, err => {
            if (err.status == 500) {
              swal.fire('Error al cargar hoja de vida', 'Consulte al administrador', 'error')
            }
          });
        this.ngOnInit();
      } else {
        swal.fire('Error al registrar hoja de vida', 'No ha cargado el formulario de hoja de vida', 'error');
        this.file = undefined;
      }
    } else {
      swal.fire('Error al registrar hoja de vida', 'No ha cargado el formulario de hoja de vida', 'error');
      this.selectedFiles = undefined;
    }
  }
}
