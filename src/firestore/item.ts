import firebase from 'firebase'

export type Item = {
  id: string
  uid: string
  title: string
  kind: string
}

const collectionName = 'items'

export const findByUID = async (
  db: firebase.firestore.Firestore,
  uid: string
): Promise<Item[]> => {
  const qs = await db
    .collection(collectionName)
    .where('uid', '==', uid)
    .orderBy('createdAt', 'desc')
    .get()

  const records = qs.docs.map(elem => {
    return elem.data()
  })

  return records as Item[]
}

export const findByID = async (
  db: firebase.firestore.Firestore,
  uid: string,
  id: string
): Promise<Item> => {
  const qs = await db
    .collection(collectionName)
    .where('uid', '==', uid)
    .where('id', '==', id)
    .limit(1)
    .get()

  const records = qs.docs.map(elem => {
    return elem.data()
  })

  return records[0] as Item
}

export const findInID = async (
  db: firebase.firestore.Firestore,
  uid: string,
  idList: string[]
): Promise<Item[]> => {
  const qs = await db
    .collection(collectionName)
    .where('uid', '==', uid)
    .where('id', 'in', idList)
    .get()

  const records = qs.docs.map(elem => {
    return elem.data()
  })

  return records as Item[]
}
