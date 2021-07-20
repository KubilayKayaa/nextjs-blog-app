import mongoose from "mongoose";

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }
  const db = await mongoose.connect(
    "mongodb+srv://zkubilaykaya:mongodb123@nodeblog.5nnky.mongodb.net/posts?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  connection.isConnected = db.connections[0].readyState;
  console.log(connection.isConnected);
}

export default dbConnect;
