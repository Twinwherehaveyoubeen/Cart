 if ( document.readyState == "loading"){
   document.addEventListener('DOMContentLoaded', ready)
 } else{
   ready()
 }
 
 function ready(){
   var removeCartItemButton = document.getElementsByClassName('btn-danger')
   const removeCartItemButtons = document.getElementsByClassName('btn-danger');
   for (let button of removeCartItemButtons) {
       button.addEventListener('click', removeCartItem);
   }
   
   }
   const quantityInputs = document.getElementsByClassName('cart-quantity-input')
   for(var i= 0; i < quantityInputs.length; i++){
      var input = quantityInputs[i]
      input.addEventListener('change', quantityChanged)
   }
    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for(var i= 0; i < addToCartButtons.length; i++){
      var button = addToCartButtons[i]
      button.addEventListener('click', addToCartClicked)
    }
 
 
 
 function removeCartItem(event){
    var buttonClicked = event.target
         buttonClicked.parentElement.parentElement.remove()
          updateCartTotal()
 }

function quantityChanged(event){
var input = event.target
if (isNaN (input.value) || input.value <= 0){
   input.value = 1
}
 updateCartTotal()
}
function addToCartClicked(event){
   var button = event.currentTarget
   var shopItem= button. parentElement.parentElement
   var title= shopItem.getElementsByClassName('shop-item-title')[0].innerText
   var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
   var imageSrc = shopItem.getElementsByClassName(' shop-item-image')[0].src
   addItemToCart(title, price, imageSrc)
   updateCartTotal()
   
}

function addItemToCart(title, price, imageSrc){
var cartRow = document.createElement('div')
cartRow.classList.add('cart-row')
var cartItems = document.getElementsByClassName('cart-items')[0]
var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
for(var i = 0; i< cartItemNames.length; i++ ){
   if (cartItemNames [i]. innerText == title){
      alert('This item is already add to the cart')
      return
   }
}
var cartRowContent = `
<div class="cart-item cart-column">
                        <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
                        <span class="cart-item-title">${title}</span>
                    </div>
                    <span class="cart-price cart-column"> ${price}</span>
                    <div class="cart-quantity cart-column">
                        <input class="cart-quantity-input" type="number" value="1">
                        <button class="btn btn-danger" type="button">REMOVE</button>
                    </div>`
     cartRow.innerHTML = cartRowContent               
cartItems.append(cartRow)
cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

 function updateCartTotal(){
   const cartItems = document.getElementsByClassName('cart-items')[0];
   const cartRows = cartItems.getElementsByClassName('cart-row');
   
   let total = 0
         for ( var i= 0; i < cartRows.length; i ++){
            var cartRow = cartRows[i]
            var priceElement = cartRow.getElementsByClassName('cart-price')[0]
            const quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];

            var price = parseFloat(priceElement.innerText.replace('$', ''))
            var quantity = parseInt(quantityElement.value )
            total = total + (price * quantity)
         }
         total = Math.round(total * 100) / 100
   document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total 
}

