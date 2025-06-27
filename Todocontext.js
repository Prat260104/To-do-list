import{createContext,useContext} from "react"

 export const Todocontext = createContext({
    todos:[
        {
            id:1,
            todo:'todo msg',
            completed: false,
        }
    ],
    addTodo: (todo)=>{},
    updateTodo:(id,todo)=>{},
    deleteTodo:(id)=>{},
    toggleComplete:(id)=>{}
 }) //default value object pass karna h 
 //todos ke ek array h uske andar har ek todo ek object hoga 

 export const useTodo = ()=>{
    return(
        useContext(Todocontext)
    )
 }

 export const Todoprovider = Todocontext.Provider //provider ke andar jo wrap usko access milega