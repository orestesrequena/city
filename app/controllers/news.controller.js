const News = require('../models/news.model.js');

// Create and Save a new news
exports.create = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "news content can not be empty"
        });
    }

    // Create a news
    const news = new News({
        title: req.body.title || "Untitled news", 
        content: req.body.content
    });

    // Save news in the database
    news.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the news."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    News.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// // Find a single news with a noteId
exports.findOne = (req, res) => {
    News.findById(req.params.noteId)
    .then(news => {
        if(!news) {
            return res.status(404).send({
                message: "news not found with id " + req.params.noteId
            });            
        }
        res.send(news);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "news not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving news with id " + req.params.noteId
        });
    });
};



// // Delete a news with the specified noteId in the request
exports.delete = (req, res) => {
    News.findByIdAndRemove(req.params.noteId)
    .then(news => {
        if(!news) {
            return res.status(404).send({
                message: "news not found with id " + req.params.noteId
            });
        }
        res.send({message: "news deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "news not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete news with id " + req.params.noteId
        });
    });
};