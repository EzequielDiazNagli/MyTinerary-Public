import React from "react";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import userActions from "../redux/actions/userActions";
// import Google from "@mui/icons-material/Google";

function GoogleLogIn (){

    const dispatch = useDispatch()

    async function handleCallbackResponse(response){
        // console.log(response.credential);
        let userObject = jwt_decode(response.credential);
        // console.log(userObject);
        const userLogin = {
            email: userObject.email,
            password: userObject.sub,
            from: "google"
        }
        dispatch(userActions.logIn(userLogin))
        // console.log(userLogin)
    }

    // const handleSubmit = (event) => {
    //     event.preventDefault() //prevenimos la accion del submit
    //     const userLogin = {
    //         email: event.target[0].value,
    //         password: event.target[2].value,
    //         from: "formSignUp"
    //     }
    //     dispatch(userActions.logIn(userLogin))
    //     console.log(userLogin)
    // }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "203278615969-67mec5vo42bdu0ftenfsk987qk328f9g.apps.googleusercontent.com",
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById("buttonDiv"),
            {theme: "outline", size: "medium"}
        )
    });

    return (
        <div>
            <div id="buttonDiv"></div>
        </div>
    )
}

export default GoogleLogIn