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
        <form>
          <div className="form-group">
            <label>
              <small>Votre joli nom :)</small>
            </label>
            <input type="text" placeholder="Ecrit par:" ref={authorInput}/>
          </div>
          <div>
            <label>
              <small>Votre jolie message pour les parents :)</small>
            </label>
            <textarea 
              className="form-group" 
              ref={messageInput}
              ></textarea>
              <button type="submit" className="btn btn-primary">Poster</button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Welcome;