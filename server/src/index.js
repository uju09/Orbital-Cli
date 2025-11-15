import Express from 'express';
import dotenv from "dotenv";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import cors from "cors";

dotenv.config();
const app = Express();

app.use(cors(
    {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    }
));
app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use(Express.json());

app.get('/api/me', async (req, res) => {
    const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
    });
    return res.json(session);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
