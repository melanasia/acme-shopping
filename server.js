const app = require("./app");
const { syncAndSeed } = require("./db/seedData/syncAndSeed");

const setUp = async () => {
  try {
    syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (ex) {
    console.log(ex);
  }
};

setUp();
