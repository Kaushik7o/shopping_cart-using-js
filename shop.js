//get data from api

let renderData=document.getElementsByClassName("renderData")[0]
let renderCartData=document.getElementsByClassName("renderCartData")[0]
let dynamiccount=document.querySelector(".dynamic-count")
let sum=document.getElementById("total")
let confirmPurcahse=document.getElementById("confirmPurchase")
let arr=[];

let tot=0;
async function getData()
{
const response=await fetch("https://fakestoreapi.com/products");
const data=await response.json();


data.map((ele)=>
{
    let productMainDiv=document.createElement("div")
    let createImgEle=document.createElement("img");
    let createTitle=document.createElement("p")
    let createPriceEle=document.createElement("p")
    let btnEle=document.createElement("button")
    let btnText=document.createTextNode("Add to Cart")
    btnEle.setAttribute("class","btn")
   
    
    let createPriceText=document.createTextNode(`Price : $${ele.price}`)
    let createTextTitle=document.createTextNode(`${ele.title.slice(0,25)}...`)
     createImgEle.setAttribute("src",ele.image);
     createImgEle.setAttribute("class","myImage");
     productMainDiv.setAttribute("class","box-main")
     createTitle.setAttribute("class","title")
     createTitle.appendChild(createTextTitle);
     createPriceEle.appendChild(createPriceText)
     btnEle.appendChild(btnText)
     productMainDiv.appendChild(createImgEle);
     productMainDiv.appendChild(createTitle);
     
     productMainDiv.appendChild(createPriceEle);
     productMainDiv.appendChild(btnEle)

     renderData.appendChild(productMainDiv)

     function addToCart(img,price)
     {
        const existingItemIndex = arr.findIndex(item => item.m === img && item.r === price);

        if (existingItemIndex > -1) {
            // If item exists, just increase quantity
            
            arr[existingItemIndex].qty += 1; // You may want to add this to your object in arr
            // Optionally update display logic here to reflect the quantity change
        } else {
           // Push new item
        
    
        // Update the cart display
        dynamiccount.innerHTML = arr.length;
    
        // Show the confirm button if there's at least one item
        confirmPurcahse.style.display = arr.length > -1 ? "block" : "none";
       
        confirmPurcahse.addEventListener("click",()=>
        {
        window.location.href="payment_page.html"
        
        })

        // __________________________________________________________________
       
        arr.push({m:img , r:price, qty:1})//object in array format -> push for array method
        console.log(arr);
         
        let contain=document.createElement("div")
        contain.setAttribute("class","contain")
        let cartImgEe=document.createElement("img")
        let cartTrashBtn=document.createElement("i")
        cartTrashBtn.setAttribute("class","fa-solid fa-trash")
        cartTrashBtn.setAttribute("id","delete")
        cartImgEe.setAttribute("src",img);
        cartImgEe.setAttribute("class","cartImgElement")
        let cartPriceEle=document.createElement("p")
        cartPriceEle.setAttribute("class","priceCart")
        let cartPriceText=document.createTextNode(price);
        cartPriceEle.appendChild(cartPriceText)
        let range=document.createElement("span")
        let up=document.createElement("input")
        up.setAttribute("type","number")
        up.setAttribute("min",1)
        up.setAttribute("max",10)
        up.setAttribute("class","up")
        up.setAttribute("value",1)
        let textrange=document.createTextNode(`Qty :`)
        range.appendChild(textrange)
        range.appendChild(up)
        range.setAttribute("class","range")
        let hr=document.createElement("hr")
        hr.setAttribute("class","hr2")

        dynamiccount.innerHTML=arr.length;
        console.log("MyImage : "+img);
        console.log("MyPrice : "+price);
        
        contain.appendChild(cartImgEe)
        contain.appendChild(cartPriceEle)
        contain.appendChild(range)
        contain.appendChild(cartTrashBtn)
  
        renderCartData.appendChild(contain)
        renderCartData.appendChild(hr)

     
      tot += Math.round(price);//keep track of total
    
       sum.innerText=`${tot}.00 Rs`;//total in rs

       
    
        up.addEventListener("change", (e) => {
            const newQty = parseInt(up.value);
            
            // Get the current item's index
            const existingItemIndex = arr.findIndex(item => item.m === img && item.r === price);
            
            if (existingItemIndex > -1) {
                // Update the quantity in the array
                arr[existingItemIndex].qty = newQty;
                
                // Recalculate the total
                tot = arr.reduce((sum, item) => sum + (item.r * item.qty), 0);
                sum.innerText = `${Math.round(tot)}.00 Rs`;
            }
        });
        

 


        cartTrashBtn.addEventListener("click", (event) => {
            let y = confirm("Are you sure you want to delete this item?");
            if (y) {
                // Assuming 'contain' is the item you want to remove
                event.currentTarget.closest('.contain').remove(); // Replace '.item' with the appropriate selector
                
               
                const index = arr.findIndex(item => item.m === img && item.r === price);
                if (index !== -1) {
                    arr.splice(index, 1);
                    dynamiccount.innerText = arr.length;

                    // Subtract from total
                    tot -= Math.round(price);
                    sum.innerText = `${tot}.00 Rs`;

                         // Check if the cart is empty to hide the confirm button
            if (arr.length === 0) {
                confirmPurcahse.style.display = "none";
               hr.style.display="none"
            

                    
                }
            }
            }
        });

    }
        
     }
     btnEle.addEventListener("click",()=>
    
        addToCart(ele.image,ele.price)
    )
})

}
getData();
    

function focus1()
{
document.getElementById("search").focus();
}