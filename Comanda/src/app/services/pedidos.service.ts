import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pedido } from '../models/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private pedidosCollection: AngularFirestoreCollection<any>;
  pedidos: Observable<any[]>;
  

  constructor(
    private db: AngularFirestore) {

    this.pedidosCollection = db.collection<Pedido>('pedidos');
    this.pedidos = this.pedidosCollection.snapshotChanges().pipe(map(
      actions => actions.map(a => {
        const data = a.payload.doc.data() as Pedido;
        const id = a.payload.doc.id;
        return { id, data };
      })
    ));
  }


  crearPedido(nuevoPedido: Pedido) {
    let id = this.db.createId();
    nuevoPedido.uid = id;
    return this.db.collection('pedidos').doc(id).set(JSON.parse(JSON.stringify(nuevoPedido)), { merge: true });

  }

  traerTodosPedidos() {
    return this.db.collection('pedidos').snapshotChanges();
  }

  traerUnPedido(id) {
    return this.db.collection('pedidos').doc(id).valueChanges();
  }

  traerTodosLosPedidosPorTipo(tipo) {
    return this.db.collection(tipo).snapshotChanges();
  }

  cambiarEstadoPedido(pedido: Pedido) {
    return this.pedidosCollection.doc(pedido.uid).update(pedido);
  }

  actualizarUnPedido(idPedido: string) {
    let pedidoActualizar = this.db.collection<Pedido>("pedidos").doc(idPedido);
    return pedidoActualizar;
  }

  TraerPedidos()
  {
    this.pedidosCollection = this.db.collection<Pedido>("pedidos");
    this.pedidos= this.pedidosCollection.valueChanges();
    return this.pedidos;
   
  }

 async AceptarPedido(pedido: Pedido)
  {
    pedido.estado="pendiente";
    
    this.db.collection("pedidos").doc(pedido.uid).set(pedido).then(() => {
            
    
      console.log('Documento editado exitósamente');

    }, (error) => {
      console.log(error);
    });

  }

  async CancelarPedido(pedido: Pedido)
  {
    pedido.estado="cancelado";
    
    this.db.collection("pedidos").doc(pedido.uid).set(pedido).then(() => {    
    
      console.log('Documento editado exitósamente');

    }, (error) => {
      console.log(error);
    });

  }


  async Cobrar(pedido: Pedido)
  {
    pedido.estado="pagado";    
    this.db.collection("pedidos").doc(pedido.uid).set(pedido).then(() => {  
      console.log('Documento editado exitósamente');
    }, (error) => {
      console.log(error);
    });
  }

 async ServirPedido(pedido: Pedido)
  {
    pedido.estado="entregado";    
    this.db.collection("pedidos").doc(pedido.uid).set(pedido).then(() => { 
      console.log('Documento editado exitósamente');
    }, (error) => {
      console.log(error);
    });
  }
}
