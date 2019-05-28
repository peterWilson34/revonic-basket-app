const currency = "£";
export default class Basket{
    setItems(items){
        this.items = items;
    }
    renderItems(container){
        let template = ``;
        let subTotal= 0;
        const vat = 20;
        for (let i = 0; i < this.items.length; i++) {
           subTotal += this.items[i].qty * this.items[i].price;
           let cost = (this.items[i].qty * this.items[i].price).toFixed(2)
           template+=(`
            <tr id=${i}>
                <td>${this.items[i].product}</td>
                <td><span class="currency">${currency}</span><span class="price">${this.items[i].price}</span></td>
                <td class="qty">
                    <input type="number" class="qty" value="${this.items[i].qty}">
                    <button class="add">+</button>
                    <button class="sub">-</button>                        
                </td>
                <td>
                    <span class="currency">${currency}</span><span class="cost">${cost}</span>
                </td>
                <td><i class="fas fa-trash-alt delete"></i></td>
            </tr>
            
           `)
        };
        let vatCost = (subTotal*vat/100).toFixed(2);
        let totalCost = (parseFloat(subTotal) + parseFloat(vatCost)).toFixed(2);
        template+= `
            <tr class="td-no-padding light">
                <td>
                    <span >Subtotal</span>
                </td>
                <td></td>
                <td></td>
                <td><span class="currency">${currency}</span><span class="cost">${subTotal.toFixed(2)}</span></td>                
            </tr>
            <tr class="td-no-padding light">
                <td>
                    <span >VAT@ ${vat}%</span>
                </td>
                <td></td>
                <td></td>
                <td><span class="currency">${currency}</span><span class="cost">${ vatCost}</span></td>                
            </tr>
            <tr>
                <td>
                    <span >Total Cost</span>
                </td>
                <td></td>
                <td></td>
                <td><span class="currency">${currency}</span><span class="cost">${ totalCost }</span></td>                
            </tr>
        `
        $(container).html(template);
    }
}