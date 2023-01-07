import mongoose from "mongoose"

const inventorySchema = new mongoose.Schema({
    name: {
        type: String,
    },
    image: {
        type: String,
    },
    category: {
        type: String,
    },
    price: {
        type: Number,
    },
    description: {
        type: String,
    },
})

mongoose.models = {};

var Inventory = mongoose.model('Inventory', inventorySchema)

export default Inventory


// id:13,
// name: "Pan",
// image: pan,
// // Cartridge : "0.45 mm",
// type: "Melee",
// // firing_mode: "Single",
// // mag_size: "10",
// // attachment: "3",
// // bullet_spread: "0.7 units",
// // recoil_gain: "1.3 units",
// in_inventory: "6",
// sold: "14",
// price: "2K",
// desc: "It is a toy! :)",