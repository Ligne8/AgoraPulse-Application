// src/routes/user.ts
import { Router } from 'express';
import admin from 'firebase-admin';

const router = Router();
const db = admin.firestore();
const usersRef = db.collection('users');

// Endpoint pour ajouter un utilisateur
router.post('/add', async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = await usersRef.add({ name, email });
    res.status(200).send(`User added with ID: ${newUser.id}`);
  } catch (error) {
    res.status(500).send('Error adding user: ' + error.message);
  }
});

// Endpoint pour obtenir tous les utilisateurs
router.get('/all', async (req, res) => {
  try {
    const snapshot = await usersRef.get();
    const users: Array<any> = [];
    snapshot.forEach(doc => {
      users.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send('Error getting users: ' + error.message);
  }
});

export default router;