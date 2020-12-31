window.onload = function() {
  var cart = document.getElementById('cart');
  cart.onclick = function() {
    openLayer('carts',50,550);
  }

  checkAll('select-all-n', 'nomal_check','nomal_sum');
  checkAll('select-all', 'dawn_check','dawn_sum');
  del_product("del_n", "nomal_cart","nomal_check","nomal_sum");
  del_product("del_d", "dawn_cart","dawn_check","dawn_sum");
  moveCart("move_d","nomal_cart","dawn_cart","nomal_check","dawn_check","dawn_sum");
  moveCart("move_n","dawn_cart","nomal_cart","dawn_check","nomal_check","nomal_sum");
}

function openLayer(IdName,tpos, lpos){
  var pop = document.getElementById(IdName);
  pop.style.display = "block";
  pop.style.top = tpos + "px";
  pop.style.left = lpos + "px";
}

function closeLayer(IdName){
  var pop = document.getElementById(IdName);
  pop.style.display = "none";
}

document.getElementById("cancle_b").onclick = function() {
  closeLayer('carts');
}

//장바구니 입력 처리
document.getElementById("add").onclick = function() {
  var image = document.getElementById("image");
  var name = document.getElementById("product_name");
  var price = document.getElementById("product_price");
  var count = document.getElementById("product_count");
  var nomal = document.getElementById("nomal");
  var dawn = document.getElementById("dawn");
  var fileForm = /(.*?)\.(jpg|png|jpeg)$/;
  var tests = image.value.split('\\');
  var root = "./"+tests[2];

  if(!image.value){alert("상품 이미지를 추가하시오");}
  else if(!image.value.match(fileForm)){alert("이미지 파일이 아닙니다. 'jpg','jpeg' 또는 'png'을 확장자로 가진 파일을 추가하시오");}
  if(name.value=="") {alert("상품 이름을 입력시오");name.value="";}
  inputCheck(document.getElementById('product_name'),"ke","문자로 된 상품 이름을 입력하시오");
  if(price.value=="") {alert("상품 가격을 입력하시오");}
  else if(price.value < 1000){alert("상품 가격을 1000원 이상으로 입력하시오");price.value="";}
  inputCheck(document.getElementById('product_price'),"n","상품 가격에 숫자를 입력하시오");
  if(count.value=="") {alert("상품 개수를 입력하시오");}
  else if(count.value > 50){alert("최대 50개 이하로 선택하시오");count.value="";}
  inputCheck(document.getElementById('product_count'),"n","상품 가격 개수에 숫자를 입력하시오");
  if(nomal.checked==false && dawn.checked==false){alert("배송 방법을 선택하시오");}

  //버튼 check 처리
  if(image.value && name.value!="" && price.value!="" && count.value!="") {
    if(nomal.checked == true) {tableCreate(root, name, price, count, 'nomal_cart','nomal_check');
      check_product('nomal_sum');
    }
    if(dawn.checked == true) {tableCreate(root, name, price, count, 'dawn_cart','dawn_check');
      check_product('dawn_sum');
    }
  }

}

//상품 checkbox 선택시 총가격 변동 처리
function check_product(sum) {
  var check;
  var select;
  if(sum == 'nomal_sum') {check  = document.querySelectorAll('.nomal_check');select = "select-all-n";}
  else {check  = document.querySelectorAll('.dawn_check');select = "select-all";}
  var cal = 0;
  var flag = false;
  for(var i=0;i<check.length;i++) {
    if (check[i].checked == true) {
      cal += parseInt(check[i].value);
    }else {flag = true}
  }
  if(flag == false) {document.getElementById(select).checked = true;}
  else {document.getElementById(select).checked = false;}
  document.getElementById(sum).innerHTML = cal;
}

//전체선택 버튼 처리
function checkAll(id, name, sum) {
  document.getElementById(id).onclick = function() {
    var check1 = document.getElementsByClassName(name);
    if(document.getElementById(id).checked==true) {
      for( var i = 0; i < check1.length; i++ ){check1.item(i).checked = true;}
    } else {
      for( var i = 0; i < check1.length; i++ ){check1.item(i).checked = false;}
    }
    check_product(sum);
  }
}

//장바구니 값 입력 처리
function inputCheck(v, type, m) {
  var reg;
  switch (type) {
    case "n": //숫자만 입력되는 정규식.
      reg = /[^0-9]/gi;
      break;
    case "ke": //한글, 영어만 입력되는 정규식
      reg = /[^ㄱ-ㅎ가-힣a-z]/gi;
      break;
  }
  if(reg.test(v.value)){v.value="";}
}

