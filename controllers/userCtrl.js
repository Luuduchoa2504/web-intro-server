const Users = require('../models/userModels')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userCtrl = {
    register: async (req, res) => {
       try {
            const { name, email, password, phone } = req.body
            console.log(req.body)

            const user = await Users.findOne({ email })
            if (user) return res
            .status(400)
            .json({ msg: "Email already exists"})

            if (password.length < 6)
            return res
            .status(400)
            .json({ msg: "Password is at least 6 characters long"})  

            //Password Encryption
            const passwordHash = await bcrypt.hash(password, 10)
            const newUser = new Users({
                name, email, password: passwordHash, phone
            })

            //Save mongoDB
            await newUser.save()

            //Create jsonwebtoken to authenticate
            const accessToken = createAccessToken({id: newUser._id})
            const refreshToken = createRefreshToken({id: newUser._id})
            
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                path: 'api/refresh_token'
            })
            
            res.json({
                success: true,
                message: 'User created successfully', 
                accessToken
            })
            
        } catch (error) {
           return res.status(500).json({ message: error.message })
       }
    },
    login: async (req, res) => {
        try {
            const {email, password} = req.body;

            const user = await Users.findOne({email})
            if(!user) return res.status(400).json({json:"Incorrect username or password"})

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg:"Incorrect username or password"})

            //If login success, create access token and refresh token
           const accessToken = createAccessToken({id: user._id})
           const refreshToken = createRefreshToken({id: user._id})
           
           res.cookie('refreshToken', refreshToken, {
               httpOnly: true,
               path: 'api/refresh_token'
           })
           
           res.json({
			success: true,
			message: 'User logged in successfully',
			accessToken,
            // user: user
		})


        } catch (error) {
            return res.status(500).json({ msg: error.message})
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshToken', {path:'/api/refresh_token'})
            return res.json({msg:"Logged out"})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    refreshToken: (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken;
            if(!rf_token) return res.status(400).json({msg: "Please Login or Register"})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
                if(err) return res.status(400).json({msg: "Please Login or Register"})

                const accessToken = createAccessToken({id: user.id})

                res.json({accessToken})
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    auth: async (req, res) => {
        const token = req.body.token;

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        try {   
            console.log(token);
            // Verify the token using the secret key
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const user = await Users.findOne({_id: decoded.id});
            res.json({ message: 'This is a protected route', user: user });
        } catch (err) {
            return res.status(403).json({ message: 'Forbidden' });
  }
    },
    getUser: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('-password')
            if(!user) return res.status(400).json({ msg: "User does not exist"})

            res.json(user)
        } catch (error) {
            return res.status(500).json({ msg: error.message})
        }
    },
    addCart: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id)
            if (!user) return res.status(400).json({msg:"User does not exist"})

            await Users.findOneAndUpdate({_id:req.user.id}, {
                cart: req.body.cart
            })

            return res.json({msg:"Added to cart"})
        } catch (error) {
            return res.status(500).json({ msg: error.message})
        }
    }
}

const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
}
const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '7d'})
}

module.exports = userCtrl