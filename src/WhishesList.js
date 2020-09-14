import React from "react";
import BestCoupleImg from "./img/IMG_0992.png";

function WishesList() {
  const [data, setData] = React.useState({
    messagesList: []
  })

  

  React.useEffect(() => {
    let url;
    if (process.env.NODE_ENV === "development") {
      url = 'http://localhost:3000/api/fuassek';
    } else {
      url = "https://welcome-nathan.vercel.app/api/fuassek";
    }

    fetch(url)
    .then(res => res.json())
    .then(dataParsed => {
      if (dataParsed.error) {
        console.log("no message");
        return;
      }
      setData({
        messagesList: dataParsed.messages
      })
    })
  }, [])


  return(
    <section className="whishes--list">
      <div className="banner--img">
        <img src={BestCoupleImg} alt="jean--et--emeline--les--best"></img>
      </div>
      <div className="list--messages">
        <h2>Liste des messages</h2>
        <p>Quelques messages pour vous apporter des voeux de naissance et souhaiter la bienvenue (et du courage...) au petit Nathan !</p>
        {
          data.messagesList.map((message, index) => {
            return (
              <div className="card--msg" key={index}>
                <h3>Par {message.author}</h3>
                <p>{message.content}</p>
                <span className="first--heart">❤️</span>
                <span className="second--heart">❤️</span>
                <span className="third--heart">❤️</span>
                <span className="fourth--heart">❤️</span>
              </div>
            )
          })
        }
      </div>
    </section>
  )
}

export default WishesList;