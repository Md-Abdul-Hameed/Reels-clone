import React,{useState,useContext,useEffect} from "react"
import { AuthContext } from "../contexts/AuthProvider";
function Feed(props){
    useEffect(()=>{
        console.log("Feed is rendered");
    })
    const {signout} = useContext(AuthContext)
    return (
        <div>
            Feed
            <button onClick={()=>{
                signout();
                props.history.push("/login")
            }}>Signout</button>
        </div>
    )
}
export default Feed