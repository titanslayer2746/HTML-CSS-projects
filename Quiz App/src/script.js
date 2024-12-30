import { GoogleGenerativeAI } from "@google/generative-ai";

const generateQuiz = async(difficulty,topic) => {
    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
      var prompt = "(questions must be different from previous prompt) generate 10 different quiz questions in multiple choice format about storyline, plot, dialogues, cast, characters of "

      prompt += topic;
      prompt += ". a question must be no more than 15 words of difficulty "

      prompt += difficulty;
      prompt += ".Generate the result in format array of objects [{question : , options : {a: ,b: ,c: ,d: },answer : } {question : , options : {a: ,b: ,c: ,d: },answer : } {question : , options : {a: ,b: ,c: ,d: },answer : }....]"
      const result = await model.generateContent(prompt)
      const content = result.response.text();
      const pureContent = content.substring(7,content.length-4)
      const quizArray = JSON.parse(pureContent);
      return quizArray;
    } catch (error) {
      console.log("Error fetching Quiz data from gemini", error);
    }
}

export default generateQuiz;