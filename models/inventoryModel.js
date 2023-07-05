const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const InventorySchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageURL: { type: String, required: true },
    lastEdited: { type: String, required: true }
}, {collection: 'inventory'});

const InventoryModel = model('Inventory', InventorySchema);

module.exports = InventoryModel;