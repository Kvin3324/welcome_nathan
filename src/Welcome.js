import React from "react";
import { Redirect } from "react-router-dom";

function Welcome() {
  const [redirect, setRedirect] = React.useState(false);
  const authorInput = React.useRef(null);
  const messageInput = React.useRef(null);

  function sendMessage(e) {
    e.preventDefault();

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
      <div className="container p-3">
        <form className="" onSubmit={sendMessage}>
          <div className="form-group">
            <label>
              <small>Votre joli nom :)</small>
            </label>
            <input type="text" placeholder="Ecrit par:" ref={authorInput} className="form-control"/>
          </div>
          <div className="form-group">
            <label>
              <small>Votre jolie message pour les parents :)</small>
            </label>
            <textarea 
              className="form-control" 
              ref={messageInput}
              ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Poster</button>
        </form>
      </div>
    </section>
  )
}

export default Welcome;