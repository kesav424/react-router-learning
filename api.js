import { initializeApp } from "firebase/app"
import {
    getFirestore,
    collection,
    doc,
    getDocs,
    getDoc
} from "firebase/firestore/lite"

const firebaseConfig = {
    apiKey: "AIzaSyD_k3v3HK3tKEqhlqFHPkwogW7PqEqhGhk",
    authDomain: "vanlife-a1af5.firebaseapp.com",
    projectId: "vanlife-a1af5",
    storageBucket: "vanlife-a1af5.appspot.com",
    messagingSenderId: "803007000356",
    appId: "1:803007000356:web:446cd3a1ca406839258db1"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Refactoring the fetching functions below
const vansCollectionRef = collection(db, "vans")

export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

/**
 * Challenge: Figure out what to return from the
 * getVan function below. Then switch the VanDetail
 * page to use this getVan function instead of the
 * other one it's currently using.
 */


export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const snapshot = await getDoc(docRef)
    const van = {
        ...snapshot.data(),
        id:snapshot.id
    }
    
    return van
}



// export async function getVans(id) {
//     const url = id ? `/api/vans/${id}` : "/api/vans"
//     const res = await fetch(url)
//     if (!res.ok) {
//         throw {
//             message: "Failed to fetch vans",
//             statusText: res.statusText,
//             status: res.status
//         }
//     }
//     const data = await res.json()
//     return data.vans
// }

export async function getHostVans(id) {
    const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data.vans
}

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}