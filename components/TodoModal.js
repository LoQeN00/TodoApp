import React,{useState,useEffect} from 'react'
import Modal from 'react-modal';
import { v4 as uuidv4 } from 'uuid';

const TodoModal = ({isOpen,onRequestClose,contentLabel,todos,user,setTodos}) => {


    const [todoValue,setTodoValue] = useState("")

    
    Modal.setAppElement("*")
    

    const handleSubmit = async (e) => {

        e.preventDefault()

        onRequestClose()

        const todo = {
          value: todoValue,
          todoid: uuidv4(),
          status: 0,
          userid: parseInt(user.id)
        }

        console.log(todo)

        const response = await fetch("http://localhost/api/addtodo.php", {
          method: "POST",
          headers: {
              "Content-Type":"application/json"
          },
          body: JSON.stringify(todo)
        })

        const data = await response.json()

        console.log(data)

        setTodoValue("")
        setTodos([...todos,todo])
    }


    return (
       <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
        ariaHideApp={false}
        contentLabel={contentLabel}>

        <form onSubmit={handleSubmit} >
          <input type="text"  value={todoValue} onChange={e=> setTodoValue(e.target.value)}  />

          <button type="submit">dodaj</button>
        </form>

        </Modal>
    )
}

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

export default TodoModal
