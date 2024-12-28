const Property = require('../models/Property');

// Get all properties
exports.getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find();
        res.json(properties);
    } catch (err) {
        res.status(500).json({ message: "Error fetching properties", error: err });
    }
};

// Get a single property by ID
exports.getPropertyById = async (req, res) => {
    const { id } = req.params;

    try {
        const property = await Property.findById(id);
        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }
        res.json(property);
    } catch (err) {
        res.status(500).json({ message: "Error fetching property", error: err });
    }
};