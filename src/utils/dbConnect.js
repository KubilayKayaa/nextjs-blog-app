import mongoose from "mongoose";

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }
  const db = await mongoose.connect(
    "mongodb+srv://devadmin:devadmin123@cluster0.wgqzk.mongodb.net/newBlog?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  connection.isConnected = db.connections[0].readyState;
  console.log(connection.isConnected);
}

export default dbConnect;
