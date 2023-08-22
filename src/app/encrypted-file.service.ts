import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncryptedFileService {

  private encryptedFile: File | null = null;  

  setEncryptedFile(file: File|null) {
    this.encryptedFile = file;
  }

  getEncryptedFile(): File | null {
    return this.encryptedFile;
  }


}
