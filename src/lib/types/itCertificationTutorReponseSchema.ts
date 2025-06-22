import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

// Define the quiz question schema with a discriminator
const QuizQuestion = z.object({
    type: z.literal("quiz"),
    question: z.string(),
    options: z.array(z.string()),
    correctAnswer: z.number(),
    explanation: z.string(),
});

// Define the step-by-step explanation schema with a different discriminator
const StepByStepExplanation = z.object({
    type: z.literal("explanation"),
    // An array of steps (each step can be a string or you could even define a more detailed object)
    steps: z.array(z.string()),
    finalAnswer: z.string(),
});

// Define a regular text response schema
const TextResponse = z.object({
    type: z.literal("text"),
    text: z.string(),
});

// Create a discriminated union on "type"
const UnionResponse = z.discriminatedUnion("type", [
    TextResponse,
    QuizQuestion,
    StepByStepExplanation,
]);

// Wrap the union in an outer object so the root is an object (as required)
export const ITTutorResponseSchema = z.object({
    response: UnionResponse,
});

// Export the combined response format for use with OpenAI's Structured Outputs
export const zodResponseFormatAITutor = zodResponseFormat(ITTutorResponseSchema, 'it_certification_tutor');