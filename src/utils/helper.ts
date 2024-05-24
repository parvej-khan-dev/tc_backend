require('dotenv').config();
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt"


export const decodeToken = (token: string): any => {

    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
        if (err) {
            throw err;
        }
        return decoded
    });
};

export const signedToken = (payload: string | object) => {
    return jwt.sign(
        {
            data: payload,
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn: '24h',
        }
    );

}

export const hashPassword = (password: string) => {
    return bcrypt.hashSync(password, Number(process.env.SALT));
}

export const comparePassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
}

