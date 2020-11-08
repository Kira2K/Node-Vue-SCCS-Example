const express = require('express');
const router = express.Router()
const Blogger = require('../models/blogger')
const passport = require('passport');
require('../config/passport')(passport)
const jwt = require('jsonwebtoken');
const getToken = (headers) => {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

router.post('/allProfiles', passport.authenticate('jwt', { session: false }), (req, res) => {
  let token = getToken(req.headers);
  if (token) {
    let id = req.body.id
    Blogger.getBloggerByBelongTo(id, (err, blogger) => {
      if (err) throw err;
      if (!blogger) return res.json({ success: false, msg: 'У вас ещё нет профилей' });

      return res.json({ success: true, blogger: blogger, msg: 'профили найдены' });
      
    });

  } else {
      return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
})

router.post('/deleteProfile', passport.authenticate('jwt', { session: false }), (req, res) => {
  let id = req.body.id;
  if (token) {
    Blogger.deleteBlogger(id, (err, blogger) => {
      if (err) throw err;
      if (!blogger) return res.json({ success: false, msg: 'Блогеры не найдены' });

      return res.json({ success: true, blogger: blogger, msg: 'Блогеры найдены' });

    })

  } else {
      return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
})

module.exports = router;