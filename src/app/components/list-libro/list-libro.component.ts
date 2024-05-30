import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LibroService } from 'src/app/services/libro.service';

@Component({
  selector: 'app-list-libro',
  templateUrl: './list-libro.component.html',
  styleUrls: ['./list-libro.component.css']
})
export class ListLibroComponent implements OnInit {

  libros: any[] = [];

  constructor(private _libroService: LibroService,    private afAuth: AngularFireAuth,
  
    private router: Router,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getLibros()
  }

  getLibros() {
    this._libroService.getLibros().subscribe(data => {
      this.libros = [];
      data.forEach((element: any) => {
        this.libros.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.libros);
    });
  }

  eliminarLibro(id: string) {
    this._libroService.eliminarLibro(id).then(() => {
      console.log('libro eliminado con exito');
      this.toastr.error('El libro fue eliminado con exito', 'Registro eliminado!', {
        positionClass: 'toast-bottom-right'
      });
    }).catch(error => {
      console.log(error);
    })
  }

  
  logOut() {
    this.afAuth.signOut().then(() => this.router.navigate(['/login']));
  }

}
