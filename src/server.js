import express from 'express';
import cors from 'cors';
import path from 'path';
import config from './config'

const { PORT } = config;

const app = express();
app.use(cors(
  {
    origin: [
      'http://localhost:3000',
    ],
    credentials: true
  }
));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Serve static files
app.use(express.static(path.join(__dirname, '../client/build')));

//Catch
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
