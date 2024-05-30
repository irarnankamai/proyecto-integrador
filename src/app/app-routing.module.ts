import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { VerificarCorreoComponent } from './components/verificar-correo/verificar-correo.component';
import { ListLibroComponent } from './components/list-libro/list-libro.component';
import { LibroComponent } from './components/libro/libro.component';
import { ListarUsuariosComponent } from './components/listar-usuarios/listar-usuarios.component';
import { ImagenComponent } from './components/imagen/imagen.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registrar-usuario', component: RegistrarUsuarioComponent },
  { path: 'editUsuario/:usuarioId', component: RegistrarUsuarioComponent },
  { path: 'verificar-correo', component: VerificarCorreoComponent },
  { path: 'recuperar-password', component: RecuperarPasswordComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'list-libro', component: ListLibroComponent},
  { path: 'libro', component: LibroComponent},
  { path: 'editLibro/:id', component: LibroComponent },
  { path: 'listar-usuarios', component: ListarUsuariosComponent },
  { path: 'imagen', component: ImagenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
