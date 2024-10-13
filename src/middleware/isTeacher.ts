import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const isTeacher = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // const token = req.headers.authorization?.split(" ")[1];
    const token = req.cookies.token;

    const decoded = jwt.verify(token!, process.env.JWT_SECRET as string) as JwtPayload;

    if (decoded.role !== "teacher") {
      res.status(400).json({ message: "Access denied: Teachers only" });
      return;
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" + error });
  }
};
