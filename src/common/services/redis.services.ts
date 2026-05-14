import { createClient, RedisClientType } from "redis";
import { config } from "../../config/config.services";
import { AppError } from "../utils/response/global-error-handler";
import { Types } from "mongoose";

class RedisService {
  private readonly _client: RedisClientType;
  constructor() {
    this._client = createClient({
      url: config.db.REDIS_URL!, //adding non null to prevent the error of rgument of type '{ url: string | undefined; }' is not assignable to parameter of type 'Redis_clientOptions<RedisModules
    });
    this.handleEvents();
  }
  handleEvents() {
    this._client.on("error", (error) => {
      console.log(
        "Failed to connect to Redis",
        error,
        error.stack,
        error.message,
      );
    });
  }
  connect = async () => {
    this._client.connect();
    console.log("Connected to Redis successfully");
  };
  setRedisValue = async ({
    key,
    value,
    ttl,
  }: {
    key: string;
    value: string;
    ttl?: number;
  }) => {
    return ttl
      ? this._client.set(key, value, { EX: ttl })
      : this._client.set(key, value);
  };
  getRedisValue = async (key: string) => {
    if (!(await this.redisValueExists(key))) {
      throw new AppError("Key Doesn't exist", 404);
    }
    return this._client.get(key);
  };
  mGetRedisValue = async (keys: string[]) => {
    return this._client.mGet(keys);
  };
  updateRedisValue = async ({
    key,
    value,
    ttl,
  }: {
    key: string;
    value: number;
    ttl?: number;
  }) => {
    if (!(await this.redisValueExists(key))) {
      throw new AppError("Key Doesn't exist", 404);
    }
    return ttl
      ? this._client.set(key, value, { EX: ttl })
      : this._client.set(key, value);
  };
  deleteRedisValue = async (key: string) => {
    if (!(await this.redisValueExists(key))) {
      throw new AppError("Key Doesn't exist", 404);
    }
    return this._client.del(key);
  };
  redisValueExists = async (key: string) => {
    return this._client.exists(key);
  };
  incrementRedisValue = async (key: string) => {
    if (!(await this.redisValueExists(key))) {
      throw new AppError("Key Doesn't exist", 404);
    }
    try {
      return await this._client.incr(key);
    } catch (error) {
      throw new Error("Couldn't increment key");
    }
  };
  otp_key = (email: string, subject: string) => {
    return `otp::${email}::${subject}`;
  };
  ban_key = (email: string, subject: string) => {
    return `banned::${this.otp_key(email, subject)}`;
  };
  key(userId: Types.ObjectId) {
    return `user:FCM:${userId}`;
  }
   async addFCM(userId: Types.ObjectId, FCMToken: string) {
    return await this._client.sAdd(this.key(userId), FCMToken);
  }
  async removeFCM(userId: Types.ObjectId, FCMToken: string) {
    return await this._client.sRem(this.key(userId), FCMToken);
  }
  async getFCM(userId: Types.ObjectId) {
    return await this._client.sMembers(this.key(userId));
  }
  async hasFCM(userId: Types.ObjectId) {
    return await this._client.sCard(this.key(userId));
  }
  async removeFCMUser(userId: Types.ObjectId) {
    return await this._client.del(this.key(userId));
  }
}
export default new RedisService();
