import mongoose from "mongoose";
import app from "./app";

async function server() {
  //changed over here the uri to test the project
  try {
    await mongoose.connect(
      "mongodb+srv://admin:admin@project-1.gtysu.mongodb.net/assingment-6?retryWrites=true&w=majority&appName=Project-1"
    );

    app.listen(5000, () => {
      console.log(`Basa Vara Server is running on port   - Alhamdulillah`);
    });
  } catch (error) {
    console.error(error);
  }
}

server();
