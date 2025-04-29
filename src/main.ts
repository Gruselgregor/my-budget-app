import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { addIcons } from 'ionicons';
import { defineCustomElements } from 'jeep-sqlite/loader';
import { add, addCircle, addOutline } from 'ionicons/icons';
import { Capacitor } from '@capacitor/core';

addIcons({ add, addCircle, addOutline }); 


const isWeb = Capacitor.getPlatform() === 'web';

if (isWeb) {
  defineCustomElements(window);
}

defineCustomElements(window);

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
