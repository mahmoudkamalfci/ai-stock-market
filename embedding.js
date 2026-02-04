import content from "./content.js";
// User query about podcasts
const query = "Jammin' in the Big Easy";
// const query = "Decoding orca calls";
// const query = "What can I listen to in half an hour?";
// const query = "Something peaceful and relaxing";
// const query = "egyptian history"
// const query = "Training puppies";


import { createEmbedding, findNearestMatch, generateResponseMsg } from "./utils/ai.js";

const main = async (inputs = []) => {
    const promises = inputs.map(async (item) => {
      const embedding = await createEmbedding(item);
      const match = await findNearestMatch(embedding, 'match_documents');
      
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