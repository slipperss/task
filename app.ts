import * as express from 'express';
import router from "./src/routes/userRouter";

const app = express();
app.use(express.json());
app.use(router);

export default app;
