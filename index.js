const express = require('express');
const app = express();

let reqNum = 0;

app.get('/', (req, res) => {
  res.send({ bye: 'buddy', reqNum: ++reqNum });
});

const PORT = process.env.PORT || 11905;
app.listen(PORT);