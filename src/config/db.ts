import mongoose from "mongoose";

const DEFAULT_URI = "mongodb://127.0.0.1:27017/ea_mongoose";

export const connectDatabase = (
  uri: string = DEFAULT_URI
): Promise<typeof mongoose> => mongoose.connect(uri);

export const disconnectDatabase = (): Promise<void> => mongoose.disconnect();