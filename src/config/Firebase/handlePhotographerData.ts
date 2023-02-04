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
    photographer_uid: user?.uid,
    title: data.title,
    occasion: data.occasion,
    rate: data.rate,
    inclusions: inclusions,
    exclusions: exclusions,
  });
  console.log(user);
}
