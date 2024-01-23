import dotenv from 'dotenv';    dotenv.config();
import OpenAI from "openai";

import CatchAsync from '../Error/CatchAsync.js';







const openai = new OpenAI({
    apiKey: process.env.OPENAI_API
});



export const postChat = CatchAsync(async (req, res, next) => {

    const prompt = req.body.msg;

    const completion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: prompt }
        ],
        model: "gpt-3.5-turbo",
        max_tokens: 2,
    });

    console.log(completion.choices[0]);

    const response = completion.choices[0].message;
    // const response = {
    //     role: 'assistant',
    //     content: 'This is mock response'
    // };


    res.json({
        status: "success",
        message: response,
    })


})



