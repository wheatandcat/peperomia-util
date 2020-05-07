import firebase from 'firebase';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';

export type Calendar = {
  id?: string;
  itemId: string;
  uid: string;
  date: string;
};

dayjs.extend(advancedFormat);

const collectionName = 'calendars';

export const findByUID = async (
  db: firebase.firestore.Firestore,
  uid: string
): Promise<Calendar[]> => {
  const qs = await db.collection(collectionName).where('uid', '==', uid).get();

  const records = qs.docs.map((elem) => {
    return elem.data();
  });

  return records.map((record) => ({
    ...record,
    date: dayjs(record.date.seconds * 1000).format('YYYY-MM-DD'),
  })) as Calendar[];
};

export const findByItemID = async (
  db: firebase.firestore.Firestore,
  uid: string,
  itemID: string
): Promise<Calendar> => {
  const qs = await db
    .collection(collectionName)
    .where('uid', '==', uid)
    .where('itemId', '==', itemID)
    .get();

  const records = qs.docs.map((elem) => {
    return elem.data();
  });

  const item = records.map((record) => ({
    ...record,
    date: dayjs(record.date.seconds * 1000).format('YYYY-MM-DD'),
  }));

  return item[0] as Calendar;
};
