import React,{useState,useEffect,useContext} from 'react'
import { useRouter } from 'next/router'
import {parseCookies} from "../functions/parseCookies.js"
import Cookie from "js-cookie"
import Todo from "../components/Todo.js"
import TodoModal from "../components/TodoModal.js"
import Head from "next/head"


const index = ({user,userTodos}) => {

  const router = useRouter()

  const [modalIsOpen,setModalIsOpen] = useState(false)

  const [todos,setTodos] = useState(userTodos)

  console.log(todos)

    const deleteTodo = async (id) => {

      const deleteTodo = {
          id
      }
      
      const response = await fetch("http://localhost/api/deletetodo.php", {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(deleteTodo)
      })

      const data = await response.json()

      const newTodos = todos.filter(todo => todo.todoid != id)

      setTodos(newTodos)

    

    }

  const openModal = () => {
    setModalIsOpen(true);
  }

  const closeModal = () =>{
    setModalIsOpen(false);
  }

  const handleLogOut = () => {
    Cookie.set("user","")
    router.push("/")
  }

  // user.login

 

  const todoElements = todos.map(todo => <Todo deleteTodo={deleteTodo} key={todo.todoid} params={todo} />)
  
  return (

    <>
      <div class="content">

        <Head>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        </Head>

          <div className="app">
              <h1 className="app__title">To do list</h1>
              <div className="app__content">

              {todoElements.length > 0 ? todoElements : "Nie masz obecnie żadnych zadań"}
              <button onClick={handleLogOut}>Wyloguj</button>

              <button onClick={openModal} className="app__add"><i class="fas fa-plus"></i></button>
              </div>
          </div>
      </div>

      <TodoModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          todos={todos}
          setTodos={setTodos}
          user={user}
         />
    </>
  )
}


export async function getServerSideProps(context) {

  const userDataJSON = parseCookies(context.req)

  if (!userDataJSON.user) {
    return {
      redirect : {
        destination: "/login"
      },
      props: {}
    }
  } 

  const userDataParsed = JSON.parse(userDataJSON.user)

  const readTodosData = {
    id: userDataParsed.id
  }

  const userTodos = await fetch("http://localhost/api/readtodos.php", {
    method: "POST",
    headers: {
        "Content-Type":"application/json"
    },
    body: JSON.stringify(readTodosData)
  })

  const todosData  = await userTodos.json()

 
  return {
    props: {
      user: userDataParsed,
      userTodos: todosData.todos
    }
  }

}

export default index
