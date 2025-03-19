import express, { Request, Response } from "express";
import userRouter from "./module/user/user.router";
import authRouter from "./module/auth/auth.router";
import blogRouter from "./module/blog/blog.router";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import adminRouter from "./module/admin/admin.router";
import notFound from "./middlewares/notFound";
import { ProductRoutes } from "./module/rentalHouse/rentalHouse.routes";
import { OrderRoutes } from "./module/order/order.routes";
import cookieParser from "cookie-parser";
import cors from "cors";
import { CategoryRoutes } from "./module/category/category.routes";

const app = express();
//parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174"] }));

// middleware
app.use(express.json());

app.use("/auth", authRouter);
app.use("/", ProductRoutes);

app.use("/admin", adminRouter);

app.use("/user", userRouter);
app.use("/blogs", blogRouter);
app.use("/order", OrderRoutes);
app.use("/categorys", CategoryRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send({
    status: true,
    message: "Hello",
  });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
