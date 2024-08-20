import mongoose, { Schema } from 'mongoose'


const category = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        // required: true
    }
})


const CategoryModel = mongoose.model('Category', category)

export default CategoryModel