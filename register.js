class Register{
    constructor(){
        this.user = document.querySelector("#ha");
        this.pass = document.querySelector("#hei");
        this.btn = document.querySelector(".zx");
        this.span = document.querySelector(".p1");

        this.init();
        this.getData();
    }
    init(){
        var that = this;
        console.log(this.btn)
        this.btn.onclick = function(){
            that.setData()
        }
    }
    getData(){
        this.abc = localStorage.getItem("abc");
        if(this.abc == null){
            this.abc = [];
        }else{
            this.abc = JSON.parse(this.abc)
        }
    }
    setData(){
        if(this.abc.length == 0){
            this.abc.push({
                user:this.user.value,
                pass:this.pass.value,
                onoff:0
            })
            this.span.innerHTML = "注册成功";
            localStorage.setItem("abc",JSON.stringify(this.abc))
        }else{
            for(var i=0;i<this.abc.length;i++){
                if(this.abc[i].user === this.user.value){
                    this.span.innerHTML = "重名了";
                    return;
                }
            }
            this.abc.push({
                user:this.user.value,
                pass:this.pass.value,
                onoff:0
            })
            this.span.innerHTML = "注册成功";
            localStorage.setItem("abc",JSON.stringify(this.abc))
            setTimeout(()=>{
                location.href = "login.html";
            },1000)
            return;
        }
    }
}

new Register;