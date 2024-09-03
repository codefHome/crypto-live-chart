import { zodResolver } from "@hookform/resolvers/zod";

import AddTodoVAlidationSchema, { AddTodoShcema } from "../schema/addTodoSchema";
import { TodoType } from "../types/types";
import { useAddTodoMutation, useLazyFetchAllTodoListQuery, useUpdateTodoMutation } from "../api/todoAPI";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { setIsEdit, setOpen } from "../store/slices/todoSlice";


const useAddTodoForm = () => {
const[addTodo]=useAddTodoMutation()
const[updateTodo]=useUpdateTodoMutation()
const [trigger]=useLazyFetchAllTodoListQuery()

const{isEdit,singleData,id}=useAppSelector(state => state.todoList)
console.log({isEdit})
const {
    formState: { errors },
    handleSubmit,
reset,
    control,
  } = useForm<AddTodoVAlidationSchema>({
    mode: "onChange",

    defaultValues: {
      title: "",
      creator: "",
      description: "",
    },
    resolver: zodResolver(AddTodoShcema),
  });
const dispatch = useAppDispatch()
  useEffect(() =>{
    reset({
      title: isEdit ? singleData?.title : '',
      creator:isEdit ? singleData?.creator : '',
      description: isEdit ? singleData?.description : ''
    })
  },[singleData,isEdit])

  const onSubmit: SubmitHandler<AddTodoVAlidationSchema> = async (
    data: TodoType
  ) => {
    if(isEdit){
      const single={...data,id:id}
updateTodo(single)
dispatch(setOpen(false))
dispatch(setIsEdit(false))
    }else{
      addTodo(data)
    }
  trigger({})
  reset()
  };
return{
    errors,
    handleSubmit,
    control,
    onSubmit,
    
}
}

export default useAddTodoForm