import { Request, Response, NextFunction } from "express";
import { verify, JwtPayload } from "jsonwebtoken";

interface CustomRequest extends Request {
  user?: JwtPayload | string;
}

export const validateToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = verify(token.split(" ")[1], process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ message: "Invalid token." });
  }
};
