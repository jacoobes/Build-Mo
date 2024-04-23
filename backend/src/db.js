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
        let curItem;
        if(maybeItem) {
            curItem = maybeItem._id.toString() 
        } else {
            const item = await BuildItem.create({ 
                category,
                price,
                name,
                extra: JSON.stringify(rest)
            });
            curItem = item
        }
        const hasCpu = ongoingBuild.items.find(item => item.category === "cpu");
        if(curItem.category == "cpu" && hasCpu) {
            return { success: false, error: "Your build has a cpu already" }
        }

        const hasMotherBoard = ongoingBuild.items.find(item => item.category === "motherboard")
        if(curItem.category == "motherboard" && hasMotherBoard) {
            return { success: false, error: "Your build has a motherboard already" }
        }
        const hasSupply = ongoingBuild.items.find(item => item.category === "power-supply")
        if(curItem.category == "power-supply" && hasSupply) {
            return { success: false, error: "Your build has a power-supply already" }
        }
        const hasCase = ongoingBuild.items.find(item => item.category == "case")
        if(curItem.category == "case" && hasCase) {
            return { success: false, error: "Your build has a computer case already" }
        }
        ongoingBuild.items.push(curItem._id.toString());
        await ongoingBuild.save();
        return { success: true, message: 'Item added to ongoing build successfully' };
    } catch (err){
        console.error('Error adding item:', err);
        return { success: false, error: 'Failed to add item' };
    }
}

async function deleteItem(userId, buildId, itemId) {
    try {
     const build = await Pcbuild.findOne({ userId, _id: buildId });    
     // Check if the build exists
     if (!build) {
        return { success: false, error: 'Build not found' };
     }

     // Remove the item from the items array
     build.items = build.items.filter(itemObjectId => itemObjectId.toString() !== itemId);
     // Save the updated build
     await build.save();
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
