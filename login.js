class Login{
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
        this.btn.onclick = function(){
            that.yanzheng();
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
    yanzheng(){
        for(var i=0;i<this.abc.length;i++){
            if(this.abc[i].user == this.user.value && this.abc[i].pass == this.pass.value){
                this.span.innerHTML = "登录成功,3秒后跳转";

                this.abc[i].onoff = 1;

                localStorage.setItem("abc",JSON.stringify(this.abc))

                setTimeout(()=>{
                    location.href = "index.html";
                },3000)
                return;
            }
        }
        this.span.innerHTML = "用户名密码不符";
    }
}


new Login();