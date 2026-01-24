import openai from "./config.js";
import content from "./content.js";
import { supabase } from './utils/supabase.js'
// User query about podcasts
const query = "Jammin' in the Big Easy";
// const query = "Decoding orca calls";
// const query = "What can I listen to in half an hour?";
// const query = "Something peaceful and relaxing";
// const query = "egyptian history"
// const query = "Training puppies";


const createEmbedding = async (input) => {
  const embeddingResponse = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: input,
    encoding_format: "float",
  });
  return embeddingResponse.data[0].embedding;
}

const findNearestMatch = async (embedding) => {
  const { data } = await supabase.rpc('match_documents', {
    query_embedding: embedding,
    match_threshold: 0.50,
    match_count: 1
  });
  return data;
}

const generateResponseMsg = async (query, context) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: "You are an enthusiastic podcast expert who loves recommending podcasts to people. You will be given two pieces of information - some context about podcasts episodes and a question. Your main job is to formulate a short answer to the question using the provided context. If you are unsure and cannot find the answer in the context, say, 'Sorry, I don't know the answer.' Please do not make up the answer."
      },
      {
        role: 'user',
        content: `Question: ${query}
        Context: ${context}`
      }
    ]
  });
  return response.choices[0].message.content;
}

const main = async (inputs = []) => {
    const promises = inputs.map(async (item) => {
      const embedding = await createEmbedding(item);
      const match = await findNearestMatch(embedding);
      
      if (match && match.length > 0) {
        const context = match.map(m => m.content).join('\n');
        console.log(`Context found for '${item}':`, match[0].content);
        
        const answer = await generateResponseMsg(item, context);
        console.log("Final Answer:", answer);
        return { item, match, answer };
      } else {
        console.log(`No context found for '${item}'`);
        return { item, match: [], answer: null };
      }
    });

    await Promise.all(promises);
}

main([query]);