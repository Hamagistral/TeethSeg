import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
    Avatar,
    ChatContainer,
    MainContainer,
    Message,
    MessageInput,
    MessageList,
    TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { Bot } from "lucide-react";

const ChatBot = () => {
    const [typing, setTyping] = useState(false);
    const [messages, setMessages] = useState([
        {
            message: "👋🏻 Hi, I am TeethSegBot! How can I help you?",
            sentTime: "just now",
            sender: "ChatGPT",
            role: "system"
        },
    ]);

    const apiKey = import.meta.env.VITE_OPENAI_KEY
    const orgKey = import.meta.env.VITE_ORGANIZATION_KEY


    const generateChat = async (message) => {
        const newMessage = {
            message: message,
            sender: "UserGPT",
            direction: "outgoing",
        };
        // post all the old Messages & new Message
        const newMessages = [...messages, newMessage];

        // update our messages state
        setMessages(newMessages);

        // set a typing indicator for chatgpt is typing
        setTyping(true);

        // process message to chatgpt: send it over and see the response
        await sendMessage(newMessages);
    };



    async function sendMessage(chatMessages) {

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
            role: "system",
            content: "You are an AI Assistant chatbot of TeethSeg a website that helps users segment their 3d obj files of teeths. TeethSeg is a summer 2023 internship project done for '3D SMART FACTORY' a company based in Mohammedia, Morocco. TeethSeg uses the deep learning model MeshSegNet to do the segmentation. In the front end it's build using Vite with Reactjs and librairies for 3D like ThreeJS and VTKjs. In the backend, its using a RESTful API created with FastAPI (Python) and deployed to the AWS Cloud (AWS ECR + LAMBDA + API GATEWAY). When asked how does TeethSeg work  explain briefly how MeshSegNet works for segmenting the 3D model of Teeths. To Get Started please create an account or sign in using either Google or Github, then head to the Start page, there you have two options either to upload an OBJ file and get a segmentation of the file, after that you can visualize the segmentation and download the file as VTP. The second option is to visualize that VTP file by clicking 'Visualize File'. Answer as short and concise as possible"
        }

        const apiRequestBody = {
            'model': "gpt-3.5-turbo",
            messages: [
                systemMessage,
                ...apiMessages,
            ]
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
                const response = data.choices[0].message.content;
                setMessages([
                    ...chatMessages,
                    {
                        message: response,
                        sender: "ChatGPT",
                        role: "system"
                    },
                ]);
                setTyping(false);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }

    const auth = getAuth();
    const user = auth.currentUser;
    const photoURL = user.photoURL;

    return (
        <div className="bg-white fixed bottom-4 right-4 w-80 border-4 border-white rounded-lg shadow-lg mb-20">
            <div className="h-24 py-5 text-center text-white bg-gradient-to-r from-sky-500 to-blue-600 rounded-lg ">
                <div className="flex items-center justify-center t">
                   <Bot className="text-white" size={28}/>
                    <h2 className="text-white px-2 font-bold text-xl">TeethSeg<span className="font-normal">Bot</span></h2> 
                </div>
                <div>
                    <p className="text-muted pt-2 ">Do you have any questions?</p>
                </div>
            </div>
            <div className="h-96 overflow-y-auto mb-4 mt-2">
                    <MainContainer
                        className="md:h-full border-0"
                    >
                        <ChatContainer>
                            <MessageList
                                scrollBehavior="smooth"
                                typingIndicator={
                                    typing ? (
                                        <TypingIndicator content="TeethSegBot is typing" />
                                    ) : null
                                }
                                className="text-white"
                            >
                                {messages.map((message, i) => {
                                    if (message.role === "system") {
                                        return <>
                                            <Message key={i} model={message} className="pt-2" avatarPosition="tl">
                                                <Avatar src="https://cdn-icons-png.flaticon.com/512/4712/4712009.png" className="p-1" size="md" status="available"/>
                                            </Message>
                                        </>
                                        
                                    } else {
                                        return <>
                                            <Message key={i} model={message} className="pt-2 rounded">
                                                <Avatar src={photoURL} size="md" status="available"/>
                                            </Message>
                                        </>
                                    }
                                })}
                            </MessageList>
                            <MessageInput
                                className="bg-slate-600"
                                placeholder="Your message here..."
                                onSend={generateChat}
                                attachButton={false}
                            />
                        </ChatContainer>
                </MainContainer>
            </div>
        </div>
    );
};

export default ChatBot;
