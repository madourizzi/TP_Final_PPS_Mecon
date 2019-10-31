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
    this.productosCollection=db.collection<Producto>('Productos');
    this.productos = this.productosCollection.snapshotChanges().pipe(map(
      actions => actions.map(a=> {
        const data = a.payload.doc.data()as Producto;
        const id = a.payload.doc.id;
        return {id, data};
      })
    ));
  }

 
  crearProducto(nuevoProducto: Producto) {
    return this.db.collection('productos').add(JSON.parse(JSON.stringify(nuevoProducto)));

  }

  traerTodosProductos() {
    return this.db.collection('productos').snapshotChanges();
  }
  traerProductos() {
    this.productosCollection = this.db.collection<Producto>("SP_productos", ref => ref.orderBy('nombre', 'asc') );
    this.productos = this.productosCollection.valueChanges();
    return this.productos;
  }
  
  traerUnProducto(id) {
    return this.db.collection('productos').doc(id).valueChanges();
  }

  traerTodosLosProductosPorTipo(tipo) {
    return this.db.collection(tipo).snapshotChanges();
  }
  
  cambiarEstadoProducto(producto: Producto){
    return this.productosCollection.doc(producto.id).update(producto);
}
cargarProducto(productoAGuardarJSON: any){
  let id = this.db.createId();
  productoAGuardarJSON.id = id; 
  return this.db.collection<Producto>("productos").doc(id).set(productoAGuardarJSON);

}


}
