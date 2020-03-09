import * as firebase from 'firebase/app'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import 'dayjs/locale/ja'

export type Calendar = {
  id?: string
  itemId: string
  uid: string
  date: string
}

dayjs.extend(advancedFormat)

const collectionName = 'calendars'

export const findByUID = async (
  db: firebase.firestore.Firestore,
  uid: string
): Promise<Calendar[]> => {
  const qs = await db
    .collection(collectionName)
    .where('uid', '==', uid)
    .get()

  const records: any = qs.docs.map(elem => {
    return elem.data()
  })

  return records.map((record: any) => ({
    ...record,
    date: dayjs(record.date.seconds * 1000).format('YYYY-MM-DD'),
  })) as Calendar[]
}
