import mongoose from "mongoose";
import app from "./app";

async function server() {
  //changed over here the uri to test the project
  try {
    await mongoose.connect(
      "mongodb+srv://basaVara:ek89W9mm2ix9rQhb@cluster0.mh62rbj.mongodb.net/BasaVara?retryWrites=true&w=majority&appName=Cluster0"
    );
// test
    app.listen(5000, () => {
      console.log(`Basa Vara Server is running on port   - Alhamdulillah`);
    });
  } catch (error) {
    console.error(error);
  }
}

server();
