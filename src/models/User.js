const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    ad: { type: String, required: true },
    soyad: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    sifre: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

userSchema.pre('save', async function(next) {
    if (this.isModified('sifre')) {
        this.sifre = await bcrypt.hash(this.sifre, 10);
    }
    next();
});

module.exports = mongoose.model('User', userSchema);