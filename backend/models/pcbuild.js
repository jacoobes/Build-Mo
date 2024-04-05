import mongoose from 'mongoose';
import User from './user.js';

const { Schema } = mongoose;

const buildSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'BuildItem',
        required: true
    }]
});

export default mongoose.model('Pcbuild', buildSchema);
