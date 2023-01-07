import mongoose from "mongoose"

const itemSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Inventory"
    },
    count: {
        type: Number,
        default: 0,
        required: true
    }
})

const inventorySchema = new mongoose.Schema({
    count: {
        type: Number,
        default: 0
    },
    countTotal: {
        type: Number,
        default: 0
    },
    items: {
        type: [itemSchema],
        default: []
    },
})

const shopSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    longDescription: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    inventory: {
        type: inventorySchema,
        required: true,
        default: {
            count: 0,
            countTotal: 0,
            items: []
        }
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

inventorySchema.pre('save', function (next) {
    var votes = this
    votes.count = votes.items.length // no of different inventory
    let countVar = 0;
    votes.items.map((items) => { countVar += items.count }).length // no of total inventory
    votes.countTotal = countVar;
    next()
})

mongoose.models = {}

const Shop = mongoose.model('Shop', shopSchema)

export default Shop