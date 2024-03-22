import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Pcbuild from './pcbuild.js';

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    builds: [{
        type: Schema.Types.ObjectId,
        ref: 'Pcbuild',
        required: true
    }]
});

// Hash the password before saving the user for basic security
userSchema.pre('save', async function(next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }

        // Generate a salt (learned that from Cyber :) )
        const salt = await bcrypt.genSalt(10);
        // Hash the password along with the generated salt
        const hashedPassword = await bcrypt.hash(this.password, salt);

        // Replace the plain password with the hashed password
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
})

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);
