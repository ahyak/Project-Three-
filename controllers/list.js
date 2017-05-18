const
  List = require('../models/List.js'),
  Location = require('../models/Location.js')

module.exports = {
  index: (req, res) => {
    List.find({}, (err, lists) => {
      if(err) return (err)
      res.render('lists/index', {lists: lists})
    })
  },
  show: (req, res) => {
    List.findById(req.params.id)
    .populate('location user')
    .exec((err,list) =>{
    res.render('lists/show', {list})
    })
  },
  new: (req, res) => {
    Location.find({}, (err, locations)=> {
    res.render('lists/new', {user:req.user, locations:locations})
    })
  },
  create: (req, res) => {
    var newList = new List(req.body)
    newList.user = req.params.id
    newList.location = req.body.location
    console.log(req.body.location)
    newList.save((err, newList) => {
        if(err){
          console.log(err)
        }else{
          // console.log(newList)
          res.redirect('/lists')
        }
      })
  },
  edit: (req, res) => {
    Location.find({}, (err, locations)=> {
      List.findById(req.params.id, (err, list) => {
        res.render('lists/edit', {list: list, locations: locations})
      })
    })
  },
  update: (req, res) => {
    List.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, list) => {
      res.redirect('/lists/'+ req.params.id)
    })
  },
  destroy: (req, res) => {
    List.findByIdAndRemove(req.params.id, (err, deleteList) => {
      res.redirect('/lists')
    })
  }
}
