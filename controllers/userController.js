import User from '../models/userModel.js';


const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        const usersCount = await User.countDocuments()
        res.set('Content-Range', `users 0-${users.length}/${usersCount}`)
        return res.status(200).json(users)
    }
    catch (err) {
        console.error('Internal server error 🔴', err)
        res.status(500).json({ error: `${err.message} 🔴` })
    }
}
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        return res.status(200).json(user)
    }
    catch (err) {
        console.error('Internal server error 🔴', err)
        res.status(500).json({ error: `${err.message} 🔴` })
    }
}
const getUserByName = async (req, res) => {
    try {
        const user = await User.findOne({ name: req.params.name })
        return res.status(200).json(user)
    } catch (err) {
        console.error('Internal server error 🔴', err)
        res.status(500).json({ error: `${err.message} 🔴` })
    }
}

const getUserByToken = async (req, res) => {
    const { token } = req.body
    try {
        const userByToken = await User.findOne({ token }).select('-password -isAdmin')
        if (!userByToken) {
            return res.status(400).json({ error: 'No user found' })
        }
        return res.status(200).json(userByToken)
    }
    catch (err) {
        console.error('Internal server error 🔴', err)
        res.status(500).json({ error: `${err.message} 🔴` })
    }
}
const updateUser = async (req, res) => {
    const { userId } = req.params
    const { address } = req.body
    const { user } = req.body

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, user, { new: true })
        if (!updatedUser) {
            return res.status(400).json({ error: 'Please update' })
        }
        return res.status(200).json(updatedUser)
    }
    catch (err) {
        console.error('Internal server error 🔴', err)
        res.status(500).json({ error: `${err.message} 🔴` })
    }
}
const deleteUser = async (req, res) => {
    const { userId } = req.params
    try {
        const deletedUser = await User.findByIdAndDelete(userId)
        if (deletedUser) {
            return res.status(203).json({ message: 'User has been deleted' })
        }

    }
    catch (err) {
        console.error('Internal server error 🔴', err)
        res.status(500).json({ error: `${err.message} 🔴` })
    }
}

export { getUsers, getUserById, getUserByName, getUserByToken, updateUser, deleteUser, }