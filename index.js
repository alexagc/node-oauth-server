const app = require('./app');

const port = process.env.PORT || 9000;

app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Express listen in port ${port} `);
});
