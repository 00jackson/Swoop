import { Box } from "@chakra-ui/layout";
import { ChatState } from "../context/chatProvider";
// import { useState } from "react";
import ChatBox from "../components/ChatBox";
import SideDrawer from "../components/misc/SideDrawer";
import MyChats from "../components/MyChats";
import { useState } from "react";


const ChatPage = () => {
    const { user } = ChatState();
    const [fetchAgain, setFetchAgain] = useState(false);

    return (
        <div style={{ width: "100%" }}>
            {user && <SideDrawer />}
            <Box display='flex'
                justifyContent="space-between"
                width='100%'
                h='91.5vh'
                p='10px'
            >
                {user && <MyChats fetchAgain={fetchAgain}  />}
                {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
            </Box>
        </div>
    )
}

export default ChatPage;