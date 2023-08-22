import { Component } from '@angular/core';
import { DescryptFileService } from '../descrypt-file.service';

@Component({
  selector: 'app-desencriptar',
  templateUrl: './desencriptar.component.html',
  styleUrls: ['./desencriptar.component.css']
})
export class DesencriptarComponent {

  constructor(private descryptedFileService: DescryptFileService) { }

  desencriptado = false;
  prueba = "Desencriptar";
  btnDownload = false;
  btnDecrypt = true;

  changeButton() {
    const decryptedFile = this.descryptedFileService.getdesEncryptedFile();
    if (!decryptedFile) {
      window.alert("No has subido un archivo para desencriptar. Sube un archivo para desencriptar, por favor.");
    } else {
      this.btnDownload = true;
      this.btnDecrypt = false;
    }
  }

  async downloadDecryptedFile() {
    const decryptedFile = this.descryptedFileService.getdesEncryptedFile();
    
    if (decryptedFile) {
      // Lee el contenido del archivo desencriptado
      const decryptedContent = await this.readBlobAsText(decryptedFile);
      console.log(decryptedContent)
      // Divide el contenido desencriptado en líneas o párrafos (por ejemplo, en líneas)
      const lines = decryptedContent.split('\n');

      // Crea un nuevo Blob con las líneas de contenido desencriptado
      const blob = new Blob(lines, { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });

      // Crea una URL para el Blob
      const url = URL.createObjectURL(blob);

      // Crea un enlace de descarga y simula un clic para descargar el archivo
      const a = document.createElement('a');
      a.href = url;
      a.download = 'archivo_desencriptado.txt';
      a.click();

      // Limpia la URL del objeto Blob
      URL.revokeObjectURL(url);
      this.desencriptado = true;
      this.prueba = "Descargar";
    } else {
      window.alert("No has subido un archivo para desencriptar. Sube un archivo para desencriptar, por favor.");
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

  decrypt() {
    //this.desencriptado = false;
    window.alert("Desencriptar");
  }
}
