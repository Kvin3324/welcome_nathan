import React from "react";
import BestCoupleImg from "./img/IMG_0992.png";

function WishesList() {
  const [data, setData] = React.useState({
    messagesList: []
  })

  React.useEffect(() => {
    fetch('http://localhost:3000/api/fuassek')
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
        <div className="card--msg">
          <h3>Par Verral</h3>
          <p>Go prendre des culs secs</p>
        </div>
      </div>
    </section>
  )
}

export default WishesList;