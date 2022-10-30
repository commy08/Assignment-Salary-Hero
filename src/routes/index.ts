import express from "express";
import companyRouter from "./company.route";
import userRouter from "./user.route";
import TransactionRouter from "./transaction.route";

const router = express.Router();

router.use("/company", companyRouter);
router.use("/user", userRouter);
router.use("/transaction", TransactionRouter);

export default router;
