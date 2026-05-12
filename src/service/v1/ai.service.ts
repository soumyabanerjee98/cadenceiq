import { buildAdjustmentPrompt, buildCoachingPrompt } from '@/utils/ai.util.js';
import 'dotenv/config';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const generateCoachInsights = async (input: CoachInput) => {
  const prompt = buildCoachingPrompt(input);

  const completion = await groq.chat.completions.create({
    model: 'openai/gpt-oss-20b',
    messages: [
      {
        role: 'system',
        content:
          'You are a professional cycling coach. Give concise, actionable advice.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.7,
  });
  const content = completion.choices[0]?.message?.content || '';
  try {
    return JSON.parse(content);
  } catch (error) {
    console.log('Error parsing AI response: ', error);
    return { error: 'Failed to parse AI response' };
  }
};

export const adjustPlanWithAI = async (input: CoachInput) => {
  const prompt = buildAdjustmentPrompt(input);

  const completion = await groq.chat.completions.create({
    model: 'openai/gpt-oss-20b',
    messages: [
      {
        role: 'system',
        content:
          'You are an expert cycling coach who modifies training plans safely.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.4, // lower = more stable edits
  });

  const content = completion.choices[0]?.message?.content || '';

  try {
    return JSON.parse(content);
  } catch (error) {
    console.log('Error parsing AI response: ', error);
    return { error: 'Failed to parse AI response' };
  }
};
