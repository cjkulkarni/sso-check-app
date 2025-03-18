import connectDB from '../../utils/db';
import userModel from '../../models/userModel';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { config }  from '../../utils/config'



export default defineEventHandler(async (event) => {
  await connectDB();
    try {

      const body = await readBody(event)
      const users = await userModel.find({ email: body.email });
      const { name, email, password } = body;
   
      try {
        const user = await userModel.findOne({ email: email });
        if (user != null) {
          throw new Error("user already exist with this mail id please login to account");
        }
      } catch (error) {
        return ({ message: "Error while getting user " + error });
      }
      let newUser = {
        name: '',
        email: '',
        password: ''
      };
       
           try {
      
                const hashpassword = await bcrypt.hash(password, 10);
                newUser = await userModel.create({
                     name,
                     email,
                     password: hashpassword,
                });
           }catch(error){
             return ({ message: "Error while creating user " + error });
      }
      
       try {
                const token = jwt.sign({ sub: newUser._id }, config.jwtSecret, { expiresIn: "7d" });
                return {  message: "welcome "+newUser.name,accessToken: token };
           }catch(error){
         return { message: "Error while signing the token " + error };
           }
      
 
    return users;
  } catch (error) {
    return { error: error.message };
  }
});