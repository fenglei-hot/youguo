function Banner(){
    this.imgbox = document.querySelector(".imgbox")
    this.img = this.imgbox.children;
    this.left = document.getElementById("left")
    this.right = document.getElementById("right")

    this.index = 0;

    this.init()
}
Banner.prototype.init = function(){
    this.imgbox.style.width = this.img.length * this.img[0].offsetWidth + "px";
    this.addEvent()
}
Banner.prototype.addEvent = function(){
    var that = this;
    this.left.onclick = function(){
        that.changeIndex(1)
    }
    this.right.onclick = function(){
        that.changeIndex(2)
    }
}
Banner.prototype.changeIndex = function(type){
    if(type == 1){
        if(this.index == 0){
            this.imgbox.style.left = - (this.img.length-1) * this.img[0].offsetWidth + "px";
            this.index = this.img.length-2;
        }else{
            this.index--
        }
    }else{
        if(this.index == this.img.length-1){
            this.imgbox.style.left = 0;
            this.index = 1
        }else{
            this.index++
        }
    }
    this.display();
}
Banner.prototype.display = function(){
    move(this.imgbox,{left:-this.img[0].offsetWidth * this.index})
}
new Banner();

 //菜单
 var olist = document.querySelector(".shopping")
 var ali = olist.children;
 var otxt = document.getElementById("txt");

 var onOff = true;
 var index = 0;
 otxt.onclick = function(eve){
     var e = eve || window.event;
     stopBubble(e)
     if(onOff){
         olist.style.display = "block";
         setAction()
         onOff = false;
     }else{
         olist.style.display = "none";
         onOff = true;
     }
 }
 document.onclick = function(){
     olist.style.display = "none";
     onOff = true;
 }
 for(var i=0;i<ali.length;i++){
     ali[i].index = i;
     ali[i].onmouseover = function(){
         index = this.index;
         setAction();
     }
     ali[i].onclick = function(){
         otxt.value = this.innerHTML;
         index = this.index;
     }
 }

 document.onkeydown = function(eve){
     if(onOff) return;

     var e = eve || window.event;
     var code = e.keyCode || e.which;

     if(code == 38){
         if(index == 0){
             index = 0
         }else{
             index --
         }
         setAction()
         otxt.value = ali[index].innerHTML;
     }
     if(code == 40){
         if(index == ali.length-1){
             index = ali.length-1
         }else{
             index ++ 
         }
         setAction();
         otxt.value= ali[index].innerHTML;
     }
     if(code == 13){
         olist.style.display = "none";
         onOff = true
     }
 }
 function setAction(){
     for(var j=0;j<ali.length;j++){
         ali[j].className = "";
     }
     ali[index].className = "active";
 }



 function Tab(){
    this.ali = document.querySelectorAll(".box li")
    this.ap = document.querySelectorAll(".box p")
    this.cont=document.querySelector(".cont")
   
    this.addEvent()
}

Tab.prototype.addEvent = function(){
    var that = this;
    for(var i=0;i<this.ali.length;i++){
        this.ali[i].index = i;
        this.ali[i].onmouseenter = function(){
            that.changeIndex(this.index)
        }
    }
}
Tab.prototype.changeIndex = function(index){

    this.index = index;

    this.hideAll()
    this.show()
}
Tab.prototype.hideAll = function (){
    for(var j=0;j<this.ali.length;j++){
        this.ali[j].className = "";
        this.ap[j].style.display = "none";
    }
    // this.cont.style.display="none";

}
Tab.prototype.show = function (){
    this.ali[this.index].className = "active";
    this.ap[this.index].style.display = "block";
}
new Tab();


// var data = [{
//     src:"images/6.jpg",
//     p:"上海南汇玉菇香瓜",
//     span:"￥128.0",
// },{
//     src:"images/2.jpg",
//     p:"上海南汇玉菇香瓜",
//     span:"￥128.0",
// },{
//     src:"images/2.jpg",
//     p:"上海南汇玉菇香瓜",
//     span:"￥299.0",
// },{
//     src:"images/2.jpg",
//     p:"上海南汇玉菇香瓜",
//     span:"￥299.0",
// },{
//     src:"images/2.jpg",
//     p:"上海南汇玉菇香瓜",
//     span:"￥8888"
// }];

// var str = "";
// for(var i=0;i<data.length;i++){        
//     str += '<li class="id1"><a href="#"><div class="cpt"><img src="'+ data[i].src +'"></div><p>'+ data[i].p +'</p><span>'+ data[i].span +'</span></a></li>';

// }
// var ocont = document.querySelector(".list ul");
// ocont.innerHTML = str;



function Goods(){
    this.cont = document.querySelector('body');
    this.addEvent();
}


Goods.prototype.addEvent = function(){
    var that = this;
    this.cont.addEventListener("click",function(eve){
        var e = eve || window.event;
        var target = e.target || e.srcElement;
        if(target.id == "addcart"){
            that.id = target.parentNode.getAttribute("index");
            let img = getComputedStyle(target.parentNode.parentNode.children[0].children[0],false).backgroundImage;
            console.log(target.parentNode.parentNode.children[1])
            let a=target.parentNode.parentNode.children[1].innerHTML;
            console.log(a)
            that.imgS = img.split('"')[1];
            that.a1=a;
            that.pic = target.parentNode.parentNode.children[4].innerHTML.split('￥')[1];
            // // G2.存储cookie
            that.setCookie()
        }
    })
}
Goods.prototype.setCookie = function(){
    this.goods = getCookie("goods");
    console.log(this.goods)
    if(this.goods == ""){
        // 第一次存，直接存
        this.goods = [{
            id:this.id,
            img:this.imgS,
            title:this.a1,
            pic:this.pic,
            num:1
        }];
    }else{
        var onoff = true;
        // 不是第一次存，先读取，字符，转对象
        this.goods = JSON.parse(this.goods)
        for(var i=0;i<this.goods.length;i++){
            // 老数据
            if(this.goods[i].id == this.id){
                // 直接修改数量
                this.goods[i].num++;
                // this.goods[i].img++;
                // img:that.imgS,
                onoff = false;
                break;
            }
        }
        // 新数据
        if(onoff){
            // 直接添加对象
            this.goods.push({
                id:this.id,
                img:this.imgS,
                title:this.a1,
                pic:this.pic,
                num:1
            })
        }
    }
    setCookie("goods",JSON.stringify(this.goods))
}

new Goods();