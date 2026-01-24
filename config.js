import OpenAI from 'openai';
// 1. Import and configure dotenv
import 'dotenv/config';

/** Ensure the OpenAI API key is available and correctly configured */
if (!process.env.VITE_OPENAI_API_KEY) {
    throw new Error("OpenAI API key is missing or invalid.");
}

/** OpenAI config */
export default new OpenAI({
    apiKey: process.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});