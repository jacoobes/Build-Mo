import User from '../models/user.js';
import mongoose from 'mongoose';

const url = 'mongodb://127.0.0.1:27017/userdatabase'; // Default MongoDB connection URL

async function connectDB() {
    try {

        await mongoose.connect(url);
        console.log('Connected to MongoDB server');

    } catch (err) {
        console.error('Failed to connect to the database:', err);
        process.exit(1);
    }
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
