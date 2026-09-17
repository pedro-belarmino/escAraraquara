import { collection, addDoc, getDocs, query, orderBy, Timestamp } from "firebase/firestore";
import { db } from "./config";
import { PreInscricaoFormData, PreInscricaoSubmission } from "../types/preInscricao";

const COLLECTION_NAME = "pre_inscricao_submissions";

export const submitPreInscricaoForm = async (data: PreInscricaoFormData) => {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...data,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
};

export const getPreInscricaoSubmissions = async (): Promise<PreInscricaoSubmission[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const submissions: PreInscricaoSubmission[] = [];
    querySnapshot.forEach((doc) => {
      submissions.push({
        id: doc.id,
        ...doc.data(),
      } as PreInscricaoSubmission);
    });
    return submissions;
  } catch (error) {
    console.error("Error fetching pre inscricao submissions: ", error);
    // Fallback if index on createdAt is missing or if query without order is needed
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    const submissions: PreInscricaoSubmission[] = [];
    querySnapshot.forEach((doc) => {
      submissions.push({
        id: doc.id,
        ...doc.data(),
      } as PreInscricaoSubmission);
    });
    return submissions;
  }
};
