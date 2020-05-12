import React from 'react';
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom';
// import 'The Chat' Logo 
import headerLogo from '../svg/chat-header.svg';
// import sample chatroom video
import video from '../videos/video.mp4';
import "../css/login_signup.css";

const Login = ({ appUser, setAppUser }) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [usertype, setUserType] = React.useState('');

  const handleLogIn = () => {
    console.log(username)
    console.log(password)

    const body = {
      username: username,
      password: password,
    }

    axios.post('/api/authenticate', body)
      .then((res) => {
        if (res.data.success || res.data.usertype) {
          console.log('Worked')
          setAppUser(username)
          setUserType(res.data.usertype)

        }
        else {
          //auth error
          setError(res.data.error)

        }
        console.log(error)
      })
      .catch(() => {
        setError('Failed to authenticate')
      })
  }

  if (appUser) {
    return <Redirect to="/chatroom" />;
  }

  return (

    <div className="background">
      <video id='sampleVideo' autoPlay loop muted>
            <source src={video} type='video/mp4' />
      </video>
      <div className="flexContainerRow">
        {/* ======== Sign In Box - [LEFT] ======== */}
        <div className="flexBox-1">
          {/* <img id="headerLogo" src={headerLogo} alt="Logo" /> */}
          <br/>
          <br/>
          <div id="signInBox" className="AccountBox centerBoxH flexContainerCol fontRobotoMono">
            {/* Nav in the top-right */}
            {/* <div className="flexBox-1">
              <p id="AccountBttn" class="smallFontSz">
                <Link className="links" to="/signup">Sign Up</Link>
              </p>
            </div> */}
            {/* sign in contents */}
            <div className="flexBox-2">
              {/* Header */}
              <h1 id="header-signIn-signup" class="centerText"><em>soda</em></h1>
              {/* error message */}
              <div id="error">
                {error && <strong>{error}</strong>}
              </div>
              <h4></h4>
              {/* Start of Login Form (requires Username & Password) */}
              <p class="centerText">Username:
                <input className="username-input inputText" value={username} onChange={(e) => setUsername(e.target.value)} />
              </p>
              <p class="centerText">Password:
                <input className="password-input inputText" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </p>
              {/* <p id="resetPsswd" class="smallFontSz"><a class="links" href="#">Forgot Password?</a>
              </p> */}
              <button id="submitBttn" class="fontRobotoMono" disabled={!username || !password} onClick={handleLogIn}>Log in</button>
              <br/>
               <br/>   
              <p id="AccountBttn" class="smallFontSz"><Link className="links" to="/signup">Sign Up</Link></p>
            </div>
          </div>
        </div>
        {/* ======== Sample Chatroom Video - [RIGHT] ======== */}
      </div>
    </div>
  );
};
export default Login;
