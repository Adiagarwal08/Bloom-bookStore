import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bookRoutes from "./routes/books.js";
import cartRoutes from "./routes/cart.js";
import wishlistRoutes from "./routes/wishlist.js";
import userRoutes from "./routes/user.js";
import passport from "passport";
import "./controllers/authController.js";
import authRoutes from "./routes/auth.js";
import MongoStore from "connect-mongo";
import session from "express-session";
import emailRoutes from "./routes/email.js";
import cors from "cors";
dotenv.config();

//express app
const app = express();

//middleware
app.use(express.json());
app.use(
  cors({
    origin: ["https://bloom-book-store.vercel.app", "http://localhost:3000"],
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Ensure this is set in .env
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI, // Store sessions in MongoDB
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day expiration
      httpOnly: true, // Security: prevents XSS attacks
      secure: process.env.NODE_ENV === "production", // Enable secure cookies in production
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

app.use((req, res, next) => {
  req.headers["x-forwarded-proto"] = req.headers["x-forwarded-proto"] || "http";
  next();
});

// 🔹 SESSION MIDDLEWARE

app.use("/auth", authRoutes);

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/books", bookRoutes);

app.use("/api/carts", cartRoutes);

app.use("/api/wishlists", wishlistRoutes);

app.use("/api/user", userRoutes);

app.use("/api/email", emailRoutes);

//connect to mongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Connected to db & listening on port ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
