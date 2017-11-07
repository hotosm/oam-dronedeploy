import express from 'express';
import path from 'path';

const app = express();
app.use('/node_modules', express.static(path.resolve(__dirname, 'node_modules')));

app.use(express.static(path.join(__dirname, 'static')));
app.get('*', (req, res) => {
  res.sendfile('./static/index.html');
});
app.listen(3001);
