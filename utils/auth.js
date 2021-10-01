const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
        //if cookie doesn't have info about a logged user
        res.redirect('/login');
    } 
    else {
        next();
    }
};
  
  module.exports = withAuth;