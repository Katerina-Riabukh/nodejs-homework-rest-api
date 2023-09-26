const app = require("./app");

const port = process.env.PORT || 7000;

app.listen(port, () => {
  console.log(`Server running. Use our API on port: ${port}`);
});

// app.listen(3000, () => {
//   console.log(`Server running. Use our API on port: 3000`);
// });
