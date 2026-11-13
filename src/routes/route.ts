import type { IncomingMessage, ServerResponse } from "http";
import productController from "../controllers/product.controller";

const routeHandler=(req:IncomingMessage,res:ServerResponse)=>{
      // console.log(req)
//    console.log("Request",req)
//    console.log("Response",res)
// console.log(req.url)
// console.log(req.method)
const url=req.url; // /posts,/courses,/newses
const method=req.method; // get,post,put,delete
if(url==="/" && method==="GET"){
    // console.log("this is root route")
    // res.writeHead(200,{"Content-Type":"text/plain"})
    res.writeHead(200,{"Content-Type":"application/json"})
    res.end(JSON.stringify({message : "this is root route"}))
}

else if(url?.startsWith("/product")){
   productController(req,res)
}
else{
    // console.log("this rout is not define")
    // res.writeHead(404,{"content-type":"text/plain"})
    res.writeHead(404,{"content-type":"application/json"})
    res.end(JSON.stringify({message : "This route is not define!!!"}))
}
}

export default routeHandler;