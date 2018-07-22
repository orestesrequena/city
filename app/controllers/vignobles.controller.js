const Vignobles = require('../models/vignobles.model.js');

// Create and Save a new vignobles
exports.create = (req, res) => {

    // Create a vignobles
    const vignobles = new Vignobles({
        name: req.body.name|| "Untitled vignobles", 
        image: req.body.image || "Untitled vignobles",
        email: req.body.email || "Untitled vignobles",
        phone: req.body.phone || "0604122929",
        address: req.body.address || "Untitled vignobles",
        description: req.body.description || "Untitled vignobles",
        latitude: req.body.latitude || "Untitled vignobles",
        longitude: req.body.longitude|| "Untitled vignobles"
    });

    // Save vignobles in the database
    vignobles.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the vignobles."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Vignobles.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// // Find a single vignobles with a noteId
exports.findOne = (req, res) => {
    Vignobles.findById(req.params.noteId)
    .then(vignobles => {
        if(!vignobles) {
            return res.status(404).send({
                message: "vignobles not found with id " + req.params.noteId
            });            
        }
        res.send(vignobles);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "vignobles not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving vignobles with id " + req.params.noteId
        });
    });
};

// // // Update a vignobles identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    // if(!req.body.content) {
    //     return res.status(400).send({
    //         message: "vignobles content can not be empty"
    //     });
    // }

    // Find vignobles and update it with the request body
    Vignobles.findByIdAndUpdate(req.params.noteId, {
        name: req.body.name|| "Untitled vignobles", 
        image: req.body.image || "Untitled vignobles",
        email: req.body.email || "Untitled vignobles",
        phone: req.body.phone || "0604122929",
        address: req.body.address || "Untitled vignobles",
        description: req.body.description || "Untitled vignobles",
        latitude: req.body.latitude || "Untitled vignobles",
        longitude: req.body.longitude|| "Untitled vignobles"
    }, {new: true})
    .then(vignobles => {
        if(!vignobles) {
            return res.status(404).send({
                message: "vignobles not found with id " + req.params.noteId
            });
        }
        res.send(vignobles);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "vignobles not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error updating vignobles with id " + req.params.noteId
        });
    });
};

// // Delete a vignobles with the specified noteId in the request
exports.delete = (req, res) => {
    Vignobles.findByIdAndRemove(req.params.noteId)
    .then(vignobles => {
        if(!vignobles) {
            return res.status(404).send({
                message: "vignobles not found with id " + req.params.noteId
            });
        }
        res.send({message: "vignobles deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "vignobles not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete vignobles with id " + req.params.noteId
        });
    });
};