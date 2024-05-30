import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of, switchMap } from 'rxjs';
import 'firebase/compat/auth';

import { UsuarioService } from 'src/app/services/usuario.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css'],
})
export class RegistrarUsuarioComponent implements OnInit {
/*
registrarUsuario!: FormGroup;
loading: boolean = false;
usuarios$: Observable<any[]> = of([]); 

constructor(
  private fb: FormBuilder,
  private afAuth: AngularFireAuth,
  private afs: AngularFirestore,
  private toastr: ToastrService,
  private router: Router,
  private firebaseError: FirebaseCodeErrorService
) {}

ngOnInit(): void {
  this.registrarUsuario = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    repetirPassword: ['', Validators.required],
  });
  this.listarUsuarios();  // Llama a listarUsuarios al inicializar el componente
}

registrar() {
  const nombre = this.registrarUsuario.value.nombre;
  const apellido = this.registrarUsuario.value.apellido;
  const email = this.registrarUsuario.value.email;
  const password = this.registrarUsuario.value.password;
  const repetirPassword = this.registrarUsuario.value.repetirPassword;

  if (password !== repetirPassword) {
    this.toastr.error('Las contraseñas ingresadas deben ser las mismas', 'Error');
    return;
  }

  this.loading = true;
  this.afAuth
    .createUserWithEmailAndPassword(email, password)
    .then((credential) => {
      if (credential && credential.user) {
        return this.afs.collection('usuarios').doc(credential.user.uid).set({
          nombre: nombre,
          apellido: apellido,
          email: email,
          
        });
      } else {
        throw new Error('Error: No se pudo obtener la credencial del usuario.');
      }
    })
    .then(() => {
      this.verificarCorreo();
    })
    .catch((error) => {
      this.loading = false;
      this.toastr.error(this.firebaseError.codeError(error.code), 'Error');
    });
}

verificarCorreo() {
  this.afAuth.currentUser
    .then((user) => user?.sendEmailVerification())
    .then(() => {
      this.toastr.info(
        'Le enviamos un correo electrónico para su verificación',
        'Verificar correo'
      );
      this.router.navigate(['/login']);
    });
}

listarUsuarios() {
  this.usuarios$ = this.afs.collection('usuarios').valueChanges();
}

editarUsuario(usuarioId: string, nuevoNombre: string, nuevoApellido: string, nuevoEmail: string) {
  return this.afs.collection('usuarios').doc(usuarioId).update({
    nombre: nuevoNombre,
    apellido: nuevoApellido,
    email: nuevoEmail
  });
}
*/


/*
registrarUsuario!: FormGroup;
editarUsuarioForm!: FormGroup;
loading: boolean = false;
usuarios$: Observable<any[]> = of([]);
usuarioParaEditar: any = null;

constructor(
  private fb: FormBuilder,
  private afAuth: AngularFireAuth,
  private afs: AngularFirestore,
  private toastr: ToastrService,
  private router: Router,
  private firebaseError: FirebaseCodeErrorService
) {}

ngOnInit(): void {
  this.registrarUsuario = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    repetirPassword: ['', Validators.required],
  });

  this.editarUsuarioForm = this.fb.group({
    id: [''],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  this.listarUsuarios();
}

registrar() {
  const { nombre, apellido, email, password, repetirPassword } = this.registrarUsuario.value;

  if (password !== repetirPassword) {
    this.toastr.error('Las contraseñas ingresadas deben ser las mismas', 'Error');
    return;
  }

  this.loading = true;
  this.afAuth.createUserWithEmailAndPassword(email, password)
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
      this.loading = false;
      this.toastr.error(this.firebaseError.codeError(error.code), 'Error');
    });
}

verificarCorreo() {
  this.afAuth.currentUser
    .then((user) => user?.sendEmailVerification())
    .then(() => {
      this.toastr.info('Le enviamos un correo electrónico para su verificación', 'Verificar correo');
      this.router.navigate(['/login']);
    });
}

listarUsuarios() {
  this.usuarios$ = this.afs.collection('usuarios').valueChanges({ idField: 'id' });
}

editar(usuario: any) {
  this.usuarioParaEditar = usuario;
  this.editarUsuarioForm.patchValue({
    id: usuario.id,
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    email: usuario.email
  });
}

guardarEdicion() {
  const { id, nombre, apellido, email } = this.editarUsuarioForm.value;
  this.afs.collection('usuarios').doc(id).update({
    nombre,
    apellido,
    email
  })
  .then(() => {
    this.toastr.success('Usuario actualizado correctamente');
    this.usuarioParaEditar = null;
  })
  .catch((error) => {
    this.toastr.error('Error al actualizar usuario');
    console.error('Error al actualizar usuario:', error);
  });
}

eliminar(usuario: any) {
  const confirmacion = confirm(`¿Estás seguro de que deseas eliminar a ${usuario.nombre} ${usuario.apellido}?`);
  if (confirmacion) {
    this.afs.collection('usuarios').doc(usuario.id).delete()
      .then(() => {
        this.toastr.success('Usuario eliminado correctamente');
      })
      .catch((error) => {
        this.toastr.error('Error al eliminar usuario');
        console.error('Error al eliminar usuario:', error);
      });
  }
}*/


registrarUsuarioForm!: FormGroup;
editarUsuarioForm!: FormGroup;
loading: boolean = false;
usuarios$: Observable<any[]> = new Observable();
usuarioParaEditar: any = null;

constructor(
  private fb: FormBuilder,
  private usuarioService: UsuarioService,
  private afAuth: AngularFireAuth,
    private router: Router
) {}

ngOnInit(): void {
  this.registrarUsuarioForm = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    repetirPassword: ['', Validators.required],
  });

  this.editarUsuarioForm = this.fb.group({
    id: [''],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  this.listarUsuarios();
}

registrar() {
  const { nombre, apellido, email, password, repetirPassword } = this.registrarUsuarioForm.value;

  this.loading = true;
  this.usuarioService.registrarUsuario(nombre, apellido, email, password, repetirPassword)
    .finally(() => this.loading = false);
}

listarUsuarios() {
  this.usuarios$ = this.usuarioService.listarUsuarios();
}

editar(usuario: any) {
  this.usuarioParaEditar = usuario;
  this.editarUsuarioForm.patchValue({
    id: usuario.id,
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    email: usuario.email
  });
}

guardarEdicion() {
  const { id, nombre, apellido, email } = this.editarUsuarioForm.value;
  this.usuarioService.editarUsuario(id, nombre, apellido, email)
    .then(() => this.usuarioParaEditar = null);
}

eliminar(usuario: any) {
  this.usuarioService.eliminarUsuario(usuario.id, usuario.nombre, usuario.apellido);
}


logOut() {
  this.afAuth.signOut().then(() => this.router.navigate(['/login']));
}

}


