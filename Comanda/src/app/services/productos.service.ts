import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private productosCollection: AngularFirestoreCollection<any>;
  productos: Observable<any[]>;

  constructor(
    private db: AngularFirestore,

  ) {
    this.productosCollection = db.collection<Producto>('Producto');
    this.productos = this.productosCollection.snapshotChanges().pipe(map(
      actions => actions.map(a => {
        const data = a.payload.doc.data() as Producto;
        const id = a.payload.doc.id;
        return { id, data };
      })
    ));
  }


  crearProducto(nuevoProducto: Producto) {
    let id = this.db.createId();
    nuevoProducto.uid = id;
    return this.db.collection('producto').doc(id).set(JSON.parse(JSON.stringify(nuevoProducto)), { merge: true });
  

  }

  traerTodosProductos() {
   
    return this.db.collection('producto', ref => ref.orderBy('tipo','asc')).snapshotChanges();
  }


  traerUnProducto(id) {
    return this.db.collection('producto').doc(id).valueChanges();
  }


  cambiarEstadoProducto(producto: Producto) {
    return this.productosCollection.doc(producto.uid).update(producto);
  }

  cargarProducto(productoAGuardarJSON: any) {
    let id = this.db.createId();
    productoAGuardarJSON.id = id;
    return this.db.collection<Producto>("productos").doc(id).set(productoAGuardarJSON);

  }


}
