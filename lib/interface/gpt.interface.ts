/**
 * Interface for defining a message with a role and content.
 */
export interface Message {
  role: string; // The role of the message, e.g. 'user', 'bot'.
  content: string; // The content of the message.
}

/**
 * Interface for defining the completion parameters for a GPT request.
 */
export interface Completion {
  model: string; // The name or ID of the model to use.
  messages: Message[]; // An array of messages for the completion.
  max_tokens: number; // The maximum number of tokens to generate.
  n: number; // The number of completions to generate.
  temperature: number; // The temperature for sampling.
}