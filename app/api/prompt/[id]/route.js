import { connectToDB } from "@utils/database";
import Prompt from "@models/Prompt";
import(connectToDB);
export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Not Found", { status: 400 });
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch  promt", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();
    const extistingPrompt = await Prompt.findById(params.id);
    if (!extistingPrompt) return new Response("Not Found", { status: 400 });
    extistingPrompt.prompt = prompt;
    extistingPrompt.tag = tag;
    extistingPrompt.save();
    return new Response(JSON.stringify(extistingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to edit prompt", { status: 500 });
  }
};
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndDelete(params.id);

    return new Response("Delete Successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to Delete prompt", { status: 500 });
  }
};
