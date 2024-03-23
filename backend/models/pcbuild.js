import mongoose from 'mongoose';
import User from './user.js';

const { Schema } = mongoose;

const buildSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        type: String,
        required: true
    }]
});

export default mongoose.model('Pcbuild', buildSchema);