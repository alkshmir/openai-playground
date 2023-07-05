require('dotenv').config();
const readline = require('readline');
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function get_chatbot_reply(input, prev_message = []){
    if (prev_message.length === 0){
        prev_message = [
            {role: "system", content: "あなたは学校の先生です。"},
        ]
    }
    prev_message.push({role: "user", content: input})
    const chatCompletion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: prev_message,
    });
    //console.log(chatCompletion.data.choices[0].message);
    console.log(chatCompletion.data.usage);
    return prev_message.concat(chatCompletion.data.choices[0].message);
}

// 標準入力を受け取る関数
function getInput(prev_message = []) {
    rl.question('入力してください: ', async (answer) => {
      console.log(prev_message)
      // 入力をチャットボットに送信し、返答を取得
      prev_message = await get_chatbot_reply(answer, prev_message);
  
      // チャットボットの返答を表示
      console.log('GPT:', prev_message[prev_message.length - 1].content);
  
      // 次の入力を受け取る
      getInput(prev_message);
    });
}

getInput();