const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input .sent");
const chatbox = document.querySelector(".chatbox");
//const chatbotCloseBtn = Document.querySelector(".close");
//const chatbotToggler = document.querySelector(".chatbot-toggler");

let userMessage;
const API_KEY = "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";

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p></p>` : `<img class="bot" src="logo/bot.png"><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}

const generateResponse = (incomingChatLi, userMessage) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLi.querySelector("p");

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userMessage}]
        })
    }

    //sending request to API to get the response
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        messageElement.textContent = data.choices[0].message.content;
    }).catch((error) => {
        messageElement.textContent = "Something went wrong. Please try again.";
    }).finally(() => chatbox.scrollTo(0, chatbot.scrollHeight));    
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage) return;
    chatInput.value = "";

    //showing the user message into the chat box
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        //Delay in message for Thinking... time
        const incomingChatLi = createChatLi("Thinking...", "incoming") 
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi, userMessage);
    }, 600);
}
sendChatBtn.addEventListener("click", handleChat);
//chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbox"));

//chatbotCloseBtn.addEventListener("click", () => document.body.classList.remove("show-chatbox"));

