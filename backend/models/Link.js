const mongoose = require("mongoose")

const linkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    url: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    isFavourite: {
        type: Boolean,
        default: false
    },
    owner: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Link", linkSchema);