const mongoose = require('mongoose');

const Post = mongoose.model('Post', {
    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    },

    postDate: {
        type: String,
        required: true
    },

    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});


module.exports = Post