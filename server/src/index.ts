require("dotenv").config();
require("./auth/googleAuth");
require("./auth/localAuth");
import { Request, Response, NextFunction } from "express";
import express from "express";
import morgan from "morgan";
import routers from "./routes/index";
import { dbConn } from "./db";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path";
import { ActualizarApi } from "./controllers/actives";
const app: any = express();

const frontDeployUrl = process.env.FRONT_DEPLOY_URL

//Conectamos socket
import { Server as SocketServer } from "socket.io";
let http = require("http");
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: ["http://localhost:5173", "http://127.0.0.1:5173", `${frontDeployUrl}`],
    credentials: true,
  },
});
///

//Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);


app.use(morgan('dev'));

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173', `${frontDeployUrl}`],
    credentials: true,
  })
);
app.use(
  session({
    secret: "secreto",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secreto"));
app.use(passport.initialize());
app.use(passport.session());

//conectamos socket io para que escuche

io.on("connection", (socket: any) => {
  socket.on("message", (message: any) => {
    socket.emit("message", {
      body: message.body,
      from: message.from === "User" ? "me" : message.from,
    });
    socket.broadcast.emit("message", {
      body: message.body,
      from: message.from,
    });
  });
  socket.on("typing", (usuario: any) => {
    socket.broadcast.emit("typing", usuario + " is typing...");
  });
});

//para que entienda los datos que le enviamos

//multer
const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/img"),
  filename: (req: any, file: any, cb: any) => {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  },
});
app.use(multer({ storage }).single("image"));

// add exchange history routes
app.use("/", routers);

// Error catching endware.
app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.log(error);
  const name = error.name;
  const message = error.message;
  // console.error(error);
  return res.send(name + message);
});
function repetir() {
  let identificadorIntervaloDeTiempo = setInterval(() => {
    ActualizarApi();
  }, 90000);
}

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  // puerto 3001
  repetir();
  console.log(`Server listening on port ${PORT}`); // eslint-disable-line no-console
});

//Conectamos a la base de datos
dbConn();
function _(err: any): void {
  throw new Error("Function not implemented.");
}

// Export server to deploy as serveless function on vercel
module.exports = server;