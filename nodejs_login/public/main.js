window.onload = function() {
    let newbtn = document.getElementById("newbtn");
    newbtn.onclick= function(){
        window.open("register.html","newbtnpopup","width:400, height:400");
    }

    let listbtn = document.getElementById("listbtn");
    listbtn.onclick = function(){
        window.open("list.html", "listbtnpopup");
    }
}