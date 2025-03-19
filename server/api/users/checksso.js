import connectDB from '../../utils/db';
import userModel from '../../models/userModel';
import jwt from 'jsonwebtoken';
import { config }  from '../../utils/config'

export default defineEventHandler(async (event) => {
  try {
      await connectDB();
      
      const body = await readBody(event)
      let ssotoken = body.ssotoken;
      ssotoken = ssotoken.substring(2, ssotoken.length - 2);
      const email = decodeURIComponent(atob(ssotoken));
    const user = await userModel.find({ email: email });
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
    return { error: 'SSO check failed'+error };
  }
});
