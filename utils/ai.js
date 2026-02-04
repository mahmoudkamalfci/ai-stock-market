import openai from "../config.js";
import { supabase } from './supabase.js';
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
const contentObj = {
  podcasts: `You are an enthusiastic podcast expert who loves recommending podcasts to people.
   You will be given two pieces of information - some context about podcasts episodes and a question.
    Your main job is to formulate a short answer to the question using the provided context.
     If you are unsure and cannot find the answer in the context, say, 'Sorry, I don't know the answer.
     ' Please do not make up the answer.`,
     movies: `You are an enthusiastic movie expert who loves recommending movies to people. 
     You will be given two pieces of information - some context about movies and a question.
      Your main job is to formulate a short answer to the question using the provided context. 
      If the context contains multiple movie recommendations that fit the user's query, please mention all of them.
      If the answer is not given in the context, find the answer in the conversation history if possible.
       If you are unsure and cannot find the answer, say, "Sorry, I don't know the answer.
       " Please do not make up the answer. Always speak as if you were chatting to a friend.`,
}

const chatHistory = [];


export const createEmbedding = async (input) => {
  try {
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: input,
      encoding_format: "float",
    });
    return embeddingResponse.data[0].embedding;
  } catch (error) {
    console.error("Error creating embedding:", error);
    throw error;
  }
}

export const findNearestMatch = async (embedding, functionName) => {
  try {
    const { data } = await supabase.rpc(functionName, {
      query_embedding: embedding,
      match_threshold: 0.50,
      match_count: 4
    });
    return data.map((item) => item.content).join('\n');
  } catch (error) {
    console.error("Error finding nearest match:", error);
    throw error;
  }
}

export const generateResponseMsg = async (query, context, type = 'podcasts') => {
  console.log(context);
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      temperature: 0.5,
      frequency_penalty: 0.5,
      messages: [
        {
          role: 'system',
          content: contentObj[type]
        },
        ...chatHistory,
        {
          role: 'user',
          content: `Question: ${query}
        Context: ${context}`
        }
      ]
    });
    chatHistory.push({
      role: 'assistant',
      content: response.choices[0].message.content
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating response:", error);
    throw error;
  }
}

export const splitDocument = async (document) => {
  try {
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 150,
      chunkOverlap: 30,
    });
    const output = await splitter.createDocuments([document]);
    return output;
  } catch (error) {
    console.error("Error splitting document:", error);
    throw error;
  }
}

export const createDocumentEmbeddings = async (documents) => {
  try {
    const promises = documents.map(async (document) => {
      const embedding = await createEmbedding(document.pageContent);
      return embedding;
    });
    const results = await Promise.all(promises);
    return results;
  } catch (error) {
    console.error("Error creating document embeddings:", error);
    throw error;
  }
}

export const storeEmbeddings = async (embeddings) => {
  try {
    const { data, error } = await supabase.from('movies').insert(embeddings);
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error storing embeddings:', error);
    throw error;
  }
}