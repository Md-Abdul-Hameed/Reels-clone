import React,{useState,useContext,useEffect} from "react"
import { AuthContext } from "../contexts/AuthProvider";
import {storage,firestore,database} from "../firebase"
function Signup(props){
    const [userName,setUserName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loader,setLoader] = useState(false);
    const [error,setError]  = useState(false);
    const [file,setFile] = useState(null);
    const {signup} = useContext(AuthContext)

    function handleFileSubmit(e){
        let file = e?.target?.files[0];
        if(file!=null){
            setFile(file);
        }

    }
    async function handleSignUp(e){
        e.preventDefault()
        console.log("Signup")
        try{
            setLoader(true);
            let resp =  await signup(email,password);
            let uid = resp.user.uid;
            console.log("before uploading")
            const uploadTaskListener = storage.ref(`/users/${uid}/profileimage`).put(file);
            console.log("after uploading")
            uploadTaskListener.on('state_changed',fn1,fn2,fn3);
            
            //fn1 -> progress
            function fn1(snapshot){
                var progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
                console.log(progress);
            }   
            //fn2 -> error
            function fn2(err){
                setError(err    )
                console.log("Got an error")
                setLoader(false)
            }
            //fn3 -> success
            async function fn3(){
                console.log("storage me daaldiye")
                let downloadUrl = await uploadTaskListener.snapshot.ref.getDownloadURL();
                database.users.doc(uid).set({
                    email:email,
                    userid : uid,
                    userName,
                    createdAt : database.getUserTimeStamp(),
                    profileUrl : downloadUrl,
                    postsIds:[]
                })
                setLoader(false)
                props.history.push("/login")
            }
        }catch(err){
            console.log("sign up error",err)
            setError(true);
            setLoader(false);

        }
    }

    return (
        <div>
            <form onSubmit={handleSignUp}>
            <div>
                <label htmlFor="">UserName</label>
                <input type="text" placeholder="Enter Username" value = {userName} onChange={(e)=>setUserName(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="">Email</label>
                <input type="email" placeholder="Enter Email" value = {email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="">Password</label>
                <input type="password" placeholder="Enter Password" value = {password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="">Profile pic</label>
                <input type="file" accept = "image/*" placeholder="profile pic"   onChange={(e)=>handleFileSubmit(e)}/>
            </div>
            <button type = "submit" disabled = {loader}>SignUp</button>
            </form>
        </div>
    )
}
export default Signup