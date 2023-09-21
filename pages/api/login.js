import cookie from "cookie";
import dbConnect from "../../util/mongo.js"
import User from "../../models/User.js"
export default async function handler(req, res) {
    
  if (req.method === "POST") {
    const { username, password } = req.body;
    const admin=await User.find({username:'admin'})
 

    if (
      username === admin[0].username &&
      password === (admin[0].password).toString()
   
    ) {
      
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", process.env.TOKEN, {
          maxAge: 60 * 60,
          sameSite: "strict",
          path: "/",
        })
      );
      res.status(200).json("authorization successful");
    } else {
        console.log("ERROR")
      res.status(400).json("Wrong Credentials!");
    }
  }
};


