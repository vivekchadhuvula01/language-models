import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { config } from "dotenv";
config();

const model = new ChatGroq({
    model: "llama-3.1-70b-versatile",
    apiKey: process.env.GROQ_API_KEY,
    temperature: 0.6
});

const messages = [
    new SystemMessage("Translate the following from English into {language}"),
    new HumanMessage("hi!"),
];

const parser = new StringOutputParser();
// const result = await model.invoke(messages);
// await parser.invoke(result)

// chaining together

const chain = model.pipe(parser)


// console.log(res)
// prompt templates
const systemTemplate = "Translate the following into native {language}:";
const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system", systemTemplate],
    ["user", "{text}"],
]);

const promptValue = await promptTemplate.invoke({
    language: 'german',
    text: 'how are you',
});


const languageAssistChain = promptTemplate.pipe(model).pipe(parser);
const result = await languageAssistChain.invoke({ language: 'french', text: "i am very tall" });
const history = []
history.push(result)
console.log(history)