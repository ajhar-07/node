import type { IncomingMessage, ServerResponse } from "http";
import { productService } from "../service/product.service";
import type { IProduct } from "../types/product";


const productController=(req:IncomingMessage,res:ServerResponse)=>{
      const url=req.url;
      const method=req.method;
      const products=productService();
      const urlParams=url?.split("/") //split url path for find the index of my id / path
      console.log(urlParams)
      const id=urlParams && 
      urlParams[1]==="product" ?Number(urlParams[2]):null; //here we finally find id & make it number

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
}

export default productController;