//장바구니 정보 테이블 삽입 처리
function tableCreate(images, names, prices, counts, dil, classes){
  var tc = new Array();
  var html = '';
  var dilivery = '#'+dil;
  var sum;
  if(dil == 'nomal_cart') {sum = "nomal_sum";}
  else {sum = "dawn_sum";}
  tc.push({name : names.value, price : prices.value, count : counts.value});
  for(key in tc){
  html += '<tr>';
  html += '<td><input type="checkbox" checked id="'+tc[key].name+'" value="'+prices.value * counts.value+'"class="'+classes+'" onclick="check_product('+"'"+sum+"'"+')"</td>';
  html += '<td><img src="'+images+'" alt="My Image" width="80px" height="80px"></td>';
  html += '<td>'+tc[key].name+'</td>';
  html += '<td>'+tc[key].price+'</td>';
  html += '<td>'+tc[key].count+'</td>';
  html += '<td>'+ prices.value * counts.value +'</td>';
  html += '</tr>';
  }
  document.getElementById(dil).innerHTML += html;
}

//배송 이동
function moveCart(move,cart1,cart2,check1,check2,sum) {
  document.getElementById(move).onclick = function() {
    var table = document.getElementById(cart1);
    var athor_table = document.getElementById(cart2);
    var classes = document.getElementsByClassName(check1);
    var temp = "";
    for(var i=0;i<classes.length;i++) {
      if(classes.item(i).checked) {
        temp = classes.item(i).parentNode.parentNode.innerHTML;
        table.deleteRow(i);
        athor_table.innerHTML += temp;
        i=-1;
      }
    }
    for(var j=1;j<athor_table.childNodes.length;j++) {
      var temp2 = athor_table.childNodes[j].childNodes[0];
      temp2.childNodes[0].setAttribute("class", check2);
      temp2.childNodes[0].setAttribute("onclick","check_product("+sum+")");
    }
    check_product("nomal_sum");
    check_product("dawn_sum");
  }
}

//배송 상품 삭제
function del_product(del, cart, check,sum) {
  document.getElementById(del).onclick = function() {
    var table = document.getElementById(cart);
    var classes = document.getElementsByClassName(check);
    for(var i=0;i<classes.length;i++) {
      if(classes[i].checked) {table.deleteRow(i);i=-1;}
    }
    check_product(sum);
  }
}

//상품 정보 검색
document.getElementById('search').onclick = function() {
  var name = document.getElementById('name').value;
  var rangeFirst = parseInt(document.getElementById('price1').value | 0);
  var rangelast = parseInt(document.getElementById('price2').value | 0);
  var nomalCart = document.getElementsByClassName("nomal_check");
  var dawnCart = document.getElementsByClassName("dawn_check");
  if(rangelast == 0) {rangelast = 2147483647;}
  alert(name);
  alert(rangelast);
  if(name!="") {
    for(var i=0;i<nomalCart.length;i++) {
      var temp = nomalCart.item(i).parentNode.parentNode;
      if(nomalCart.item(i).id.includes(name) && parseInt(nomalCart[i].value)>=rangeFirst && parseInt(nomalCart[i].value)<=rangelast)
      {temp.setAttribute("class","search");}
      else {temp.setAttribute("class","");}
    }
    for(var i=0;i<dawnCart.length;i++) {
      var temp = dawnCart.item(i).parentNode.parentNode;
      if(dawnCart.item(i).id.includes(name) && parseInt(dawnCart[i].value)>=rangeFirst && parseInt(dawnCart[i].value)<=rangelast)
      {temp.setAttribute("class","search");}
      else {temp.setAttribute("class","");}
    }
  }
}

//상품 하이라이트 삭제
document.getElementById("color").onclick = function() {
  var nomalCart = document.getElementsByClassName("nomal_check");
  var dawnCart = document.getElementsByClassName("dawn_check");
  for(var i=0;i<nomalCart.length;i++) {
    var temp = nomalCart.item(i).parentNode.parentNode;
    temp.setAttribute("class","");
  }
  for(var i=0;i<dawnCart.length;i++) {
    var temp = dawnCart.item(i).parentNode.parentNode;
    temp.setAttribute("class","");
  }
}
