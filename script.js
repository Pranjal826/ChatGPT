const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', async () => {
    const userMessage = userInput.value;
        appendMessage('User', userMessage);
        const response = await getChatGPTResponse(userMessage);
        appendMessage('ChatGPT', response);
    userInput.value = '';
});

async function getChatGPTResponse(userMessage) {
    const url = `https://chat-gpt-ai-bot.p.rapidapi.com/GenerateAIWritter?prompt=${encodeURIComponent(userMessage)}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '471be68f42msha0308a17dc97e8fp14c46bjsna7844f63328f',
            'X-RapidAPI-Host': 'chat-gpt-ai-bot.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        return result;
    } catch (error) {
        console.error(error);
        return 'An error occurred while fetching the response.';
    }
}

function appendMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatLog.appendChild(messageElement);
    chatLog.scrollTop = chatLog.scrollHeight;
}
