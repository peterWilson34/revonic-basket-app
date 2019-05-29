export default class Basket{
    constructor(currency,vat){
        //setting defualt params
        this.currency = currency || "£";
        this.vat = this.vat || 20;
    }
    setItems(items){
        this.items = items;
    }
    renderItems(container){
        // Initializing template
        let template = ``;
        let subTotal= 0;
        // Loop ober the products

        //rendering the products
        for (let i = 0; i < this.items.length; i++) {
           subTotal += this.items[i].qty * this.items[i].price;
           let cost = (this.items[i].qty * this.items[i].price).toFixed(2)
           template+=(`
            <tr id=${i}>
                <td>${this.items[i].product}</td>
                <td><span class="currency">${this.currency}</span><span class="price">${this.items[i].price}</span></td>
                <td class="qty">
                    <input type="number" class="qty" value="${this.items[i].qty}">
                    <div class="btns">
                        <button class="add">+</button>
                        <button class="sub">-</button>                        
                    </div>
                </td>
                <td>
                    <span class="currency">${this.currency}</span><span class="cost">${cost}</span>
                </td>
                <td class="actions"><i class="fas fa-trash-alt delete"></i></td>
            </tr>
            
           `)
        };
        //Adding Vat and subtotal 
        let vatCost = (subTotal*this.vat/100).toFixed(2);
        let totalCost = (parseFloat(subTotal) + parseFloat(vatCost)).toFixed(2);
        template+= `
            <tr class="td-no-padding light">
                <td>
                    <span >Subtotal</span>
                </td>
                <td></td>
                <td></td>
                <td><span class="currency">${this.currency}</span><span class="cost">${subTotal.toFixed(2)}</span></td>                
            </tr>
            <tr class="td-no-padding light">
                <td>
                    <span >VAT@ ${this.vat}%</span>
                </td>
                <td></td>
                <td></td>
                <td><span class="currency">${this.currency}</span><span class="cost">${ vatCost}</span></td>                
            </tr>
            <tr>
                <td>
                    <span >Total Cost</span>
                </td>
                <td></td>
                <td></td>
                <td><span class="currency">${this.currency}</span><span class="cost">${ totalCost }</span></td>                
            </tr>
        `
        //Appending the template to HTML
        $(container).html(template);
    }
}