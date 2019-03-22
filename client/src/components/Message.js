// props = {perspective, title, body, timeStamp}
// perspective = [sender, receiver] 
// styling classes: message, bubble, bubbleTitle, bubbleBody, sender, receiver, timeStamp


const Message = props => {
    return 
    <div className="message">
    <div className={"bubble " + props.perspective}>
        <div className="bubbleTitle">{props.title}</div>
        <div className="bubbleBody">{props.body}</div>
    </div>
    <div className="timeStamp">{props.timeStamp}</div>
    </div>
}