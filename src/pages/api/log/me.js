import dbConnect from "../../../utils/dbConnect";
import User from "../../../db/models/User";
import jwt from "jsonwebtoken";

dbConnect();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const token = req.headers.authorization.replace("Bareer ", "");
        const value = jwt.verify(token, "secretkey");
        res.status(201).json({ success: true, data: value });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
