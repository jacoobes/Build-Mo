import User from '../models/user.js';
import mongoose from 'mongoose';
import Pcbuild from '../models/pcbuild.js';

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
        const newBuild = new Pcbuild({
            userId: userId,
            items: [itemData]
        });

    await newBuild.save();

    await User.findByIdAndUpdate(userId, { $push: { builds: newBuild._id } });

    return { success: true, message: 'Item added successfully' };
    } catch (err){
        console.error('Error adding item:', err);
        return { success: false, error: 'Failed to add item' };
    }
}

async function deleteItem(userId, buildId) {
    try {
    await Pcbuild.findByIdAndDelete(buildId);

    await User.findByIdAndUpdate(userId, { $pull: { builds: buildId } });

    return { success: true, message: 'Item deleted successfully' };
    } catch (err){
        console.error('Error deleting item:', err);
        return { success: false, error: 'Failed to delete item' };
    }
}

async function updateItem(userId, buildId, newBuildData) {
    try {
        await Pcbuild.findByIdAndUpdate(buildId, newBuildData);

        return { success: true, message: 'Item updated successfully' };
    } catch (err) {
        console.error('Error updating item:', err);
        return { success: false, error: 'Failed to update item' };
    }
}



export { connectDB, updateItem, deleteItem, addItem, url } ;
