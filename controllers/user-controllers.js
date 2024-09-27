import User from "../model/User";
import bcrypt from 'bcryptjs';

export const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    }
    catch (err) {
        return console.log(err)
    }
    if (!users) {
        return res.status(404).json({ message: "No user found" })
    }
    return res.status(200).json({ users });
}

export const signup = async (req, res, next) => {
    const { name, email, password } = req.body

    let existingUser;
    try {
        existingUser = await User.findOne({ email })
    }
    catch (err) {
        return console.log(err);
    }
    if (existingUser) {
        return res.status(400).json({ message: "User already exist!!! Try login" })
    }
    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({
        name,
        email,
        password: hashedPassword,
    });
    try {
        await user.save()
    }
    catch (err) {
        return console.log(err + "akashhh");
    }
    return res.status(201).json({ user })

}

export const login= async(req,res,next)=>{
    const {email, password } = req.body

    let existingUser;
    try {
        existingUser = await User.findOne({ email })
    }
    catch (err) {
        return console.log(err);
    }
    if (!existingUser) {
        return res
        .status(404)
        .json({ message: "User Doesn't Exist With This Email" })
    }
    const isPasswordcorrect= bcrypt.compareSync(password,existingUser.password);

    if(!isPasswordcorrect)
    {
        return res.status(400).json({message: "Incorrect Password"})
    }
    return res.status(200).json({message: "Login Successful", user:existingUser})
}