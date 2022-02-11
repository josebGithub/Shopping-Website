var shoppingCart=[];

function addToCart(itemId, name,description,price, quantity){
    alert("Call addToCart()");
    console.log("Call addToCart()"); 
    var singleProduct = {};
   
    singleProduct.Name=name;
    singleProduct.Description=description;
    singleProduct.Price=price;
    //Add newly created product to our shopping cart 
    localStorage.setItem(itemId, JSON.stringify(singleProduct));
 }  

 function displayShoppingCart() {
    alert("localStorage length : "+localStorage.length);
    for (let i = 0; i < localStorage.length; i++){
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);
        alert("key : "+key+"  value : "+value);
        console.log(key, value);
      }
    
      localStorage.clear();
       
    }

/**
function addToCart(name,description,price){
    alert("Call addToCart()");
    console.log("Call addToCart()"); 
    var singleProduct = {};
   
    singleProduct.Name=name;
    singleProduct.Description=description;
    singleProduct.Price=price;
    //Add newly created product to our shopping cart 
    shoppingCart.push(singleProduct);
    alert("shoppingCart length : "+shoppingCart.length);
    alert('SingleProduct : '+singleProduct);
    console.log('SingleProduct : '+singleProduct);
    //call display function to show on screen
    //displayShoppingCart();
 }  

 function displayShoppingCart() {
    alert("Call displayShoppingCart()"); 
    console.log("Call displayShoppingCart()"); 
    alert("shoppingCart length : "+shoppingCart.length);
    for(var product in shoppingCart){
    
       alert(shoppingCart[product].Name+shoppingCart[product].Description+shoppingCart[product].Price);
       console.log(shoppingCart[product].Name+shoppingCart[product].Description+shoppingCart[product].Price);
       
    }

     */
 



