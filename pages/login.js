import React,{useState} from 'react'
import { useRouter } from 'next/router'
import Cookie from "js-cookie"
import {parseCookies} from "../functions/parseCookies.js"
import Link from 'next/link'

const LoginPage = () => {

    const router = useRouter()
    const [login,setLogin] = useState("")
    const [password,setPassword] = useState("")
    const [errors,serErrors] = useState("")
   

    const handleLoginChange = e => {
        setLogin(e.target.value)
        
    }

    const handlePasswordChange = e => {
        setPassword(e.target.value)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("poszlo")

        const loginData = {
            login,
            password
        }

        const response = await fetch("http://localhost/api/users.php", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(loginData)
        })

        const data = await response.json()

        if (data.error) serErrors(data.error)

        if(data.login) {
            Cookie.set("user",{login:data.login,id:data.id})
            router.push("/")
        }

    }

    return (
        // <div>
            
        //     <form >

        //             <input value={login} onChange={handleLoginChange} type="text" />
        //             <input  />

        //         <button type="submit">Zatwierdz</button>
        //     </form>
        //     {errors}
        //     
        // </div>
        <>
            <div className="container">
                <div className="login">
                    <h2 className="login__title">Zaloguj się</h2>
                    <form autocomplete="off" onSubmit={handleSubmit} method="POST" >
                        <div className="form__login">
                            <label className="login__text" for="login">Login</label>
                            <input className="form__placeholder" value={login} onChange={handleLoginChange} type="text"/> 
                        </div>

                        <div className="form__password">
                            <label className="password__text" for="pass">Password</label>
                            <input className="form__placeholder" value={password} onChange={handlePasswordChange} type="password"/>
                        </div>
                        <div className="form__create">
                            <p className="form__create__text">Nie masz konta? <Link className="form__create__link" href="/register">Nie masz konta ? Załóż je</Link></p>
                        </div>
                        <button type="submit" className="form__button">Log in</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(context) {

    const userDataJSON = parseCookies(context.req)
  
    if (userDataJSON.user) {
      return {
        redirect : {
          destination: "/"
        },
        props: {}
      }
    }
    
    return {
        props: {}
    }
  
  }

export default LoginPage


