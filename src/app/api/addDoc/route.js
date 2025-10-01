// api.js
import express from 'express';
import {
    addDoc,
    getDocs,
    getDocById,
    updateDoc,
    deleteDoc,
} from '../../../lib/db';

const app = express();
app.use(express.json());

// Create
app.post('/api/:collection', async (req, res) => {
    try {
        const insertedId = await addDoc(req.params.collection, req.body);
        res.status(201).json({ insertedId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Read all
app.get('/api/:collection', async (req, res) => {
    try {
        const docs = await getDocs(req.params.collection, req.query);
        res.json(docs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Read one
app.get('/api/:collection/:id', async (req, res) => {
    try {
        const doc = await getDocById(req.params.collection, req.params.id);
        if (!doc) return res.status(404).json({ error: 'Not found' });
        res.json(doc);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update
app.put('/api/:collection/:id', async (req, res) => {
    try {
        const count = await updateDoc(req.params.collection, req.params.id, req.body);
        if (count === 0) return res.status(404).json({ error: 'Not found or not modified' });
        res.json({ modifiedCount: count });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete
app.delete('/api/:collection/:id', async (req, res) => {
    try {
        const count = await deleteDoc(req.params.collection, req.params.id);
        if (count === 0) return res.status(404).json({ error: 'Not found or not deleted' });
        res.json({ deletedCount: count });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Express API listening on port ${PORT}`));
