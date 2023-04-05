import {gql} from "apollo-server"
const typeDefs = gql`
 type Query{
    users:[User]
    products(input : filterInput,pagination:Pagination):[Product]
    
 }
input Pagination{
   limit:Int
   skip:Int
}
 input filterInput{
   brand : String
 }
 type Product{
    _id:ID
    title:String
    description:String
    price:String
    discountPercentage:String
    rating:String
    stock:String
    brand:String
    category:String
    thumbnail:String
    images:[String]

 }
 type User{
    _id:ID
    email:String
    username:String
    password:String
 }



 type Mutation{
    signupUser(userNew:UserInput):User
    signinUser(userSignIn:UserSignInInput):Token

 }
 type Token{
    token:String
}
 input UserInput{
    username:String!
    email:String!
    password:String!
 }
 input UserSignInInput{
    email:String!
    password:String!
 }



`
export default typeDefs