import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LibroService } from 'src/app/services/libro.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})
export class LibroComponent implements OnInit {

 
    createLibro: FormGroup;
    submitted = false;
    loading = false;
    id: string | null;
    titulo = 'Agregar Libro';
  
    constructor(private fb: FormBuilder,
      private afAuth: AngularFireAuth,
      private _libroService: LibroService,
      private router: Router,
      private toastr: ToastrService,
      private aRoute: ActivatedRoute) {
      this.createLibro = this.fb.group({
        titulo: ['', Validators.required],
        autor: ['', Validators.required],
        genero: ['', Validators.required],
        ejemplar: ['', Validators.required]
      })
      this.id = this.aRoute.snapshot.paramMap.get('id');
      console.log(this.id)
    }
  
    ngOnInit(): void {
      this.esEditar();
    }
  
    agregarEditarLibro() {
      this.submitted = true;
  
      if (this.createLibro.invalid) {
        return;
      }
  
      if (this.id === null) {
        this.agregarLibro();
      } else {
        this.editarLibro(this.id);
      }
  
    }
  
    agregarLibro() {
      const libro: any = {
        titulo: this.createLibro.value.titulo,
        autor: this.createLibro.value.autor,
        genero: this.createLibro.value.genero,
        ejemplar: this.createLibro.value.ejemplar,
        fechaCreacion: new Date(),
        fechaActualizacion: new Date()
      }
      this.loading = true;
      this._libroService.agregarLibro(libro).then(() => {
        this.toastr.success('El libro fue registrado con exito!', 'Libro Registrado', {
          positionClass: 'toast-bottom-right'
        });
        this.loading = false;
        this.router.navigate(['/list-libro']);
      }).catch(error => {
        console.log(error);
        this.loading = false;
      })
    }
  
    editarLibro(id: string) {
  
      const libro: any = {
        titulo: this.createLibro.value.titulo,
        autor: this.createLibro.value.autor,
        genero: this.createLibro.value.genero,
        ejemplar: this.createLibro.value.ejemplar,    
        fechaActualizacion: new Date()
      }
  
      this.loading = true;
  
      this._libroService.actualizarLibro(id, libro).then(() => {
        this.loading = false;
        this.toastr.info('El libro fue modificado con exito', 'Libro modificado', {
          positionClass: 'toast-bottom-right'
        })
        this.router.navigate(['/list-libro']);
      })
    }
  
  
    esEditar() {
      this.titulo = 'Editar Libro'
      if (this.id !== null) {
        this.loading = true;
        this._libroService.getLibro(this.id).subscribe(data => {
          this.loading = false;
          this.createLibro.setValue({
            titulo: data.payload.data()['titulo'],
            autor: data.payload.data()['autor'],
            genero: data.payload.data()['genero'],
            ejemplar: data.payload.data()['ejemplar'],
          })
        })
      }
    }

    logOut() {
      this.afAuth.signOut().then(() => this.router.navigate(['/login']));
    }
  
  }

