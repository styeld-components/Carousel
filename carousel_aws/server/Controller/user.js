const User = require('../../database/User.js')

module.exports = {
  get: (req,res) =>{
    User.find()
      .then((data) => {
        res.send(data);
      })
      .catch((e) =>{
        console.log("error in get request: " + err)
      })
  },
  post: (req,res) =>{
    let userid = req.body._id;
    let newlikeplace = {
      "name": req.body.likeplace,
      "list": req.body.list,
      "like": req.body.like
    }
    User.findByIdAndUpdate(
      { _id: userid},
      { $push: {"likeplace": newlikeplace}}
    )
    .then(() => res.sendStatus(202))
    .catch((e)=> res.sendStatus(404))
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

