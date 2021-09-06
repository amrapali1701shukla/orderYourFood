var menu = document.querySelector('#btmmenu');
var left = document.querySelector('#left');
var button = document.querySelector('#right button');
var card = document.querySelector('#card');
var main = document.querySelector('#main');
var amount = document.querySelector('#right button h3>span');
var submit = document.querySelector('#card form input[type="submit"]');
var number = document.querySelector('#card form input[type="number"]');
var address = document.querySelector('#card form textarea');
var order = {};
var price = {
    "Burger": 40,
    "Frenh-fries": 40,
    "sandwhich": 40
}
var a;


document.querySelector('#card form>i').addEventListener('click',function(){
    card.style.display ='none';
    main.style.pointerEvents = "";
})

document.querySelector('#items').addEventListener('click',function(e){
    if(e.target.classList[0] === "ri-add-line"){
        var productName = e.target.dataset.product;
        order[productName]?order[productName] +=1:order[productName] =1;
        menu.style.display ='flex';
        showOrderList();
}});

function showOrderList(){
    var listOrders = { ...order };
    var template = ``;
    for(var data in order){
        template += left.innerHTML = ` 
        <div class="row">
          <h4>${order[data]}</h4>
          <h4>X</h4>
          <h4>${data}</h4>
        </div>`;  
    }
    document.querySelector('#left').innerHTML = template;
    a = pricing();
}

function pricing(){
    var total = 0;
    for(var val in order){
    total += price[val]*order[val]; 
    }
    amount.innerHTML= `${total}`;
    return total;
}

button.addEventListener('click',function(){
    card.style.display = 'flex';
    main.style.pointerEvents = "none";
})

document.querySelector('.ri-close-line').addEventListener('click',function(){
    menu.style.display ='none';                
});

submit.addEventListener('click',function(e){
    e.preventDefault();
    axios.post('http://127.0.0.1:3000/order',{
        orders: order,
        price:a,
        number:number.value,
        address:address.value
    })
    .then(function(res){
        window.location.href = 'http://127.0.0.1:3000/orders';
    })
})