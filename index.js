import OpenAI from "openai";
import readllineSync from "readline-sync";
import colors from "colors";

const openai = new OpenAI();
//question method asks something and waits for an answer.
async function main() {
  console.log(colors.bold.green("Welcome to the Chatbot!"));
  console.log(colors.bold.green("You can start the conversation with the bot"));

  const chatHistory = []; //to store conversation history.

  while (true) {

    const userInput = readllineSync.question(colors.yellow("You: "));

    try {
      //construct a message by iterating through history.
      const messages = chatHistory.map(([role,content]) => ({role,content}));
     
      //add the latest user input
      messages.push({role: 'user', content: userInput});

      const completion = await openai.chat.completions.create({
        messages: messages,
        model: "gpt-3.5-turbo",
      });

      const reply = completion.choices[0].message.content;

      if (userInput.toLowerCase() === "exit"){
        console.log(colors.green('Bot: ') + reply);
        return;
      }

      console.log(colors.green('Bot: ') + reply);

      //update history with user input and bot's response.
      chatHistory.push(['user', userInput]);
      chatHistory.push(['assistant', reply]);

    } catch (error) {
      console.log(colors.red(error));
    }
  }
}

main();

// console.log(completion.choices[0]);
