import { app } from "./app";

const PORT = process.env.PORT || 5001;

app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
});
