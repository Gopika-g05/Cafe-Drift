require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db");
const orderRoutes = require("./src/routes/orderRoutes");
const PORT = process.env.PORT || 3000;
const path = require('path');

// 1. Serve all the static assets (CSS, JS, Images) inside the frontend folder
app.use(express.static(path.join(__dirname, 'frontend')));

// 2. Serve index.html as the main entry point for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});
app.use("/api/orders", orderRoutes);
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
