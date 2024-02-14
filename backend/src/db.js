import User from '../models/user.js';
import mongoose from 'mongoose';

const url = 'mongodb://localhost:27017'; // Default MongoDB connection URL

async function connectDB() {
    try {
        //GIVE IT A NAME
        await mongoose.connect(url);
        console.log('Connected to MongoDB server');

        //const dbExists = await dbCheckExist(client, dbName);

        /*if (!dbExists) {
            console.log(`Database '${dbName}' does not exist. Creating Database.`);
            await dbCreate(client, dbName);
        } else {
            console.log(`Database '${dbName}' already exists.`);
        }

        return db; */
    } catch (err) {
        console.error('Failed to connect to the database:', err);
        process.exit(1);
    }
}

async function dbCheckExist(client, dbName) {
    const dbList = await client.db().admin().listDatabases();
    return dbList.databases.some((db) => db.name === dbName);
}

async function dbCreate(client, dbName) {
    await client.db(dbName).createCollection('dummy');
    console.log(`Database '${dbName}' created successfully.`);
}

async function addItem(userId, itemData) {
    try {
        await User.findByIdAndUpdate(userId, { $push: { items: itemData } });
        return { success: true, message: 'Item added successfully' };
    } catch (error) {
        console.error('Error adding item:', error);
        return { success: false, error: 'Failed to add item' };
    }
}

async function deleteItem(userId, itemId) {
    try {
        await User.findByIdAndUpdate(userId, { $pull: { items: { _id: itemId } } });
        return { success: true, message: 'Item deleted successfully' };
    } catch (error) {
        console.error('Error deleting item:', error);
        return { success: false, error: 'Failed to delete item' };
    }
}

async function updateItem(userId, itemId, newItemData) {
    try {
        await User.findOneAndUpdate(
            { _id: userId, 'items._id': itemId },
            { $set: { 'items.$': newItemData } }
        );
        return { success: true, message: 'Item updated successfully' };
    } catch (error) {
        console.error('Error updating item:', error);
        return { success: false, error: 'Failed to update item' };
    }
}

export { connectDB, updateItem, deleteItem, addItem } ;
