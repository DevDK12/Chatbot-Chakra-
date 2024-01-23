
import ChatItem from './ChatItem';


const ChatList = ({messages}) => {

    return(
        messages.map((entry, id) => {
            return (
                <ChatItem 
                    key={id}
                    role={entry.role}
                    msg={entry.msg}
                    url={entry.url}
                />
            );
        })
    )
}
export default ChatList