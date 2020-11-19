import { useState, useEffect } from 'react';
import { db } from '../firebase';

export default function useCollection(path, where = []) {
  const [docs, setDocs] = useState([]);
  const [queryField, queryOperator, quertValue] = where;

  useEffect(() => {
    let collection = db.collection(path);

    if (queryField) {
      collection = collection.where(queryField, queryOperator, quertValue);
    }

    return collection.onSnapshot((snap) => {
      const docs = [];
      snap.forEach((doc) => {
        docs.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setDocs(docs);
    });
  }, [path, queryField, queryOperator, quertValue]);
  return docs;
}
