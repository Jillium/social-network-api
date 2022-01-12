const { Schema, model, Types } = require('mongoose');
import dateFormat, { masks } from 'dateformat';
const now = new Date();

const ReactionSchema = new Schema ({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        max: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        dateFormat(now);
    }
});


const ThoughtSchema = new Schema ({
    thoughtText: {
        type: String,
        required: true,
        min: 1,
        max: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        dateFormat(now);
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ReactionSchema]
});

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);
module.exports = Thought;