const app = require("./app");
const { sequelize } = require("./models");

app.listen({ port: 3000 }, async () => {
  console.log("Server Up on http://localhost:3000");
  await sequelize.authenticate();
  console.log("Database connected!");
});
