const {error} = require("../utils");
const express = require("express");
const passport = require("passport");
const router = express.Router({});

const HttpStatus = require("http-status-codes");
const User = require("../db/models/user");


router.post("/register", (req, res) => {
	const local = passport.authenticate("local");
	const cb = (err) => {
		if (err) {
            res.json({
                message: `User ${req.body.username} was not registered due to reason: ${err.message}`,
                success: false
            });
			res.end();
		} else {
			local(req, res, () => res.json({
				message: `User ${req.body.username} was successfully registered`,
				success: true
			}));
		}
	};
	User.register(new User({ username : req.body.username }), req.body.password, cb);
});


router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (info) {
            res.json({message: info.message});
        } else if (user) {
    		res.json({message: `User ${user.username} successfully authorized`});
		}
    })(req, res, next);
});

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/");
});

module.exports = router;
