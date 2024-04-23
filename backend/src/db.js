import User from '../models/user.js';
import mongoose from 'mongoose';
import Pcbuild from '../models/pcbuild.js';
import BuildItem from '../models/builditem.js'

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

async function createNewBuild(userId, buildName) {
    try {
        const userIdObjectId = new mongoose.Types.ObjectId(userId);
        const newBuild = new Pcbuild({
            userId: userIdObjectId,
            name: buildName,
            items: []
        });

        await newBuild.save();
        await User.findByIdAndUpdate(userIdObjectId, { $push: { builds: newBuild._id } });
        return { success: true, message: 'New build created successfully', buildId: newBuild._id };
    } catch (err){
        console.error('Error creating build', err);
        return { success: false, error: 'Error creating the build'};
    }
}

async function addItem(userId, itemData) {
    try {
        const ongoingBuild = await Pcbuild.findOne({ userId }).populate('items');
        const { category, price="...", name="unnamed", ...rest } = itemData;
        //(def jsonpaths (map str (fs/glob "./json" "**.json")))
        //(map (comp (fn [sn] (every? #(get % "name") sn) ) json/parse-string slurp) jsonpaths)
        const maybeItem = await BuildItem.findOne({ name });
        let idAdded;
        if(maybeItem) {
            idAdded = maybeItem._id.toString() 
        } else {
            const item = await BuildItem.create({ 
                category,
                price,
                name,
                extra: JSON.stringify(rest)
            });
            idAdded = item._id.toString()
        }
        //do compatability check here here
        console.log(ongoingBuild.items)
        ongoingBuild.items.push(idAdded);
        await ongoingBuild.save();
        return { success: true, message: 'Item added to ongoing build successfully' };
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

async function getBuildsByUser(userId) {
    try {
        const userIdObjectId = new mongoose.Types.ObjectId(userId);
        const builds = await Pcbuild
                .find({ userId: userIdObjectId })
                .populate('items');

        console.log('The builds');
        console.log(builds);

        return builds;
    } catch (err) {
        console.error('Error fetching the builds:', err);
        throw err;
    }
}


export { connectDB, updateItem, deleteItem, addItem, url, createNewBuild, getBuildsByUser } ;
