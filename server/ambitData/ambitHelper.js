var Ambit = require('./ambitSchema.js');
var q = require('q');

var findAmbit = q.nbind(Ambit.findOne, Ambit);
var findAllAmbits = q.nbind(Ambit.find, Ambit);
var createAmbit = q.nbind(Ambit.create, Ambit);
var removeAmbit = q.nbind(Ambit.remove, Ambit);

module.exports.addAmbit = function (req, res, next) {
  // Records a new ambit from the user
  var ambit = req.body.ambit;
  ambit.checkIns = [];
  ambit.refId = Math.round(Math.random() * 10000);

  findAmbit({refId: ambit.refId}) // Should check per user as well
    .then(function (found) {
      if (found) {
        return next(new Error('Ambit refId already exists'));
      } else {
        return createAmbit(ambit);
      }
    })
    .then(function (createdAmbit) {
      if (createdAmbit) {
        res.json(createdAmbit);
      }
    })
    .fail(function (error) {
      next(error);
    });
};

module.exports.saveCheckIn = function (req, res, next) {
  // Add the current date to the ambits checkIn property
  var refId = req.params.id;
  
  findAmbit({refId: refId})
    .then(function (ambit) {
      var now, today, lastCheck;
      now = new Date();
      today = now.toDateString();
      if (ambit.checkIns.length < 1) {
        ambit.checkIns.push(now);
        return ambit.save();
      } else {
        lastCheck = ambit.checkIns[ambit.checkIns.length - 1].toDateString();
        if (today !== lastCheck) {
          ambit.checkIns.push(now);
          return ambit.save();
        } else {
          res.json('already checked in');
        }
      }
    })
    .then(function (savedAmbit) {
      res.send(savedAmbit);
    });
};

module.exports.deleteAmbit = function (req, res, next) {
  // Delete an ambit from the database
  var refId = req.params.id;
  
  removeAmbit({refId: refId})
    .then(function (ambit) {
      res.json('removed');
    });
};

module.exports.getAmbits = function (req, res, next) {
  // Send an array containing all the ambits back to the user.

  findAllAmbits()
    .then(function (ambits) {
      res.send(ambits);
    })
    .fail(function (error) {
      next(error);
    });
};
