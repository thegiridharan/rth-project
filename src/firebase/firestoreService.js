import { db } from "@/firebase/init";
import {
    collection, addDoc, doc, setDoc, getDoc, getDocs, deleteDoc, updateDoc, query, orderBy, serverTimestamp
} from "firebase/firestore";

/**
 * Adds a document to Firestore with auto-incrementing ID.
 * @param {string} collectionName - Firestore collection name.
 * @param {object} data - Data to store in Firestore.
 */
const addData = async (collectionName, data) => {
    try {
        const value = await addDoc(collection(db, collectionName), data);
        console.log("Document successfully added.");
        return value;
    } catch (e) {
        console.error("Error adding document:", e);
    }
};

/**
 * Retrieves documents from Firestore.
 * @param {string} collectionName - Firestore collection name.
 * @returns {Promise<Array>} - List of documents.
 */
const getData = async (collectionName) => {
    try {
        const q = query(collection(db, collectionName));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("❌ Error fetching documents:", error);
        return [];
    }
};

/**
 * Updates a document in Firestore.
 * @param {string} collectionName - Firestore collection name.
 * @param {string} id - Document ID.
 * @param {object} updatedData - Data to update.
 */
const updateData = async (collectionName, id, updatedData) => {
    try {
        const docRef = doc(db, collectionName, id);
        await updateDoc(docRef, { ...updatedData, updatedAt: serverTimestamp() });

        console.log(`✅ Document updated: ${id}`);
    } catch (error) {
        console.error("❌ Error updating document:", error);
    }
};

/**
 * Deletes a document from Firestore.
 * @param {string} collectionName - Firestore collection name.
 * @param {string} id - Document ID.
 */
const deleteData = async (collectionName, id) => {
    try {
        await deleteDoc(doc(db, collectionName, id));
        console.log(`✅ Document deleted: ${id}`);
    } catch (error) {
        console.error("❌ Error deleting document:", error);
    }
};

export { addData, getData, updateData, deleteData };
