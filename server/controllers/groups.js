'use strict';
let Group = require('../models/group');
let User = require('../models/user');

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

exports.addUser = (req, res, next) => {
  let groupId = req.body.groupId;
  let userId = req.body.userId;
  User.findById(userId, (err, user) => {
    if (err) {return err;}
    user.groups.push(groupId);
    user.save((err, user) => {
      if (err) {return err;}
      Group.findById(groupId, (err, group) => {
        if (err) {return err;}
        group.members.push(userId);
        group.save((err, group) => {
          if (err) {return err;}
          res.json(group);
        });
      });
    });
  });
};