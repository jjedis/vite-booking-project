import jwt from "jsonwebtoken";

export function authenticateAdmin(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({error: "no token provided"});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== "admin"){
            return res.status(403).json({ error: "you are not admin" });
        }
        req.user = decoded;

        next();
    } catch {
        return res.status(403).json({error: "Invalid token"})
    }
}