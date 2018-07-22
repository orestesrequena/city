module.exports = (app) => {

  const vins = require('../controllers/vins.controller.js');
  const vignobles = require('../controllers/vignobles.controller.js');
  const news = require('../controllers/news.controller.js');

  // Create a new Note
  app.post('/vins', vins.create);

  // // Retrieve all vins
  app.get('/vins', vins.findAll);

  // // Retrieve a single Note with noteId
  app.get('/vins/:noteId', vins.findOne);

  // // // Update a Note with noteId
  app.put('/vins/:noteId', vins.update);

  // // Delete a Note with noteId
  app.delete('/vins/:noteId', vins.delete);


  // Create a new Note
  app.post('/vignoble', vignobles.create);

  // Retrieve all vignobles
  app.get('/vignoble', vignobles.findAll);

  // Retrieve a single Note with noteId
  app.get('/vignoble/:noteId', vignobles.findOne);

  // // Update a Note with noteId
  app.put('/vignoble/:noteId', vignobles.update);

  // Delete a Note with noteId
  app.delete('/vignoble/:noteId', vignobles.delete);


  // Create a new Note
  app.post('/news', news.create);

  // Retrieve all news
  app.get('/news', news.findAll);

  // Retrieve a single Note with noteId
  app.get('/news/:noteId', news.findOne);


  // Delete a Note with noteId
  app.delete('/news/:noteId', news.delete);
}
