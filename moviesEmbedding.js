import {
    createEmbedding,
    findNearestMatch,
    generateResponseMsg,
} from "./utils/ai.js";


// const query = "Which movie can I take my child to?";
// const query = "Which movie will give me an adrenaline rush?";
const query = "The movie with that actor from Castaway";

const form = document.querySelector('form');
const input = document.querySelector('input');
const reply = document.querySelector('.reply');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    main(input.value);
    input.value = '';
});

const main = async (input) => {
    try {
        reply.innerHTML = "Thinking..."

        const embedding = await createEmbedding(input);
        const match = await findNearestMatch(embedding, 'match_movies');
        const response = await generateResponseMsg(input, match, 'movies');
        reply.innerHTML = response;
    } catch (error) {
        console.error("Error in main process:", error);
        reply.innerHTML = "Sorry, something went wrong. Please try again.";
        throw error;
    } finally {
        console.log("Main process completed.");
    }
}
