import { Server } from "socket.io";
import { Server as httpServer } from "http";
import redisServices from "../../common/services/redis.services";
class SocketGateway {
  constructor() {}
  initIo = async (httpServer: httpServer) => {
    const io = new Server(httpServer, {
      cors: {
        origin:"*"
      }
    });
    io.use(async (socket, next) => {
      try {
        console.log(socket);
      } catch (error: any) {
        next(new Error(error.message, error.stack));
      }
    });
    io.on("connection", async (socket: any) => {
      await redisServices.addSocket(socket.data.userId, socket.id);
      socket.on("disconnect", async () => {
        await redisServices.removeSocket(socket.data.userId, socket.id);
      });
    });
  };
}
export default new SocketGateway();