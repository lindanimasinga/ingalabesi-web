// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { StoreProfile } from '../app/model/models';

export var environment = {
  production: false,
  storeId: "77e2c029-3ea2-4a67-9722-603ff46d89e7",
  storeType: StoreProfile.StoreTypeEnum.FOOD,
  messengerId: "ffd4c856-644f-4453-a5ed-84689801a747",
  izingaUrl: "https://api-uat.izinga.co.za/",
  izingaPayUrl: "http://localhost:4201",
  appVersion: "1.0.0",
  range: 0.09999,
  firebaseVapidKey: '',
  yocoPublicKey: '',
  firebase_apiKey: "AIzaSyB1KhGf_VDF8VDUT0pNddLXB1Hls_dtR0U",
  authDomain: "ijudi-d19bd.firebaseapp.com",
  databaseURL: "https://ijudi-d19bd.firebaseio.com",
  projectId: "ijudi-d19bd",
  storageBucket: "ijudi-d19bd.appspot.com",
  messagingSenderId: "315529266651",
  appId: "1:315529266651:web:b28ea03f57c4d432ed53fe",
  measurementId: "G-ZJRDF78RJX"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
