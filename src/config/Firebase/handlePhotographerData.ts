import { addDoc, collection } from 'firebase/firestore';
import { AddPackageData, ListsProps } from '../Types/PhotographerForm';
import { database } from './handleData';
import { auth } from './initialize';

export function addPackage(
  data: AddPackageData,
  inclusions: ListsProps[],
  exclusions: ListsProps[]
) {
  const user = auth.currentUser;
  addDoc(collection(database, 'packages'), {
    inclusions: inclusions,
    exclusions: exclusions,
    rate: data.rate,
    occasion: data.occasion,
    title: data.title,
    photographer_uid: user?.uid,
  });
  console.log(user);
}
