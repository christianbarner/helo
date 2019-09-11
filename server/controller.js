const bcrypt = require('bcryptjs')

const logout = (req, res) => {
    req.session.destroy()
    return res.sendStatus(200).send('user logged out')
}

const login = async ( req, res) => {
    //body info
    const { username, password } = req.body
    const foundUser = await req.app.get('db').find_user([username])
    const user = foundUser[0]

    if (!user) {
        return res.status(401).send('user not found')
    }
    const isAuthenticated = bcrypt.compareSync(password, user.hash)
    if (!isAuthenticated) {
        return res.status(403).send('incorrect password')
    }
    req.session.user = { isAdmin: user.is_admin, id: user.id, username: user.username}
    return res.send(req.session.user)
}

const register = async (req, res) => {
    //body info
    const { username, password, isAdmin } = req.body
    //database object
    const db = req.app.get('db')
    //find user if username exists
    const result = await db.find_user([username])
    //checks to see if the user exists
    const existingUser = result[0]
    //handles if there is an existing user
    if (existingUser) {
      return res.status(409).send('Username taken')
    }
     //adds same 
     const salt = bcrypt.genSaltSync(10)
     //takes in the password and salt then hashed them
     const hash = bcrypt.hashSync(password, salt)
     // sets registered user to the response of register_user with the passed params
     const registeredUser = await db.register_user([isAdmin, username, hash])
     const user = registeredUser[0]
     req.session.user = { isAdmin: user.is_admin, username: user.username, id: user.id };
     return res.status(200).send(req.session.user);
   }

   
   


module.exports = { 
    logout,
    login,
    register,
    admin
}