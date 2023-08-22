import { Component } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { DescryptFileService } from '../descrypt-file.service';

@Component({
  selector: 'app-drag-and-drop-descrypt',
  templateUrl: './drag-and-drop-descrypt.component.html',
  styleUrls: ['./drag-and-drop-descrypt.component.css']
})
export class DragAndDropDescryptComponent {
  decryptedFile: Blob | null = null;
  isDragOver: boolean = false;
  fileLoaded: boolean = false;

  constructor(private decryptFileService: DescryptFileService) { }

  onDragOver(event: any) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
    this.isDragOver = true;
  }

  onDragLeave(event: any) {
    event.preventDefault();
    this.isDragOver = false;
    console.log("Gello")
  }

  onDrop(event: any) {
    event.preventDefault();
    this.isDragOver = false;

    const files2: FileList = event.dataTransfer.files;
    console.log(files2.length);
    if (files2.length == 0) {
      console.log(files2.length)
      window.alert("No has subido un archivo para desencriptar. Sube un archivo para desencriptar, por favor.");
    }
    
    if (files2.length > 0) {
      console.log(files2.length)
      this.processDecryption(files2);
    }
  }

  async processDecryption(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const file: File | any = files.item(i);
      if (file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'||file.type==='text/plain') { // Supongamos que se espera un archivo de texto plano
        const encryptedContent = await this.readEncryptedFile(file);
        const decryptedContent = CryptoJS.AES.decrypt(encryptedContent, 'clave_secreta').toString(CryptoJS.enc.Utf8);
        const decryptedBlob = new Blob([decryptedContent], { type: 'text/plain' });
        const decryptedFile = new File([decryptedBlob], file.name, { type: 'text/plain' });
        this.decryptFileService.setdesEncryptedFile(decryptedFile);
        this.fileLoaded = true;
      } else {
        window.alert("El archivo no es válido para desencriptar: " + file.name);
      }
    }
  }

  readEncryptedFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        resolve(event.target.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsText(file);
    });
  }
}
