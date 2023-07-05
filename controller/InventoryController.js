const InventoryModel = require("../models/inventoryModel");
const { v4: uuid } = require('uuid');

const getDate = () => {
    const date = new Date();

    return date.toLocaleString("en-US", { timeZone: 'PST' });
}

const InventoryController = {

    getData: async function (req, res, next) {
        try {
            const items = await InventoryModel.find();
            const sort = Number(req.query.sort);
            if (sort > 0) {
                items = items.sort((a,b) => {
                return a["price"] > b["price"] ? 1 : -1;
                });
            } else if (sort < 0) {
                items = items.sort((a,b) => {
                return a["price"] < b["price"] ? 1 : -1;
                });
            } 

            console.log(items);

            const newArray = items.map((item) => {
                return {id: item.id, name: item.name, imageURL : item.imageURL}
            });

            return res.status(200).send(newArray);
        } catch (err) {
                res.status(400).send(err.message);
        }
    },

    getOneItem: async function (req, res, next) {
        try {
            const item = await InventoryModel.findOne({ id: req.params.itemId });
            console.log(item);
            if (!item) return res.status(404).send({ message: 'Item not found' });

            return res.status(200).send(item);
        } catch (err) {
            return res.status(404).send({ message: 'Item not found' });
        }
    },

    editOneItem: async function (req, res, next) {
        const date = getDate();
        const params = {
            ...req.body,
            lastEdited: date,
        };
        try {
            const item = await InventoryModel.findOneAndUpdate({ id: req.params.itemId }, params, { new: true });
            console.log(item);
            if (!item) return res.status(404).send({ message: 'Item not found' });

            return res.status(200).send(item);
        } catch (err) {
            return res.status(404).send({ message: 'Item not found' });
        }
    },

    DeleteItem: async function (req, res, next) {
        try {
            const item = await InventoryModel.findOneAndDelete({ id: req.params.itemId });
            console.log(item);
            if (!item) return res.status(404).send({ message: 'Item not found' });

            return res.status(200).send(item);
        } catch (err) {
            return res.status(404).send({ message: 'Item not found' });
        }
    },

    addData: async function (req, res, next) {
        const date = getDate();
        try {
            const item = new InventoryModel({ 
                id: uuid(), 
                name: req.body.name,
                description : req.body.description,
                price : req.body.price,
                imageURL : req.body.imageURL,
                lastEdited: date
              });
              await item.save();            
              return res.status(201).send(item);
        } catch (err) {
            return res.status(400).send("Did not create Item");
        }
    }
}

module.exports = InventoryController;