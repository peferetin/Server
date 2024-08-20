import User from '../models/userModel.js'


const checkAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        if (!user || !user.isAdmin) {
            return res.status(403).json({ error: 'Access denied, admin only' })
        }
        next()
    }
    catch (err) {
        return res.status(403).json({ error: 'Access denied' })
    }


}



export default checkAdmin