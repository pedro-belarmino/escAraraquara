import { collection, addDoc, getDocs, query, orderBy, Timestamp } from "firebase/firestore";
import { db } from "./config";
import { FlorDeLisFormData, FlorDeLisSubmission } from "../types/florDeLis";

const COLLECTION_NAME = "flor_de_lis_submissions";

export const submitFlorDeLisForm = async (data: FlorDeLisFormData) => {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...data,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
};

export const getFlorDeLisSubmissions = async (): Promise<FlorDeLisSubmission[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const submissions: FlorDeLisSubmission[] = [];
    querySnapshot.forEach((doc) => {
      submissions.push({
        id: doc.id,
        ...doc.data(),
      } as FlorDeLisSubmission);
    });
    return submissions;
  } catch (error) {
    console.error("Error fetching flor de lis submissions: ", error);
    // Fallback if index on createdAt is missing or if query without order is needed
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    const submissions: FlorDeLisSubmission[] = [];
    querySnapshot.forEach((doc) => {
      submissions.push({
        id: doc.id,
        ...doc.data(),
      } as FlorDeLisSubmission);
    });
    return submissions;
  }
};
