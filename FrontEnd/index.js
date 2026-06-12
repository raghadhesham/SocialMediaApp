const clientIo = io("http://localhost:3000", {
  auth: {
    authorization:`user ${localStorage.getItem("authorization")}`
  }
});
clientIo.emit("Hi",{"socketId":localStorage.getItem("socketId")})
clientIo.on("SayHi", (data) => { //acknowledgement
  console.log(data);
}) 