const bcrypt = require("bcryptjs");


module.exports = {
    register: async (req, res) => {
      console.log('from controller',req.body)
        const db = req.app.get("db");
        const { name, password} = req.body;
        const { session } = req;
    
        let takenName = await db.auth.check_email({ name });
        takenName = +takenName[0].count;
    
        if (takenName) {
          return res.status(409).send("Name already exists");
        }
        
    
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
    
        let user = await db.auth.add_user({ name, password: hash});
    
        user = user[0];
        session.user = user;
        console.log('session user from auth controller', session.user)
        res.status(200).send(session.user);
      },

      login: async (req, res) => {
        const db = req.app.get("db");
        const { name, password } = req.body;
        const { session } = req;
    
        let user = await db.auth.get_user({ name });
        
        user = user[0];
        console.log('from auth controller', user)
        if (!user) {
          return res.status(409).send("Email does not exist");
        }
    
        let authenticated = bcrypt.compareSync(password, user.password);
    
        if (authenticated) {
          delete user.password;
          session.user = user;
          
          res.status(200).send(session.user);
        } else {
          res.status(401).send("Failed Authentication");
        }
      }, 

      current: (req, res) => {
        const { user } = req.session;
        // console.log(user);
        if (user) {
          return res.status(200).send(user);
        } else {
          res.status(400).send("User not found");
        }
      },

      logout: (req, res) => {
        // console.log('session before destroy', req.session)
        req.session.destroy();
        // console.log('session after destroy', req.session)
        res.status(200).send("Logged Out");
      }
}