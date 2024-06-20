import { Avatar } from "@mui/material";
import { ChatBox, ReceiverMessage, SenderMessage } from "mui-chat-box";

const Chat = () => (<ChatBox>
    <ReceiverMessage avatar={<Avatar>KS</Avatar>}>
        Hello how are you?
    </ReceiverMessage>
    <SenderMessage avatar={<Avatar>NA</Avatar>}>
        I'm good thanks you?
    </SenderMessage>
    <ReceiverMessage avatar={<Avatar>KS</Avatar>}>
        I'm good too!
    </ReceiverMessage>
</ChatBox>);

export default Chat;