import admin from 'firebase-admin';
//import path from 'path';

const serviceAccount = require('./../../serviceAccountKey.json');

// Inicializa Firebase Admin solo una vez
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    //storageBucket: process.env.FIREBASE_STORAGE_BUCKET
  });
}

// Accesos directos
const db = admin.firestore();
const auth = admin.auth();
//const bucket = admin.storage().bucket();

export { admin, db, auth };
