import {ApolloServer} from "apollo-server"
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import typeDefs from "./graphQLSchema.js"
import mongoose  from "mongoose"
import jwt from "jsonwebtoken"
import {  MONGO_URL } from "./config.js";


mongoose.connect(MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on("connected",()=>{
    console.log("connected");
})

mongoose.connection.on("error",(err)=>{
    console.log('Error',err);
})


//  import models 
import resolvers from "./resolver.js";

const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context:({req})=>{
        const {authorization}=req.headers
        if(authorization){
            const {userId} = jwt.verify(authorization,JWT_SECRET)
            return {userId}
           }
    },
    plugins:[
        ApolloServerPluginLandingPageGraphQLPlayground()
    ]
});

server.listen().then(({url})=>{
    console.log(`Server Listening on PORT NO. ${url}`);
})