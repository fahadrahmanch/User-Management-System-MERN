import jwt, { SignOptions } from 'jsonwebtoken';

const accessSecret = process.env.ACCESS_SECRET;
const refreshSecret = process.env.REFRESH_SECRET;
const accessExpiry = process.env.ACCESS_EXPIRY || '15m';
const refreshExpiry = process.env.REFRESH_EXPIRY || '7d';
export const generateTokens=(userId:any)=>{
    if (!accessSecret || !refreshSecret) {
        throw new Error("JWT secret keys are missing in .env");
      }

    const accessToken=jwt.sign({id:userId},accessSecret,{
        expiresIn:accessExpiry
     }as SignOptions
    )
     const refreshToken=jwt.sign(
        {id:userId},refreshSecret as jwt.Secret,
        {expiresIn:refreshExpiry}as SignOptions
    )
    return { accessToken, refreshToken };
}