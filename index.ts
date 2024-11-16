import { web } from "./src/app/web";

const port: number = parseInt(Bun.env.PORT as string) || 8000;

web.listen(port, () => {
  console.info(`app start at port ${port}`);
});
