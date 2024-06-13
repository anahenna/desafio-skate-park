import jwt from "jsonwebtoken";

export const verifyTokenJWTadmin = (req, res, next) => {
    try {
        let token = req.cookies.token;

        if (!token) {
            throw { ok: false, msg: "No autorizado!" };
        }

        const payload = jwt.verify(token, process.env.SECRET_JWT);

        const { email, isAdmin } = payload;

        if (!isAdmin) {
            throw { ok: false, msg: "Acceso no autorizado para administradores!" };
        }

        // Puedes almacenar el email o el rol en req.user para usarlo en controladores
        req.user = { email, isAdmin };

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: "No autorizado"
        });
    }
};
