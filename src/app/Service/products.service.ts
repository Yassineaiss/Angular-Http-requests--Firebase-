import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { Product } from '../model/products';
@Injectable({providedIn:"root"})
export class productService{




  error= new Subject<string>();



constructor(private http:HttpClient){}
createProduct(products: {pName:string, desc:string, price:string}){
  console.log(products);
  const headers = new HttpHeaders({'myHeader':'YassAngular '})
this.http.post<{name:string}>(
'https://angularbyyassine-default-rtdb.firebaseio.com/products.json',
 products, {headers: headers})
.subscribe((res) => {
console.log(res)
}, (err)=>{
  this.error.next(err.messagee);
}) ;
}

fetchProduct(){
const header= new HttpHeaders()
.set('content-type', 'application/json')
.set('Access-Control-Allow-Origin', '*')

const params= new HttpParams()
.set('print', 'pretty')
.set('pagNum', 1)

  return this.http.get<{[key: string]:Product}>(  'https://angularbyyassine-default-rtdb.firebaseio.com/products.json',
                                                               {'headers': header, params:params})
  .pipe(map((res)=>{
    const products=[];
   for (const key in res  ){

   if(res.hasOwnProperty(key)){
    products.push({ ...res[key] , id:key})
   }
   }
return products;
  }), catchError((err)=>{
//write the logic fr logging error
return throwError(err);
  }))


}

deleteProduct(id: string){
  let header = new HttpHeaders();
  header= header.append('myHeader1', 'value1');
  header= header.append('myHeader2', 'value2');
  this.http.delete('https://angularbyyassine-default-rtdb.firebaseio.com/products/'+id+'.json', {headers:header})
  .subscribe();
}

deleteAllProducts(){
  this.http.delete('https://angularbyyassine-default-rtdb.firebaseio.com/products/.json')
  .subscribe();

}



updateProduct(id:string, value:Product){
  this.http.put('https://angularbyyassine-default-rtdb.firebaseio.com/products/'+id+'.json', value)
  .subscribe()
}


}
