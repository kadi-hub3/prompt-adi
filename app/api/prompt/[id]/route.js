//GET (READ)
//PATCH (EDIT)
//DELETE

import { connectToDB } from "@utils/database";
import Prompt from '@models/prompt';

export const GET = async (req, {params}) => {
    try {
        await connectToDB();
        const prompt = await Prompt.findById(params.id).populate('creator');
        if (!prompt) return new Response('Prompt Not Found', {status: 404})

     
        return new Response(JSON.stringify(prompt), {status: 200})
    } catch (error) {
        return new Response('Failure to fetch prompts', {status: 500})
    }
}

export const PATCH = async (req, {params}) => {
    const {prompt, tag} = await req.json();

    try {
        await connectToDB();
        const exPrompt = await Prompt.findById(params.id);
        if (!exPrompt) return new Response('Prompt Not Found', {status: 404})

        exPrompt.prompt = prompt;
        exPrompt.tag = tag;
        await exPrompt.save();
        return new Response(JSON.stringify(exPrompt), {status: 200})
    } catch (error) {
        return new Response('Failure to update the prompt', {status: 500})
    }
}

export const DELETE = async (req, {params}) => {
    const {prompt, tag} = await req.json();

    try {
        await connectToDB();
        await Prompt.findByIdAndDelete(params.id);

        return new Response('Prompt Deleted Successfully', {status: 200})
    } catch (error) {
        return new Response('Failure to delete the prompt', {status: 500})
    }
}