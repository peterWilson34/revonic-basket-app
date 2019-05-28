import Basket from '../classes/Basket';
let basket = new Basket();

fetch('assets/data.json').then((res)=>{
    res.json().then((items)=>{
        let products = items.products;
        basket.setItems(products);
        basket.renderItems("table tbody");
        $(()=>{
            $("body").on("change","input.qty",(e)=>{
                let index = $(e.target).closest("tr").attr("id");
                let val = $(e.target).val();
                
                products[index].qty= val;
                basket.setItems(products);
                basket.renderItems("table tbody");
                
            });
            $("body").on("click","button.add",(e)=>{
                let index = $(e.target).closest("tr").attr("id");
                
                if(products[index].qty <10){
                    products[index].qty++;
                    basket.setItems(products);
                    basket.renderItems("table tbody");
                }else{
                    $(e.target).attr("disabled",true)
                    return false;
                }
                
            });
            $("body").on("click","button.sub",(e)=>{
                let index = $(e.target).closest("tr").attr("id");
                if(products[index].qty >=1){
                    products[index].qty--;
                    basket.setItems(products);
                    basket.renderItems("table tbody");
                }else{
                    $(e.target).attr("disabled",true)
                    return false;
                } 
                
                
            });
            $("body").on("click",".delete",(e)=>{
                let index = $(e.target).closest("tr").attr("id");
                products.splice(index,1)
                
                basket.renderItems("table tbody");
                
                if(!products.length){
                    $("button.buy").attr("disabled",true)
                }
                
            });
            $("body").on("click",".buy",(e)=>{
                fetch('https://jsonplaceholder.typicode.com/posts',{
                    method:"POST"
                }).then((res)=>{
                    alert("Congratulations! your purchase is done successfully")
                },(err)=>{
                    alert(JSON.stringify(err))
                })
            });
        })
        
    })
    
})
