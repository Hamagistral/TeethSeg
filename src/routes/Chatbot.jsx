import {
    ChatContainer,
    MainContainer,
    Message,
    MessageInput,
    MessageList,
    TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Chatbot() {
    const [typing, setTyping] = useState(false);
    const [messages, setMessages] = useState([
        {
            message: "Hello, I am TeethSeg, How can I assist you today ? ",
            sentTime: "just now",
            sender: "ChatGPT",
        },
    ]);

    const apiKey = import.meta.env.VITE_OPENAI_KEY
    const orgKey = import.meta.env.VITE_ORGANIZATION_KEY


    const generateChat = async (message) => {
        // e.preventDefault();
        const newMessage = {
            message: message,
            sender: "UserGPT",
            direction: "outgoing",
        };
        // post all the old Messages & new Message
        const newMessages = [...messages, newMessage];

        // update our messages state
        setMessages(newMessages);
        // console.log(newMessages)

        // set a typing indicator for chatgpt is typing
        setTyping(true);

        // process message to chatgpt: send it over and see the response
        await sendMessage(newMessages);
    };



    async function sendMessage(chatMessages) {

        // chatMessages = {sender: 'UserGPT' or "ChatGPT" , message: chatMessage}
        // apiMessages = {role: 'user' or 'assistant', content: chatMessage}

        let apiMessages = chatMessages.map((messageObject) => {
            let role = "";
            if (messageObject.sender === "ChatGPT") {
                // response from chatGPT
                role = "assistant";
            } else {
                // request from user
                role = "user";
            }
            return { role: role, content: messageObject.message };
        });
        const systemMessage = {
            // define how chatgpt talks in initial message
            role: "system",
            content: 'You are a TeethSeg chatbot, Explain all concepts about MeshSegNet for segmenting the 3D model of Teeths like AI based fully Automated',
        }

        const apiRequestBody = {
            'model': "gpt-3.5-turbo",
            messages: [
                systemMessage,
                ...apiMessages,
                // [msg1, msg2, ..., msg]
            ],
            "temperature": 0.7,
        };


        await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + apiKey,
                'OpenAI-Organization': orgKey,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(apiRequestBody),
        })
            .then((data) => data.json())
            .then((data) => {
                // console.log(data);
                const response = data.choices[0].message.content;
                setMessages([
                    ...chatMessages,
                    {
                        message: response,
                        sender: "ChatGPT",
                    },
                ]);
                setTyping(false);
            })
            .catch((error) => {
                // console.error(error);
                console.log(error.message);
            });
    }

    return (
        <>
            <Header />
            <div className="text-center text-white w-full py-10 flex-box flex-col scroll-smooth bg-gray-900">
                <div
                    className="relative w-full"
                >
                    <MainContainer
                        className="md:h-[80vh]"

                    >
                        <ChatContainer>
                            <MessageList
                                scrollBehavior="smooth"
                                typingIndicator={
                                    typing ? (
                                        <TypingIndicator className="bg-slate-900" content="TeethSeg is typing" />
                                    ) : null
                                }
                                className="h-[50vh] md:h-full bg-slate-800"

                            >
                                {messages.map((message, i) => {
                                    return <Message key={i} model={message} />;
                                })}
                            </MessageList>
                            <MessageInput
                                className="bg-slate-600"
                                placeholder="Type message here"
                                onSend={generateChat}
                            />
                        </ChatContainer>
                    </MainContainer>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Chatbot;