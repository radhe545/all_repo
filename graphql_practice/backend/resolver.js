import mongoose from 'mongoose'
import { User } from './model/user.model.js'
import { Product } from './model/products.model.js'

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from './config.js'




const resolvers = {
    Query:{
        //    users:()=>{return users},
        users:async (_,context)=>{
            console.log(context);
        //    if(!userId) throw new Error("You must be logged in")

          const allusers=await User.find(({}))
          return allusers
        },
        products:async (_ , {pagination})=>{
            const allProducts=await Product.find({}).limit(pagination.limit).skip((pagination.skip-1)*pagination.limit)
            // console.log(allProducts.countDocuments())
            console.log(pagination)
            // if(Object.keys(input).length != 0){
            //     return allProducts.filter((product) => product.brand == input.brand)
            // }
            return {allProducts:allProducts,}
        }
        }
  ,
   Mutation:{
    signupUser:async (_,{userNew})=>{
        const existUser=await User.findOne({email:userNew.email})
        if(existUser){
            throw new Error("User already exists with that email")
        }
        const hashedPassword =  await bcrypt.hash(userNew.password,12)
        const newUser =  new User({
            ...userNew,
            password:hashedPassword
        })
       return await newUser.save()

    },
    signinUser:async (_,{userSignIn})=>{
      const user= await User.findOne({email:userSignIn.email})
      console.log(user);
      if(!user) {
        throw new Error("User dosent exists with that email")

      }
      const doMatch =await bcrypt.compare(userSignIn.password,user.password)
      if(!doMatch){
          throw new Error("email or password in invalid")
      }
      const token = jwt.sign({userId:user._id,email:user.email},JWT_SECRET)
      return {token}
     

    }
   }
    
}

export default resolvers