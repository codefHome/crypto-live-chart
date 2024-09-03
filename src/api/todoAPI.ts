import { createApi } from '@reduxjs/toolkit/query/react'
import baseQuery from './baseUrl'



export const todoAPI = createApi({

  reducerPath: 'todoAPI',
  tagTypes: ['todoList'],
  baseQuery,
  endpoints: (builder) => ({
    fetchAllTodoList: builder.query({
      query: () => "fetchTodo"
    }),
    addTodo:  builder.mutation({
      query: (data) => ({
        url: `addTodo`,
        method: 'POST',
        body: data,
      }),
    }),
    updateTodo:  builder.mutation({
      query: (data) => ({
        url: `updateTodo/${data?.id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    fetchTodoById: builder.query({
      query: (_id:string) => `getTodoById/${_id}`
    }),
    deleteTodo:  builder.mutation({
      query: (_id:string) => ({
        url: `deleteTodo/${_id}`,
        method: 'DELETE',
     
      }),
    }),
    
})
})

export const {
    useLazyFetchAllTodoListQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useLazyFetchTodoByIdQuery,
    useDeleteTodoMutation,
} = todoAPI