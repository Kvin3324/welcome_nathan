import React from "react";
import { Redirect } from "react-router-dom";

function Welcome() {
  const authorInput = React.useRef(null);
  const messageInput = React.useRef(null);

  const [redirect, setRedirect] = React.useState(false);

  function sendMessage() {
    let url;
    if (process.env.NODE_ENV === "development") {
      url = 'http://localhost:3000/api/fuassek';
    } else {
      url = "https://welcome-nathan.vercel.app/api/fuassek";
    }

    return fetch(url, {
      method: "POST",
      headers: {
        "content-type": "Application/json"
      },
      body: JSON.stringify({
        content: messageInput.current.value,
        author: authorInput.current.value
      })
    })
    .then(res => {
      if(res.status === 200) {
        return setRedirect(true);
      }
    })
  }

  if (redirect) return <Redirect to="wishesList"></Redirect>

  return(
    <section className="welcome--page">
      <div className="welcome--page--title">
        <h1 className="title--page">Welcome Nathan 👼</h1>
        <p className="message--content">Laissez votre plus beau message pour les plus beaux parents qui nous arrive avec leur jeune Nathan ! </p>
      </div>
      <div>
        <input type="text" placeholder="Ecrit par:" className="authour--input" ref={authorInput}></input>
        <textarea
          id="inputDesc"
          rows="6"
          cols="80"
          placeholder="Ajoutez une description"
          ref={messageInput}
        ></textarea>
      </div>
      <div className="btn--send">
        <input type="button" value="Poster" className="button--send" onClick={sendMessage}></input>
      </div>
    </section>
  )
}

export default Welcome;