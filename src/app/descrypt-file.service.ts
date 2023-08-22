import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DescryptFileService {

  private desencryptedFile: File | null = null; 
  
  setdesEncryptedFile(file: File | null) {
    this.desencryptedFile = file;
  }

  getdesEncryptedFile(): File | null {
    return this.desencryptedFile;
  }
}
