import { Component, OnInit } from '@angular/core';

import { Observable, finalize } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-imagen',
  templateUrl: './imagen.component.html',
  styleUrls: ['./imagen.component.css']
})
export class ImagenComponent  {
  image: File | null = null;
  imageName: string = '';
  imageUrl: string = '';
  items: Observable<any[]>;

  constructor(
    private storage: AngularFireStorage,
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.items = firestore.collection('images').valueChanges({ idField: 'id' });
  }

  uploadImage() {
    if (this.image && this.isImageFile(this.image.type)) { // Verificar si es una imagen
      const imageName = this.imageName || this.image.name;
      const filePath = `images/${imageName}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.image);

      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.imageUrl = url;
            this.firestore.collection('images').add({ url, name: imageName });
            this.imageName = '';
            this.image = null;
            alert('Imagen guardada exitosamente'); // Mostrar mensaje de aviso
          });
        })
      ).subscribe();
    } else {
      alert('Por favor seleccione un archivo de imagen válido.'); // Mostrar mensaje de aviso
    }
  }

  deleteImage(itemId: string) {
    this.firestore.collection('images').doc(itemId).delete()
      .then(() => alert('Imagen eliminada exitosamente')) // Mostrar mensaje de aviso
      .catch(error => console.error("Error al eliminar la imagen:", error));
  }

  onSelectFile(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.image = inputElement.files[0];
    }
  }

  logOut() {
    this.afAuth.signOut().then(() => this.router.navigate(['/login']));
  }

  // Función para verificar si el archivo es una imagen
  private isImageFile(type: string): boolean {
    return type.startsWith('image/');
  }
}

