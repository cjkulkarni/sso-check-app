import connectDB from '../../utils/db';
import userModel from '../../models/userModel';
import jwt from 'jsonwebtoken';
import { config }  from '../../utils/config'

export default defineEventHandler(async (event) => {
  await connectDB();
    try {
      const body = await readBody(event)
      const user = await userModel.find({email: body.email});
      if (user.length==0 || user.email  == "") {
        throw new Error("user not exist");
      }
        try {
                      const token = jwt.sign({ sub: user[0]._id }, config.jwtSecret, { expiresIn: "7d" });
          return { user: { name: user[0].name, email: user[0].email },token: token };
                 }catch(error){
               return { message: "Error while signing the token " + error };
                 }
   
  } catch (error) {
    return { error: error.message };
  }
});