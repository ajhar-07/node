import type { IncomingMessage, ServerResponse } from "http";
import { createProduct, productService } from "../service/product.service";
import type { IProduct } from "../types/product";
import { bodyParser } from "../utils/parseBody";


const productController= async (req:IncomingMessage,res:ServerResponse)=>{
      const url=req.url;
      const method=req.method;
      const products=productService();
      const urlParams=url?.split("/") //split url path for find the index of my id / path
      console.log(urlParams)
      const id=urlParams && 
      urlParams[1]==="product" && urlParams[2] ?Number(urlParams[2]):null; //here we finally find id & make it number

      console.log(id)
    

      if(url==="/product" && method==="GET"){
       res.writeHead(200,{"Content-Type":"application/json"})
    res.end(JSON.stringify({message : "retrive products data successfully!!!",data:products}))
      }

      //get data by id 
     else if(method==="GET" && id!==null){
        const products=productService()
        const product=products.find((p:IProduct)=>p.id===id)
        res.writeHead(200,{"Content-Type":"application/json"})
        res.end(JSON.stringify({message:"product find with id success",data:product}))
     }

     //POST method --->Post data in server

     else if(method==="POST" && url==="/product"){
      const body= await bodyParser(req)

      console.log(body)
      const newProduct={
         id :Date.now(),
         ...body
      }
      const products=productService()
      products.push(newProduct)
      createProduct(products)
      res.writeHead(201,{"Content-Type":"application/json"})
      res.end(JSON.stringify({message:"Data post successfully!!!",data:newProduct}))
     }
}

export default productController;