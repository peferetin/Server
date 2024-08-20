import jwt from 'jsonwebtoken'



const verifyToken = async (req, res, next) => {
    // We check if in the header we do have a key Authorization
    const token = req.header('Authorization')
    // If it is not the case we return an Access denied
    if (!token) {
        return res.status(401).json({ error: 'Access denied, no token provided' })
    }

    try {
        // We verify the token with the JWT_SECRET, the same secret used to sign the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    }
    catch (err) {
        res.status(400).json({ error: 'Invalid token' })
    }


}



export default verifyToken