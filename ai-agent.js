import 'dotenv/config';
import OpenAI from 'openai';
import { getCurrentWeather, getLocation, tools } from "./utils/tools.js"


/** OpenAI config */
const openai = new OpenAI({
    apiKey: process.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

const availableFunctions = {
    getCurrentWeather,
    getLocation
}

async function agent(query) {
    const messages = [
        { role: "system",
           content: `You are a helpful AI agent. Give highly specific answers based on 
           the information you're provided. Prefer to gather information with the tools 
           provided to you rather than giving basic, generic answers.
           IMPORTANT: If you have already called a tool and received the result in the history, DO NOT call it again. Use the existing information.` },
        { role: "user", content: query }
    ]

    const MAX_ITERATIONS = 7

    for (let i = 0; i < MAX_ITERATIONS; i++) {
        console.log(`Iteration #${i + 1}`)
        const response = await openai.responses.create({
            model: "gpt-3.5-turbo",
            input: messages,
            tools
        })
        
        let hasFunctionCall = false
        for (const item of response.output) {
            if (item.type === "function_call") {
                hasFunctionCall = true
                const fnName = item.name
                const fnArgs = JSON.parse(item.arguments)
                
                console.log(`Calling function: ${fnName}`)
                
                const fnResult = await availableFunctions[fnName](fnArgs)
                console.log(`Function result: ${fnResult}`)
                
                messages.push({
                    role: "assistant",
                    content: `Calling function ${fnName} with arguments: ${item.arguments}`
                })
            }
        }
        
        if (!hasFunctionCall && response.output_text) {
            console.log(response.output_text)
            return
        }
        
    }
}

await agent("recommand me an activity to do today based on the weather in my current location")
