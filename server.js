require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db");
const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () =>
      console.log(`Drift Cafe backend listening on port ${PORT}`),
    );
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
})();