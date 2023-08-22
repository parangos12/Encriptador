import { Component } from '@angular/core';
import { EncryptedFileService } from '../encrypted-file.service';

@Component({
  selector: 'app-encriptar',
  templateUrl: './encriptar.component.html',
  styleUrls: ['./encriptar.component.css']
})
export class EncriptarComponent {

  constructor(private encryptedFileService: EncryptedFileService) { }
  encriptado = false;
  prueba = "Encriptar"
  btnDownload = false;
  btnEncrypt = true;

  changeButton() {
    const encryptedFile = this.encryptedFileService.getEncryptedFile();
    if (!encryptedFile) {
      window.alert("No haz subido un archivo para encriptar. Sube un archivo a encriptar por favor ");
    } else {
      this.btnDownload = true
      this.btnEncrypt = false;

    }
  }

  async downloadEncryptedFile() {
    const encryptedFile = this.encryptedFileService.getEncryptedFile();
    if (encryptedFile) {
      // Lee el contenido del archivo encriptado
      const encryptedContent = await this.readBlobAsText(encryptedFile);

      // Divide el contenido encriptado en líneas o párrafos (por ejemplo, en líneas)
      const lines = encryptedContent.split('\n');

      // Crea un nuevo Blob con las líneas de contenido encriptado
      const blob = new Blob(lines, { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });

      // Crea una URL para el Blob
      const url = URL.createObjectURL(blob);

      // Crea un enlace de descarga y simula un clic para descargar el archivo
      const a = document.createElement('a');
      a.href = url;
      a.download = 'archivo_encriptado.txt';
      a.click();

      // Limpia la URL del objeto Blob
      URL.revokeObjectURL(url);
      this.encriptado = true;
      this.prueba="Descargar"
    } else {
      window.alert("No haz subido un archivo para encriptar. Sube un archivo a encriptar por favor ");
    }
    
  }

  async readBlobAsText(blob: Blob): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        resolve(event.target.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsText(blob);
    });
  }

  encrypt() {
    //this.desencriptado = false;
    window.alert("Encriptar");
  }
}
