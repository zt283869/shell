  var results="";
    var calresults="";
    function calculater(){
        if (event.srcElement.innerText=="=") {
            return;
        }
       results+=event.srcElement.innerText;
       display.innerText=results;
    }
    function resultscalcaulte(){
      calresults=eval(results);
      display.innerText=calresults;
    }