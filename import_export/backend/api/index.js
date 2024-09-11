const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const fileRoutes = require("../routes/file");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();

app.use(bodyParser.json());
// Middleware
app.use(express.json());

// const allowedOrigin = [
//   "https://starter-app-frontend-hu3hv2hi2-zaki-oxcytechs-projects.vercel.app/",
//   "https://starter-app-frontend.vercel.app/",
// ];

// const corsOptions = {
//   origin: function (origin, callback) {
//     // console.log("Origin: ", allowedOrigin.indexOf(origin));
//     if (allowedOrigin.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("CORS Error"));
//     }
//   },
//   methods: "GET,PATCH,POST,PUT,DELETE",
// };
// app.use(cors(corsOptions));

// app.use(
//   cors({
//     origin:
//       "https://starter-app-frontend-hu3hv2hi2-zaki-oxcytechs-projects.vercel.app",
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     allowedHeaders: "Content-Type,Authorization",
//   })
// );
app.use(cors())
app.use(helmet());

// Routes

app.use("/file", fileRoutes);

app.get("/", (req, res) => {
  res.send("Working");
});

// Error handling middleware (optional)
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: "Something went wrong!" });
// });

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
