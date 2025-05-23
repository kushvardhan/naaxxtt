import {Schema, models,model,Document} from 'mongoose';

export interface IQuestion extends Document{
    title: string,
    content: string,
    tags: Schema.Types.ObjectId[],
    author: Schema.Types.ObjectId,
    upvotes: Schema.Types.ObjectId[],
    downvotes: string[],
    likes: string[],
    views: number,
    answers: string[],
    createdAt: Date,
}

const QuestionSchema = new Schema({
    title:{
        type: String,
        required: true,
        trim: true,
    },
    content:{
        type: String,
        required: true,
        trim: true,
    },
    tags:{
        type: [Schema.Types.ObjectId],
        ref: 'Tag',
        required: true,
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    upvotes:{
        type: [Schema.Types.ObjectId],
        ref: 'User',
        default: [],
    },
    downvotes:{
        type: [Schema.Types.ObjectId],
        ref: 'User',
        default: [],
    },
    views:{
        type: Number,
        default: 0,
    },
    answers:{
        type: [Schema.Types.ObjectId],
        ref: 'Answer',
        default: [],
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
    likes:{
        type: [Schema.Types.ObjectId],
        ref: 'User',
        default: [],
    },
})