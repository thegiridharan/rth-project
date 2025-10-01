import { MongoClient, ObjectId } from 'mongodb';

const uri = "mongodb+srv://test_user:Pp6bE1F8Hwa7FkoP@clusterfd.zchu2hz.mongodb.net/Manage_Property?retryWrites=true&w=majority&appName=ClusterFD";

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let dbInstance;

async function connectDB() {
    if (!dbInstance) {
        await client.connect();
        dbInstance = client.db();
        console.log('▶️ Connected to MongoDB Atlas');
    }
    return dbInstance;
}

export async function addDoc(collection, data) {
    const db = await connectDB();
    const result = await db.collection(collection).insertOne(data);
    return result.insertedId;
}

export async function getDocs(collection, filter = {}) {
    const db = await connectDB();
    return db.collection(collection).find(filter).toArray();
}

export async function getDocById(collection, id) {
    const db = await connectDB();
    return db.collection(collection).findOne({ _id: new ObjectId(id) });
}

export async function updateDoc(collection, id, data) {
    const db = await connectDB();
    const result = await db
        .collection(collection)
        .updateOne({ _id: new ObjectId(id) }, { $set: data });
    return result.modifiedCount;
}

export async function deleteDoc(collection, id) {
    const db = await connectDB();
    const result = await db
        .collection(collection)
        .deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount;
}
