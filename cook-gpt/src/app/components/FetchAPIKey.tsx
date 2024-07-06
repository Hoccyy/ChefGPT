import dotenv from 'dotenv';
dotenv.config();

export const FetchAPIKey = (): string | undefined => {
    return process.env.NEXT_PUBLIC_GPT_API_KEY13;
};
  