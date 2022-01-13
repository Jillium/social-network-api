const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
        // match: [/.+\@.+\..+/]
    }
    // thoughts: [],
    // friends: []
});

// UserSchema.virtual('friendCount').get(function() {
//     return this.friends.length;
// });

const User = model('User', UserSchema);
module.exports = User;