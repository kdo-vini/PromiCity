import { db, storage } from '@/services/firebase';
import { collection, doc, onSnapshot, orderBy, query, setDoc, getDoc, serverTimestamp, where } from 'firebase/firestore';
import { limit, getDocs } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export function listProfessionals(setter: (items: any[]) => void) {
  if (!db) {
    setter([]);
    return () => {};
  }
  const q = query(collection(db, 'professionals'), orderBy('featured', 'desc'));
  return onSnapshot(q, (snap) => {
    const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    setter(items as any);
  });
}

export async function getMyProfessional(uid: string) {
  if (!db) return null;
  const refDoc = doc(db, 'professionals', uid);
  const snap = await getDoc(refDoc);
  return snap.exists() ? snap.data() : null;
}

export async function upsertProfessional(uid: string, data: any) {
  if (!db) throw new Error('Firebase não configurado');
  const refDoc = doc(db, 'professionals', uid);
  await setDoc(refDoc, {
    ...data,
    updatedAt: serverTimestamp(),
  }, { merge: true });
}

export function listEvents(setter: (items: any[]) => void) {
  if (!db) {
    setter([]);
    return () => {};
  }
  const q = query(collection(db, 'events'), orderBy('date', 'asc'));
  return onSnapshot(q, (snap) => {
    const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    setter(items as any);
  });
}

export async function uploadAvatar(uid: string, uri: string) {
  if (!storage) throw new Error('Firebase não configurado');
  const res = await fetch(uri);
  const blob = await res.blob();
  const fileRef = ref(storage, `avatars/${uid}.jpg`);
  await uploadBytes(fileRef, blob);
  return await getDownloadURL(fileRef);
}

export function listFeaturedProfessionals(setter: (items: any[]) => void) {
  if (!db) {
    setter([]);
    return () => {};
  }
  const q = query(
    collection(db, 'professionals'),
    where('isFeatured', '==', true),
    where('status', '==', 'approved'),
    orderBy('updatedAt', 'desc')
  );
  return onSnapshot(q, (snap) => {
    const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    setter(items as any);
  });
}

export function listApprovedProfessionals(setter: (items: any[]) => void) {
  if (!db) {
    setter([]);
    return () => {};
  }
  const q = query(
    collection(db, 'professionals'),
    where('status', '==', 'approved'),
    orderBy('updatedAt', 'desc')
  );
  return onSnapshot(q, (snap) => {
    const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    setter(items as any);
  });
}

// Busca os profissionais destacados (máx 5)
export async function getFeaturedProfessionals() {
  if (!db) return [];
  const q = query(
    collection(db, 'professionals'),
    where('isFeatured', '==', true),
    where('status', '==', 'approved'),
    orderBy('updatedAt', 'desc'),
    limit(5)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Busca os profissionais mais novos (máx 5)
export async function getNewestProfessionals() {
  if (!db) return [];
  const q = query(
    collection(db, 'professionals'),
    where('status', '==', 'approved'),
    orderBy('createdAt', 'desc'),
    limit(5)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Busca os próximos eventos (máx 3)
export async function getUpcomingEvents() {
  if (!db) return [];
  const now = new Date();
  const q = query(
    collection(db, 'events'),
    where('eventDate', '>=', now),
    orderBy('eventDate', 'asc'),
    limit(3)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}


