const Vins = require('../models/vins.model.js');

const Vignobles = require('../models/vignobles.model.js');

// Create and Save a new vins
exports.create = (req, res) => {
    // Validate request
    if(!req.body.description) {
        return res.status(400).send({
            message: "vins content not be empty"
        });
    }

    // Create a vins
    const vins = new Vins({
        name: req.body.name|| "Untitled vins", 
        vineyard: req.body.vineyard,
        image: req.body.image,
        quantity: req.body.quantity,
        price: req.body.price,
        description: req.body.description
    });

    // Save vins in the database
    vins.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the vins."
        });
    });
};

exports.findAll= (function(req, res) {
	Vins.find({}, function(err, vins) {
        Vins.populate(vins, {path: "vineyard"},function(err, vins){
            res.status(200).send(vins)
         }); 
    });
});


// // // Find a single vins with a noteId
exports.findOne = (req, res) => {
    Vins.findById(req.params.noteId)
    .then(vins => {
        if(!vins) {
            return res.status(404).send({
                message: "vins not found with id " + req.params.noteId
            });            
        }
        res.send(vins);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "vins not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving vins with id " + req.params.noteId
        });
    });
};

// // // Update a vins identified by the noteId in the request
exports.update = (req, res) => {

    // Find vins and update it with the request body
    Vins.findByIdAndUpdate(req.params.noteId, {
        name: req.body.name|| "Untitled vins", 
        vineyard: req.body.vineyard || "10",
        image: req.body.image || "https://loremflickr.com/g/320/240/wine",
        quantity: req.body.quantity || "20",
        price: req.body.price || "10",
        description: req.body.description || "Untitled vins"
    }, {new: true})
    .then(vins => {
        if(!vins) {
            return res.status(404).send({
                message: "vins not found with id " + req.params.noteId
            });
        }
        res.send(vins);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "vins not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error updating vins with id " + req.params.noteId
        });
    });
};

// // // Delete a vins with the specified noteId in the request
exports.delete = (req, res) => {
    Vins.findByIdAndRemove(req.params.noteId)
    .then(vins => {
        if(!vins) {
            return res.status(404).send({
                message: "vins not found with id " + req.params.noteId
            });
        }
        res.send({message: "vins deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "vins not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete vins with id " + req.params.noteId
        });
    });
};