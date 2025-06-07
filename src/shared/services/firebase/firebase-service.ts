import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore/lite";
import { firestore } from "./firebase-config";
import type { CreateArticlePayload } from "@/core/types/create-acticle";
import type { Article } from "@/core/types/article";
import type { Comment } from "@/core/types/comment";

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

const getArticle = async (articleId: string): Promise<Article | undefined> => {
  const ref = doc(firestore, "article", articleId);
  const docSnap = await getDoc(ref);
  if (!docSnap.exists()) {
    return undefined;
  }

  return {
    id: docSnap.id,
    title: docSnap.data().title,
    description: docSnap.data().description,
    content: docSnap.data().content,
    coverImage: docSnap.data().coverImage,
    createdAt: docSnap.data().createdAt.toDate(),
    updatedAt: docSnap.data().updatedAt.toDate(),
  };
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
    updatedAt: new Date(),
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
    updatedAt: doc.data().updatedAt?.toDate() || new Date(),
  }));
};

const firebaseService = {
  postArticle,
  getArticles,
  getArticle,
  postComment,
  getComments,
};

export default firebaseService;
