import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import {Link} from "react-router-dom"
import {
  Container,
  Grid,
  Card,
  Paper,
  TextField,
  makeStyles,
  CardContent,
  CardActions,
  CardMedia,
  Button,
} from "@material-ui/core";
function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  let { login } = useContext(AuthContext);

  let useStyles = makeStyles({
    centerDiv: {
      height: "100vh",
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    crousel: {
      height: "20rem",
    },
    alignCenter: {
      justifyContent: "center",
    },
    centerElements:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center"
    }
    ,
    mb:{
        marginBottom:"0.8rem"
    },
    image:{
        height:"6rem",
        backgroundSize:"contain"
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      let resp = login(email, password);
      setLoader(false);
      props.history.push("/");
    } catch (error) {
      setError(true);
      setLoader(false);
      setEmail("");
      setPassword("");
    }
  };
  let classes = useStyles();
  return (
    <div className={classes.centerDiv}>
      <Container>
        <Grid container className={classes.alignCenter} spacing={2}>
          <Grid item sm={4}>
            <Paper className={classes.crousel}>Corousel</Paper>
          </Grid>
          <Grid item sm={4} >
            <Card variant="outlined">
              <CardMedia image="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1024px-Instagram_logo.svg.png"
                  title="Instagram" className = {classes.image}>
                  
              </CardMedia>
              <CardContent className={classes.centerElements}>
                <TextField id="outlined-basic" variant="outlined" label="Email" type = "email" placeholder="abc@xyz.com" 
                className={classes.mb}
                size = "small"style={{display:"block"},{width:"80%"}} value = {email} onChange={(e)=>setEmail(e.target.value)} />
                <TextField variant = "outlined" label = "Password" type = "password" placeholder="Enter password"
                className = {classes.mb}
                size = "small" style={{display:"block"},{width:"80%"}} value={password} onChange={(e)=>setPassword(e.target.value)}></TextField>
                <LinkElement content = "Forgor Password?" route = "/signup"></LinkElement>
                <Button color = "primary" variant = "contained" style={{width:"100%"}}
                onClick={(e)=>handleSubmit(e)}
                >Login</Button>
                <LinkElement content = "Don't have an account? signup" route = "/signup"></LinkElement>
              </CardContent>
              <CardActions></CardActions>
            </Card>
          </Grid>
          <Grid item></Grid>
        </Grid>
      </Container>

      {/* <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="">Email</label>
                <input type="email" placeholder="Enter Email" value = {email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="">Password</label>
                <input type="password" placeholder="Enter Password" value = {password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <button type = "submit" disabled = {loader}>Login</button>
            </form> */}
    </div>
  );
}
export default Login;

function LinkElement(props) {
    return (
        <Button variant = "text" style={{color:"blue"}}>
            
            <Link to={props.route}>{props.content}</Link>
        </Button>
    );
}


