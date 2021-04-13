const passport = require('passport');

//implement our google oauth route handler
module.exports = app => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));
    //attempting to convert to profile after authenticating, exchanging code 
    //with user profile
    app.get('/auth/google/callback', passport.authenticate('google'));

    //logout handler
    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
    });

    //route handler for checking cookie requests
    app.get('/api/current_user', (req,res) => {
        res.send(req.user);
    });
};


