import { Configuration, OpenAIApi } from 'openai';

export class OpenAIProvider {
  private openai: OpenAIApi;
  private MAX_TOKEN_COUNT: number = 4096;

  constructor(apiKey: string, private model: string) {
    const openaiConfig = new Configuration({ apiKey });
    this.openai = new OpenAIApi(openaiConfig);
  }

  generateCompletion = async (prompt: string): Promise<string | null> => {
    const max_tokens = this.MAX_TOKEN_COUNT - this.countTokens(prompt) - 10;

    const openaiResponse = await this.openai.createChatCompletion({
      model: this.model,
      messages: [{ role: 'system', content: prompt }],
      max_tokens,
      n: 1,
      temperature: 0,
    });

    const code = openaiResponse.data.choices[0].message?.content;

    return code as string;
  };

  countTokens(text: string): number {
    const wordRegex = /[\w']+/g;
    const punctRegex =
      /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-./:;<=>?@\[\]^_`{|}~]/g;

    const wordTokens = text.match(wordRegex) || [];
    const punctTokens = text.match(punctRegex) || [];
    const spaceTokens = text.split(' ').length - 1;

    const tokenCount = wordTokens.length + punctTokens.length + spaceTokens;
    return tokenCount;
  }
}
