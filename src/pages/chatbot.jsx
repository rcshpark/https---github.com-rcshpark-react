import { useState } from "react";
import {MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

const API_KEY = process.env.OPEN_API_KEY;

const ChatBot = () =>{

const [typing, setTyping] = useState(false)
  const [messages , setMessages] = useState([
    {
      message: "안녕하세요 무엇을 도와드릴까요? ",
      sender: "ChatGPT"
    }
  ]);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing"
    }

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    setTyping(true);
    await processMesaageToChatGPT(newMessages);
  }

  async function processMesaageToChatGPT(chatMessages){
    let apiMessages = chatMessages.map((value)=> {
      let role ="";
      if(value.sender == "ChatGPT"){
        role = "assistant"
      } else{
        role ="user"
      } return {role: role, content: value.message}
    });
    const systemMessage = {
      role : "system",
      content: "test"
    }
    const apiRequestBody = {
      prompt: chatMessages.map((message) => message.message).join("\n") + "\n",
      max_tokens: 1024,
      temperature:0.7,
      n:1,
      stop:".",

    }
    await fetch("https://api.openai.com/v1/engines/text-davinci-003/completions", {
      method : "POST",
      headers: {
        "Authorization" : "Bearer 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",
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(apiRequestBody),
    }).then((data)=>{
      return data.json();
    }).then((data)=>{
      console.log(data);
      setMessages(
        [...chatMessages, {
          message: data.choices[0].text,
          sender:"ChatGPT"
        }]
      );
      setTyping(false);
    });
  }
  return (
    <div>
      <div style={{position: "relative", height: "800px", width: "700px"}}>
        <MainContainer>
          <ChatContainer>
            <MessageList
              typingIndicator ={typing ? <TypingIndicator content="ChatGPT is typing"/>: null}>
              {messages.map((message, i)=> {
                return <Message key = {i} model= {message}/>
              })}
            </MessageList>
            <MessageInput placeholder="type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}
export default ChatBot;
