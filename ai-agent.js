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
           provided to you rather than giving basic, generic answers.` },
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

        // const responseText = response.choices[0].message.content
        // console.log(JSON.stringify(response, null, 2))

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
                    role: "user",
                    content: `Function ${fnName} returned: ${fnResult}`
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

/**
{
  id: 'resp_02411a88dc7027a2006981d0e62a4c819da5f3b77bd8f94e37',
  object: 'response',
  created_at: 1770115302,
  status: 'completed',
  background: false,
  billing: { payer: 'developer' },
  completed_at: 1770115303,
  error: null,
  frequency_penalty: 0,
  incomplete_details: null,
  instructions: null,
  max_output_tokens: null,
  max_tool_calls: null,
  model: 'gpt-3.5-turbo-0125',
  output: [
    {
      id: 'fc_02411a88dc7027a2006981d0e76a04819d868460633d95efdc',
      type: 'function_call',
      status: 'completed',
      arguments: '{}',
      call_id: 'call_RUj99SYj5vFDkEV9EXyDS4vx',
      name: 'getLocation'
    }
  ],
  parallel_tool_calls: true,
  presence_penalty: 0,
  previous_response_id: null,
  prompt_cache_key: null,
  prompt_cache_retention: null,
  reasoning: { effort: null, summary: null },
  safety_identifier: null,
  service_tier: 'default',
  store: true,
  temperature: 1,
  text: { format: { type: 'text' }, verbosity: 'medium' },
  tool_choice: 'auto',
  tools: [
    {
      type: 'function',
      description: null,
      name: 'getCurrentWeather',
      parameters: [Object],
      strict: true
    },
    {
      type: 'function',
      description: null,
      name: 'getLocation',
      parameters: [Object],
      strict: true
    }
  ],
  top_logprobs: 0,
  top_p: 1,
  truncation: 'disabled',
  usage: {
    input_tokens: 79,
    input_tokens_details: { cached_tokens: 0 },
    output_tokens: 10,
    output_tokens_details: { reasoning_tokens: 0 },
    total_tokens: 89
  },
  user: null,
  metadata: {},
  output_text: ''
}
 */