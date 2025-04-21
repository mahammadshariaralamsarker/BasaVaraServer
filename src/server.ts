import mongoose from 'mongoose';
import app from './app';

async function server() {
  //changed over here the uri to test the project
  try {
    await mongoose.connect(
      'mongodb+srv://basaAdmin:3AkUrObBF1jSRBUw@cluster0.mrd4l.mongodb.net/basaVara?retryWrites=true&w=majority&appName=Cluster0'
    );

    app.listen(5000, () => {
      console.log(`Basa Vara Server is running on port   - Alhamdulillah`);
    });
  } catch (error) {
    console.error(error);
  }
}

server();
