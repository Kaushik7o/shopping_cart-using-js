let back=document.getElementById("back")
back.addEventListener("click",backTo)

function backTo(e)
{
    e.preventDefault();
  window.location.href="shop.html"  
}

let form = document.getElementById("from");
form.addEventListener("submit", (e) => {
    // Get values from the fields
    e.preventDefault();
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let pincode = document.getElementById("pincode").value.trim();
    let address = document.getElementById("address").value.trim();

    let a={"name":name,"email":email,"pincode":pincode,"address":address}
    // Check if any mandatory field is empty
    if (!name || !email || !pincode || !address) {
        
        alert("Please fill all mandatory fields first");
    } else {
        
        let info=JSON.parse(localStorage.getItem("info"))||[]
         info.push(a);
         localStorage.setItem("info",JSON.stringify(info))
         
        alert("Order placed successfully");
        
        setTimeout(() => {
            window.location.href = "shop.html";
        }, 3000);
    }
});

let map=document.getElementById("map")

map.addEventListener("select",()=>
{
    
    localStorage.setItem("info",JSON.stringify(map))
})