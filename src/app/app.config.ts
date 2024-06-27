import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-f760e","appId":"1:932007936635:web:9edc0fc45723da690358de","storageBucket":"ring-of-fire-f760e.appspot.com","apiKey":"AIzaSyAoanPtTlMmHP2aYiw850x3yWDl97iv9jQ","authDomain":"ring-of-fire-f760e.firebaseapp.com","messagingSenderId":"932007936635"})), provideFirestore(() => getFirestore())]
};
