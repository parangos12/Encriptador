import { Component } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { EncryptedFileService } from '../encrypted-file.service';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.css']
})
export class DragAndDropComponent {

  encryptedFile: Blob | null = null;
  isDragOver: boolean = false;
  fileLoaded: boolean = false; // Variable para el mensaje "Archivo cargado"

  constructor(private encrypteFileService: EncryptedFileService) { }

  onDragOver(event: any) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
    this.isDragOver = true; // Mostrar el mensaje "Suelta aquí"
  }

  onDragLeave(event: any) {
    event.preventDefault();
    this.isDragOver = false; // Ocultar el mensaje "Suelta aquí"
  }

  onDrop(event: any) {
    event.preventDefault();
    this.isDragOver = false; // Ocultar el mensaje "Suelta aquí"

    const files: FileList = event.dataTransfer.files;
    if (files.length > 0) {
      this.processWordFiles(files); //Esto es lo que hace que se encripte el archivo
    }
  }

  async processWordFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const file: File | any = files.item(i);
      if (file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||file.type==='text/plain') {
        const wordContent = await this.readWordFile(file);
        const encryptedContent = CryptoJS.AES.encrypt(wordContent, 'clave_secreta').toString();
        const encryptedBlob = new Blob([encryptedContent], { type: 'text/plain' });
        const encryptedFile = new File([encryptedBlob], file.name, { type: 'text/plain' });
        this.encrypteFileService.setEncryptedFile(encryptedFile);
        this.fileLoaded = true; // Establecer la variable para mostrar "Archivo cargado"
      } else {
        window.alert("El archivo no es un documento de Word Válido: " + file.name);
      }
    }
  }

  readWordFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        resolve(event.target.result);
      };
      reader.onerror = (error: any) => {
        reject(error);
      };
      reader.readAsText(file);
    })
  }
}
