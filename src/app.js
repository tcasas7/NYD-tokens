const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
const tokenRoutes = require("./Routes/token.routes");
const productRoutes = require("./Routes/product.routes");
const authRoutes = require("./Routes/auth.routes");
const userRoutes = require("./Routes/user.routes");
const orderRoutes = require('./Routes/order.routes');
const uploadRoutes = require("./Routes/uploads.routes")


const app = express();

const allowedOrigins = [
  "http://localhost:3001",
  "https://5d4f26f7-3001.brs.devtunnels.ms" 
];

app.use(cors({
  origin: "*", 
  credentials: true,
}));

app.use(express.json());

app.use("/uploads", express.static("uploads"))

app.use("/api", uploadRoutes)

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/tokens", tokenRoutes);
app.use("/products", productRoutes);

app.get("/ping", (req, res) => {
    res.json({ message: "pong" });
  });

app.get("/", (req, res) => {
    res.send("Fan Token API is running 🐉🔥");
  });


app.use("/auth", authRoutes);

app.use("/users", userRoutes);

app.use('/orders', orderRoutes); 
  

module.exports = app;