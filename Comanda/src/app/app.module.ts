import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { firebaseConfig } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SmartAudioService } from './services/smart-audio.service';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { AngularFirestore } from '@angular/fire/firestore';
import { Camera } from '@ionic-native/camera/ngx';
import { AngularFireDatabase } from '@angular/fire/database';
import { Base64 } from '@ionic-native/base64/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SpinnerInterceptor } from './services/interceptors/spinner-interceptor';
import { Shake } from '@ionic-native/shake/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ArchivosService } from './services/archivos.service';
import { File } from '@ionic-native/file/ngx';
import { AngularFireStorageModule, AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { FcmService } from '../app/services/fcm.service';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { EstadosMesaPipePipe } from './services/directivaPipes/estados-mesa-pipe.pipe';
import { ColoresEstadoMesaDirective } from './services/directivaPipes/colores-estado-mesa.directive';
import { AreasPipePipe } from './services/directivaPipes/areas-pipe.pipe';
import { MemoriaVisualComponent } from './juegos/componentes/memoria-visual/memoria-visual.component';
import { PiedraPapelTijeraComponent } from './juegos/componentes/piedra-papel-tijera/piedra-papel-tijera.component';
import { TatetiComponent } from './juegos/componentes/tateti/tateti.component';
import { JuegosComponent } from './juegos/componentes/juegos/juegos.component';
import { ColoresListaComponent } from './juegos/componentes/colores-lista/colores-lista.component';
import { ColoresMenuComponent } from './juegos/componentes/colores-menu/colores-menu.component';
import { DatoMesaPipe } from './services/directivaPipes/dato-mesa.pipe';

@NgModule({
  declarations: [
    AppComponent,
    EstadosMesaPipePipe,
    JuegosComponent,
    MemoriaVisualComponent,
    PiedraPapelTijeraComponent,
    TatetiComponent,
    ColoresListaComponent,
    ColoresMenuComponent,
    
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({ animated: false }),
    AppRoutingModule,
    ComponentsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, AngularFireStorageModule,
  ],
  providers: [
    StatusBar, BarcodeScanner, ArchivosService, File,
    SplashScreen,
    SmartAudioService,
    NativeAudio,
    Vibration,
    AngularFirestore,
    AngularFireDatabase,
    Base64,
    Camera,
    ImagePicker,
    Shake,
    FcmService,
    FirebaseX,
    EmailComposer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
