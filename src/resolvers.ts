// resolver map
import { IResolvers } from 'graphql-tools';
import { Todo as TodoInterface } from './types/types';
import { Todo as TodoModel } from './models/models';

const resolverMap: IResolvers = {
  Query: {
    todos: async (): Promise<Array<TodoInterface>> => {
        const allTodos = await TodoModel.find();
        console.log(allTodos);
        return allTodos;
    },
  },
  Mutation: {
      addTodo: async (_, args) => {
        const {input: { title, id, completed}} = args;
        const addTodo = await TodoModel.create({ title, id, completed});
        return addTodo;
      },
  },
};
export default resolverMap;