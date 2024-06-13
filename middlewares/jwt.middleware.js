import jwt from "jsonwebtoken";

export const verifyTokenJWT = (req, res, next) => {
    try {
        let token = req.cookies.token;

        if (!token) {
            throw { ok: false, msg: "No autorizado!" };
        }

        const payload = jwt.verify(token, process.env.SECRET_JWT);

        const emailToken = payload.email;

        next(); 
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: "No autorizado"
        });
    }
};
