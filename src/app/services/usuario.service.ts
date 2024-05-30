import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { FirebaseCodeErrorService } from './firebase-code-error.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
/*
  
    constructor(private afs: AngularFirestore) {}

    listarUsuarios(): Observable<any[]> {
      return this.afs.collection('usuarios').valueChanges();
    }
  
    editarUsuario(usuarioId: string, nuevoNombre: string, nuevoApellido: string, nuevoEmail: string) {
      return this.afs.collection('usuarios').doc(usuarioId).update({
        nombre: nuevoNombre,
        apellido: nuevoApellido,
        email: nuevoEmail
      });
    }
*/
constructor(
  private afAuth: AngularFireAuth,
  private afs: AngularFirestore,
  private toastr: ToastrService,
  private firebaseError: FirebaseCodeErrorService
) {}

registrarUsuario(nombre: string, apellido: string, email: string, password: string, repetirPassword: string): Promise<void> {
  if (password !== repetirPassword) {
    this.toastr.error('Las contraseñas ingresadas deben ser las mismas', 'Error');
    return Promise.reject('Las contraseñas ingresadas deben ser las mismas');
  }

  return this.afAuth.createUserWithEmailAndPassword(email, password)
    .then((credential) => {
      if (credential && credential.user) {
        return this.afs.collection('usuarios').doc(credential.user.uid).set({
          nombre,
          apellido,
          email
        });
      } else {
        throw new Error('Error: No se pudo obtener la credencial del usuario.');
      }
    })
    .then(() => this.verificarCorreo())
    .catch((error) => {
      this.toastr.error(this.firebaseError.codeError(error.code), 'Error');
      throw error;
    });
}

verificarCorreo(): Promise<void> {
  return this.afAuth.currentUser
    .then((user) => user?.sendEmailVerification())
    .then(() => {
      this.toastr.info('Le enviamos un correo electrónico para su verificación', 'Verificar correo');
    });
}

listarUsuarios(): Observable<any[]> {
  return this.afs.collection('usuarios').valueChanges({ idField: 'id' });
}

editarUsuario(id: string, nombre: string, apellido: string, email: string): Promise<void> {
  return this.afs.collection('usuarios').doc(id).update({
    nombre,
    apellido,
    email
  })
  .then(() => {
    this.toastr.success('Usuario actualizado correctamente');
  })
  .catch((error) => {
    this.toastr.error('Error al actualizar usuario');
    console.error('Error al actualizar usuario:', error);
    throw error;
  });
}

eliminarUsuario(id: string, nombre: string, apellido: string): Promise<void> {
  const confirmacion = confirm(`¿Estás seguro de que deseas eliminar a ${nombre} ${apellido}?`);
  if (!confirmacion) {
    return Promise.reject('Eliminación cancelada por el usuario');
  }

  return this.afs.collection('usuarios').doc(id).delete()
    .then(() => {
      this.toastr.success('Usuario eliminado correctamente');
    })
    .catch((error) => {
      this.toastr.error('Error al eliminar usuario');
      console.error('Error al eliminar usuario:', error);
      throw error;
    });
}
  
}
