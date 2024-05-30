
import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


import { Observable, of } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent  {
  registrarUsuarioForm!: FormGroup;
  editarUsuarioForm!: FormGroup;
  loading: boolean = false;
  usuarios$: Observable<any[]> = new Observable();
  usuarioParaEditar: any = null;
  
  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,  private afAuth: AngularFireAuth,
  
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
