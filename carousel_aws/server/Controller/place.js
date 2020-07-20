const Place = require('../../database/PostgreSQL/index.js');

module.exports = {
  get: (req,res)=> {
    const q = `SELECT * FROM places WHERE zipcode LIKE '${req.params.zipcode}%' limit 15`;

    Place.query(q, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data.rows);
      }
    });
  }
};