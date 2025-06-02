// import { addDoc, collection, getDocs } from "firebase/firestore/lite"
// import { firestore } from "./firebase-config"
// import type { IncidentCategory } from "../../types/incident-category"
// import type { PostIncidentParams } from "../../types/post-incident-params"

// const getIncidentCategories = async (): Promise<IncidentCategory[]> => {
//     const ref = collection(firestore, "incident_category")
//     const doc = await getDocs(ref)
//     const list: IncidentCategory[] = doc.docs
//         .map((doc) => ({
//             id: doc.id,
//             name: doc.data().name,
//             color: doc.data().color,
//             index: doc.data().index,
//         }))
//         .sort((a, b) => a.index - b.index)

//     return list
// }

// const postIncident = async (params: PostIncidentParams): Promise<string> => {
//     const ref = collection(firestore, "incident")
//     const docRef = await addDoc(ref, params)
//     return docRef.id
// }

// const firebaseService = { getIncidentCategories, postIncident }
const firebaseService = {};

export default firebaseService;
