export const KAFKA_BROKER = process.env.KAFKA_BROKER || "localhost:9092";
export const USER_CREATED_TOPIC = process.env.USER_CREATED_TOPIC || 'user.created';
export const USER_DELETED_TOPIC = process.env.USER_DELETED_TOPIC || 'user.deleted';

export const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
export const MONGO_DB_NAME = process.env.MONGO_DB_NAME || 'magmadb';