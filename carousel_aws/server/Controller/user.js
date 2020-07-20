const User = require('../../database/PostgreSQL/index.js')

module.exports = {
  get: (req,res) =>{
    const q = `SELECT * FROM users INNER JOIN lists ON users.userId = lists.userId INNER JOIN favorites ON lists.listId = favorites.listId WHERE users.userid = ${req.param} limit 15`;

    User.query(q, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data.rows);
      }
    })
  },
  post: (req,res) =>{
    const q = `INSERT INTO lists(listId, listName, userId) VALUES (15000002, 'YO WHATUP', 18888);`;

    User.query(q, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send('post success!');
      }
    })
  },
  update: (req,res) => {
    User.update(
      { "likeplace._id": req.params.placeId},
      {"$set": { "likeplace.$.like": req.body.like}}
    )
    .then(() => res.sendStatus(202))
    .catch((e)=> {
      console.log(e);
      res.sendStatus(404)
    })
  }


}

