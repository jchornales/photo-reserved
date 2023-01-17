import {
  collection,
  Firestore,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { firebaseApp } from "./initialize";

export const database = getFirestore(firebaseApp);

export default async function getCustomers(db: Firestore) {
  const customer = collection(db, "customer");
  const customerSnapshot = await getDocs(customer);
  const customerList = customerSnapshot.docs.map((doc) => doc.data());
  return customerList;
}
