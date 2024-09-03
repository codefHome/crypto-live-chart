

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface InputFieldProps{
control:any;
name:string;placeHolder:string;
label:string;
error:any;
helperText:string | undefined
}

export interface TodoType{
  title:string;
  creator:string;
  description:string;
}

export interface AddTodoCardType extends TodoType{
  handleEdit:(_id:string) => void;
id:string;

  handleDelete: (id:string) => void

}

export interface TodoDatatype extends  Omit<AddTodoCardType, 'handleEdit' | 'handleDelete'>{
_id:string;
}

export interface Statetype{
  isEdit:boolean;
  id:string;
  singleData:TodoDatatype
  open:boolean;
}

export interface ModalProps{
  open:boolean;
  handleClose: () => void;
}
export interface DeleteConfirmProps extends ModalProps{
  handleDelete:(id:string) => void;
  id:string;
}