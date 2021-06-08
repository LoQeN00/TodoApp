import React,{useState} from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import Cookie from "js-cookie"
import {parseCookies} from "../functions/parseCookies.js"

const register = () => {
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

        const registerData = {
            login,
            password
        }

        const response = await fetch("http://localhost/api/register.php", {
            method: "POST",
            headers: {
                "Content-Type":"application/json",

            },
            body: JSON.stringify(registerData)
        })


        const data = await response.json()

        if (data.error) serErrors(data.error)

        if (data.message) router.push("/login")

        console.log(data)

    }



    return (
        // <div>
        //      <form >

        //             <input  />
        //             <input  />

        //         <button type="submit">Zatwierdz</button>
        //     </form>
        //     {errors}
        //     

        // </div>
    <div className="container">
        <div className="login">
            <h2 className="login__title">Zarejestruj się</h2>
            <form autocomplete="off" onSubmit={handleSubmit} method="POST">
                <div className="form__login">
                    <label className="login__text" for="login">Login</label>
                    <input className="form__placeholder" value={login} onChange={handleLoginChange} type="text" /> 
                </div>

                <div className="form__password">
                    <label className="password__text" for="pass">Password</label>
                    <input className="form__placeholder" value={password} onChange={handlePasswordChange} type="password"/>
                </div>
                <div className="form__create">
                    <p className="form__create__text">Masz już konto?<Link className="form__create__link" href="/login">Masz już konto ? Zaloguj się</Link></p>
                </div>
                <button className="form__button">Register</button>
            </form>
        </div>
    </div>
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

export default register
