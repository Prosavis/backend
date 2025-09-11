import { db, admin } from "../config/firebaseAdmin";

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  disabled: boolean;
  metadata: admin.auth.UserMetadata;
  isActive?: boolean; // campo Firestore
  isVerified?: boolean; // campo Firestore
  role?: string;      // campo Firestore
}

export const getAllUsers = async (): Promise<User[]> => {
  // 1️⃣ Listar usuarios desde Firebase Auth
  const authResult = await admin.auth().listUsers(1000); 
  const authUsers = authResult.users;

  // 2️⃣ Obtener todos los documentos de usuarios de Firestore en batch
  const userIds = authUsers.map(u => u.uid);
  const userDocsSnapshot = await db.collection('users')
    .where(admin.firestore.FieldPath.documentId(), 'in', userIds)
    .get();

  // 3️⃣ Crear un mapa uid -> datos de Firestore
  const firestoreDataMap: Record<string, any> = {};
  userDocsSnapshot.docs.forEach(doc => {
    firestoreDataMap[doc.id] = doc.data();
  });

  // 4️⃣ Combinar datos de Auth + Firestore
  const getUsers: User[] = authUsers.map(userRecord => {
    const firestoreData = firestoreDataMap[userRecord.uid] || {};
    return {
      uid: userRecord.uid,
      email: userRecord.email ?? null,
      displayName: userRecord.displayName ?? null,
      photoURL: userRecord.photoURL ?? null,
      disabled: userRecord.disabled,
      metadata: userRecord.metadata,
      isActive: firestoreData.isActive ?? true, // valor por defecto
      isverified: firestoreData.isVerified ?? true, // valor por defecto
      role: firestoreData.role ?? 'user',        // valor por defecto
    };
  });

  return getUsers;
};

