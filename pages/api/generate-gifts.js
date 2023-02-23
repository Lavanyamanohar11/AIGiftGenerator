import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
    const { priceMin, priceMax, gender, age, hobbies } = req.body;
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: generatePrompt(priceMin, priceMax, gender, age, hobbies),
      temperature: 0.6,
      max_tokens: 2048,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  }

function generatePrompt(priceMin, priceMax, gender, age, hobbies) {
    return `suggest 3 Christmas gift ideas between ₹${priceMin} and ₹${priceMax} for a ${age} years old ${gender} that is into ${hobbies}.`;
    // return `suggest 3 project ideas of difficulty level medium for a senior developer which can be completed within 3 to 4 weeks involving the tech stack react.js, nodejs and mongodb.`;
    // return  `suggest me 15 ideas that you can generate like "Birthday gifts", "Projects for Resume", "Book suggesstions" etc.`;
    // return `You are my personal fitness instructor. I want you to give me an Chennai style diet plan which can help me to reduce weight. My height is 5 feet and my weight is 65 Kilograms.`
  }