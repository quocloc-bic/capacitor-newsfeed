import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore/lite";
import { firestore } from "./firebase-config";
import type { CreateArticlePayload } from "@/types/create-acticle";
import type { Article } from "@/types/acticle";
import type { Comment } from "@/types/comment";

const getArticles = async (
  lastCreatedAt?: Date,
  pageSize: number = 10
): Promise<{
  articles: Article[];
  lastCreatedAt?: Date;
}> => {
  const ref = collection(firestore, "article");
  let q;

  if (lastCreatedAt) {
    q = query(
      ref,
      orderBy("createdAt", "desc"),
      startAfter(lastCreatedAt),
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
    createdAt: doc.data().createdAt.toDate(),
    updatedAt: doc.data().updatedAt.toDate(),
  }));

  const lastVisible = docSnap.docs[docSnap.docs.length - 1];
  const lastCreatedAtValue = lastVisible?.data().createdAt.toDate();

  return { articles, lastCreatedAt: lastCreatedAtValue };
};

const postArticle = async (params: CreateArticlePayload): Promise<Article> => {
  const updatedParams = {
    ...params,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const ref = collection(firestore, "article");
  const docRef = await addDoc(ref, updatedParams);
  return {
    id: docRef.id,
    ...updatedParams,
  };
};

const postComment = async (articleId: string, comment: string) => {
  const params = {
    articleId,
    comment,
    createdAt: new Date(),
  };

  const ref = collection(firestore, "comments", articleId, "items");
  const docRef = await addDoc(ref, params);
  return { id: docRef.id, ...params };
};

const getComments = async (
  articleId: string,
  lastCreatedAt?: Date,
  pageSize: number = 10
): Promise<Comment[]> => {
  const ref = collection(firestore, "comments", articleId, "items");
  let q;

  if (lastCreatedAt) {
    q = query(
      ref,
      orderBy("createdAt", "desc"),
      startAfter(lastCreatedAt),
      limit(pageSize)
    );
  } else {
    q = query(ref, orderBy("createdAt", "desc"), limit(pageSize));
  }

  const docSnap = await getDocs(q);

  return docSnap.docs.map((doc) => ({
    id: doc.id,
    articleId,
    comment: doc.data().comment as string,
    createdAt: doc.data().createdAt.toDate(),
  }));
};

const firebaseService = {
  postArticle,
  getArticles,
  postComment,
  getComments,
};

export default firebaseService;
