import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import PostRouter from "./routes/postRouter.js";
import TodosRouter from "./routes/TodosRouter.js";

const connectionString = "mongodb://127.0.0.1:27017/todosapi";
import todoModel from "./models/todo.js";

const app = express();
const PORT = 3000;

function setCacheControl(req, res, next) {
  // Set the Cache-Control header to prevent caching
  res.setHeader("Cache-Control", "no-store"); // This prevents caching entirely

  // You can adjust the Cache-Control header as needed
  // For example, to allow caching for a specific duration:
  // res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour

  next(); // Continue with the request/response cycle
}

app.use(express.json());
app.use(setCacheControl);
app.use(cors());

/* SETTING UP ROUTES FOR THE API */
app.get("/", (req, res) => {
  res.status(200).send("This is the root for the API");
});
app.use("/posts", PostRouter);
app.use("/todos", TodosRouter);

/*


mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

app.listen(PORT, 'localhost', () => {

    console.log(`App is running usin port ${PORT}`);

});

*/

// Connect to MongoDB and start the server
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected"); // Debugging statement
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err); // Debugging statement
  });
