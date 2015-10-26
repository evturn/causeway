'use strict';
let Group = require('../models/group');

exports.change = (req, res, next) => {
  res.redirect('/profile');
};

exports.create = (req, res, next) => {
  let user = req.user;
  let name = req.body.groupName;

  user.save((err, user) => {
    if (err) {
      console.log(err);
      return err;
    }
    else {
      let group = new Group({
        name: name,
        members: [user._id]
      });

      group.save((err, group) => {
        if (err) {
          console.log(err);
          return err;
        }
        else {
          user.groups.push(group);
          user.save();
          console.log('========SUCCESS=======');
          console.log(group);
          console.log('========SUCCESS=======');
        }
      });
    }
  });
  res.redirect('/notes');
};