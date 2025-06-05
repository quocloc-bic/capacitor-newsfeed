import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  QueryDocumentSnapshot,
} from "firebase/firestore/lite";
import type { DocumentData } from "firebase/firestore/lite";
import { firestore } from "./firebase-config";
import type { CreateArticlePayload } from "@/types/create-acticle";
import type { Article } from "@/types/acticle";

const getArticles = async (
  pageSize: number = 10,
  lastDoc?: QueryDocumentSnapshot<DocumentData>
): Promise<{
  articles: Article[];
  lastDoc?: QueryDocumentSnapshot<DocumentData>;
}> => {
  const ref = collection(firestore, "article");
  let q;

  if (lastDoc) {
    q = query(
      ref,
      orderBy("createdAt", "desc"),
      startAfter(lastDoc),
      limit(pageSize)
    );
  } else {
    q = query(ref, orderBy("createdAt", "desc"), limit(pageSize));
  }

  const docSnap = await getDocs(q);

  const articles: Article[] = docSnap.docs.map((doc) => ({
    id: doc.id,
    title: doc.data().title,
    description: doc.data().description,
    content: doc.data().content,
    coverImage: doc.data().coverImage,
    createdAt: doc.data().createdAt,
    updatedAt: doc.data().updatedAt,
  }));

  const lastVisible = docSnap.docs[docSnap.docs.length - 1];

  return { articles, lastDoc: lastVisible };
};

const postArticle = async (params: CreateArticlePayload): Promise<string> => {
  const updatedParams = {
    ...params,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const ref = collection(firestore, "article");
  const docRef = await addDoc(ref, updatedParams);
  return docRef.id;
};

const firebaseService = { postArticle, getArticles };

export default firebaseService;
