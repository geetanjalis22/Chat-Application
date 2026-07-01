function Message({ msg, self }) {

    return (

        <div className={self ? "mine" : "other"}>

            <h4>{msg.user}</h4>

            <p>{msg.text}</p>

            <span>{msg.time}</span>

        </div>

    );

}

export default Message;