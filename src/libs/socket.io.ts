export const setupSocket = (io: any) => {
  io.on("connection", (socket: any) => {
    console.log("New client connected");

    socket.on("send-message", (data: any) => {
      console.log("Received message: ", data);
      io.emit("new-message", data);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};
