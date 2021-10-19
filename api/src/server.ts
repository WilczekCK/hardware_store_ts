import morgan from "morgan";
import Router from "./routes";
import {app, express} from './app';

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

app.use(Router);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});