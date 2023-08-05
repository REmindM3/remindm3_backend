const { app, HOST, PORT } = require("./server");

app.listen(PORT , HOST, () => {
  console.log(`<--- Server Is Running On Port ${PORT} --->`);
});
