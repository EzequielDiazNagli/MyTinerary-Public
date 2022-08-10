const User = require("../models/user")
const bcryptjs = require('bcryptjs')
const crypto = require('crypto')
const sendVerification = require("./sendVerification")
const jwt = require('jsonwebtoken')
//const nodemailer = require('nodemailer')


const userControllers = {

    signUp: async (req,res) => {
        let {firstName, lastName, photo, country, email, password, from} = req.body.userData
        //ACLARACION: password y from son ARRAYS
        //cada elemento de password se relaciona con un unico elemento de from
        //el indice de cada contraseña coincide con el indice de cada from
        //es decir:
        //la contraseña[0] es del from[0]
        //la contraseña[2] es del from[2]
        //la contraseña[indice] es del from[indice]
        try {
            const newUser = await User.findOne({email}) //buscamos por email
            const verification = false
            const uniqueString = crypto.randomBytes(15).toString("hex")
            if (!newUser) { //si NO existe el usuario
                const hashWord = bcryptjs.hashSync(password, 10) //hasheo la contraseña
                const myNewTUser = await new User({firstName, lastName, email, photo, country, verification,
                    uniqueString: uniqueString,
                    password: [hashWord],
                    from: [from]})
                if (from === "formSignUp") { //si la data viene del formulario
                    //ACLARACION: ahora el if/else tienen la misma data
                    //pero van a cambiar cuando enviemos correo de verificacion
                    await myNewTUser.save()
                    await sendVerification(email, uniqueString)
                    res.json({
                        success: true,
                        from: from,
                        message: `Verify your account to finish your sign up`}) 
                    } else { //si la data viene de una red social
                    myNewTUser.verification = true
                    await myNewTUser.save()
                    res.json({
                        success: true, 
                        from: from,
                        message: `You signed up by ${from}, please, log in`})
                }
            } else { //si existe el usuario, significa que al menos tiene un registro
                //hay que chequear si coincide la forma de RE-REGISTRO con la ya REGISTRADA
                //si coincide se tiene que cumplir la siquiente condicion:
                if (newUser.from.indexOf(from) !== -1) { //coincide la forma de registro ACTUAL con alguna ya EXISTENTE en mi bd
                    //del usuario que encontró
                    //busco en la propiedad FROM
                    //el indice que coincide con el FROM del cual el usuario quiere "volver" a registrarse
                    //si ese indice EXISTE ==> el usuario ya está registrado DE ESTA FORMA y hay que mandarlo a loguearse
                    //ACLARACION: si existe indexOf(from) significa que el usuario ya se registró de esta manera (la que capturamos en la variable FROM)
                    //entonces si el indice de from es cualquier numero que no sea -1 significa que ya existe el usuario y NO DEBEMOS PERMITIRLE volver a registrarse
                    res.json({ //devolvemos la respuesta
                        success: false,
                        from: from,
                        message: `This email has been registered already, please, log in`})
                //si no coincide, se tiene que cumplir esta otra:                
                } else {
                    //si es -1 significa que el usuario NO SE REGISTRO DE ESTA FORMA (nuevo registro con google)
                    //pero ya tiene AL MENOS UN registro (facebook y form)
                    const hashWord = bcryptjs.hashSync(password, 10)
                    newUser.password.push(hashWord)
                    newUser.from.push(from)
                    newUser.verification = true
                    await newUser.save()
                    res.json({
                        success: true, 
                        from: from, 
                        message: `Sign up success, please log in`}) 
                }
            }
        } catch (error) {
            console.log(error)
            res.json({
                success: false,
                from: from,
                message: 'ERROR'})
        }
    },

    logIn: async (req, res) => {
        const {email, password, from} = req.body.userLogin
        try {
            const loginUser = await User.findOne({email}) //buscamos por eemail
            // console.log(loginUser)
            if (!loginUser) { //si NO existe el usuario
                res.json({
                    success: false,
                    from: 'no from',
                    message: `Please, sign up first`})
            } else if (loginUser.verification){ //si existe el usuario
                let checkedWord =  loginUser.password.filter(pass => bcryptjs.compareSync(password, pass))
                // console.log(checkedWord)
                //filtramos en el array de contraseñas hasheadas si coincide la contraseña 
                if (from === "formSignUp") { //si fue registrado por nuestro formulario
                    if (checkedWord.length>0) { //si hay coincidencias
                        const userData = { //este objeto lo utilizaremos cuando veamos TOKEN
                            id: loginUser._id,
                            email: loginUser.email,
                            firstName: loginUser.firstName,
                            lastName: loginUser.lastName,
                            photo: loginUser.photo,
                            from: loginUser.from
                            }
                            const token = jwt.sign({...userData}, process.env.SECRET_KEY, {expiresIn: 60* 60*24 })
                        await loginUser.save()
                        res.json({
                            response: {token, userData},
                            success: true, 
                            from: from, 
                            message: `Welcome back ${userData.firstName} ${userData.lastName}`})
                    } else { //si no hay coincidencias
                        res.json({
                            success: false, 
                            from: from,  
                            message: `Please, verify your email or password`})
                    }
                } else { //si fue registrado por redes sociales
                    //ACLARACION: por ahora es igual al anterior
                    if (checkedWord.length>0) { //si hay coincidencias
                        const userData = { //este objeto lo utilizaremos cuando veamos TOKEN
                            id: loginUser._id,
                            email: loginUser.email,
                            firstName: loginUser.firstName,
                            lastName: loginUser.lastName,
                            photo: loginUser.photo,
                            from: loginUser.from}
                            const token = jwt.sign({...userData}, process.env.SECRET_KEY, {expiresIn: 60* 60*24 })
                        await loginUser.save()
                        res.json({
                            response: {token, userData}, 
                            success: true, 
                            from: from, 
                            message: `Welcome back ${userData.firstName} ${userData.lastName}`})
                    } else { //si no hay coincidencias
                        res.json({
                            success: false, 
                            from: from,  
                            message: `To log in with Google, first sign up please`})
                    }
                }
            } else {
                res.json({
                    success: false, 
                    from: from,  
                    message: `Account has not been confirmed yet`})
            }
        } catch (error) {   
            console.log(error)
            res.json({
                success: false,
                from: from,
                message: 'ERROR'})
        }
    },

    verifyEmail: async (req, res) => {
        const {string} = req.params
        const user = await User.findOne({uniqueString: string})
        if (user){
            user.verification = true
            await user.save()
            res.redirect("https://mytinerary-diaz.herokuapp.com")
        }
        else {res.json({
            success: false,
            message: `Account has not been confirmed yet`})
        }
    },

    verifyToken:(req, res) => {
        //console.log(req.user)
        if (!req.err) {
            // console.log(req.err);
        res.json({
            success: true,
            response: {
                id: req.user.id,
                firstName:req.user.firstName,
                email:req.user.email,
                photo:req.user.photo,
                from:"token"
            },
            message: `Hi! Welcome back ${req.user.firstName} ${req.user.lastName}`}) 
        } else {
            res.json({
                success:false,
                message:"sign in please!"}) 
        }
    }
}

module.exports = userControllers