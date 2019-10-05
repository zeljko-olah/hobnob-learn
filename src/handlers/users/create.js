import validate from '../../validators/users/create';
import ValidationError from '../../validators/errors/validation-error';

function createUser(req, res, db) {
  // validate request
  const validationResults = validate(req);
  if (validationResults instanceof ValidationError) {
    res.status(400);
    res.set('Content-Type', 'application/json');
    return res.json({ message: validationResults.message });
  }
  // writes to database
  db.index({
    index: 'hobnob',
    type: 'user',
    body: req.body
  })
    // generates response
    .then((result) => {
      res.status(201);
      res.set('Content-Type', 'text/plain');
      res.send(result._id);
    })
    .catch(() => {
      res.status(500);
      res.set('Content-Type', 'application/json');
      res.json({ message: 'Internal Server Error' });
    });
  return undefined;
}

export default createUser;
