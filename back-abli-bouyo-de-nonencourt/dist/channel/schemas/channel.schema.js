"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.ChannelSchema = new mongoose.Schema({
    idChannel: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 5,
        trim: true,
    },
    description: {
        type: String,
        maxlength: 100,
    },
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 20,
        trim: true,
    },
}, {
    toJSON: { virtuals: true },
    versionKey: false,
});
//# sourceMappingURL=channel.schema.js.map