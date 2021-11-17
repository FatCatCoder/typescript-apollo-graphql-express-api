import { Schema, model } from 'mongoose';
import { Todo as TodoInterface } from '../types/types';

const todoSchema = new Schema<TodoInterface>({
    title: {type: String, required: true},
    completed: {type: Boolean, required: true}
}, 
    {collection: "todos", versionKey: false} // no __v added anymore
);

export const Todo = model<TodoInterface>('todo', todoSchema);