import OpenAI from "openai";

export async function GetOpenAIClient() {
    return new OpenAI();
}

export async function CreateChatCompletion(openai: OpenAI, prompt: string, { model = "gpt-4o", max_tokens = undefined}: CreateChatCompletionOptions) {
    return await openai.chat.completions.create({
        messages: [{ role: "system", content: prompt }],
        model: model,
        max_tokens: max_tokens
      });
}

export type CreateChatCompletionOptions = {
    model?: string,
    max_tokens?: number | undefined;
}