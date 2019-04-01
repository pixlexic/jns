var _slider = null;
var _selectedmenu = null;
var _menubar = null;
var _logo = null;

var _modalbg = null;
var _menuMini = null;

window.onload = function(e) {

    _menubar = document.getElementById("mmenubar");
    _menuspace = document.getElementById("mmenuspace");
    _menu = document.getElementById("mmenu");

    _slider  = document.getElementById("mslider");

    _logo = document.getElementById("mlogo");

    _modalbg  = document.getElementById("modalbg");
    _menuMini =  document.getElementById("menumini");


    _modalbg.addEventListener("transitionend", modelTransEnd);


    document.addEventListener('touchend', bubbleStop, false);
    document.addEventListener('touchmove', bubbleStop, false);
    document.addEventListener('touchend', bubbleStop, false);


    var so = document.getElementById('mselected');
    _selectedmenu = so;
    setSlider(so);
    checkScroll();
};



window.onscroll = function() {

    //_menubar.innerHTML = _h;
    checkScroll();

};


checkScroll = function() {

    var _h = document.documentElement.scrollTop || document.body.scrollTop;

    if (_h > 10) {
        _menubar.className = "h_boxb mainmenubg";
        _menuspace.className = "h_menuspaceb";
        _menu.className = "h_menub";
        _logo.className = "infoLogox mainLogo";
    } else {
        _menubar.className = "h_box mainmenubg";
        _menuspace.className = "h_menuspace";
        _menu.className = "h_menu";
        _logo.className = "infoLogo mainLogo";
    }

}



modelTransEnd = function() {


if (  _modalbg.style.opacity == 0){
    //_modalbg.style.display = 'none';
    _modalbg.style.right = '100%';
    _menuMini.style.width= '0px';
}


}


setSliderOut = function() {

    


    /*
    if (_selectedmenu != null && _slider != null) {
        _slider.style.left = (_selectedmenu.getBoundingClientRect().left - 170) + 'px';
        _slider.style.width = _selectedmenu.getBoundingClientRect().width + 'px';
        // alert(ob.offsetWidth);
    }
    */
};



setSlider = function(ob) {




/*
    _slider.style.left = (ob.getBoundingClientRect().left - 170) + 'px';
    _slider.style.width = ob.getBoundingClientRect().width + 'px';
    // alert(ob.offsetWidth);
*/
};







setMenu = function(){

    document.body.style.overflow = 'hidden';
   // _modalbg.style.display = 'block';
   _modalbg.style.right = '0px';
    _modalbg.style.opacity = "0.85";
    _menuMini.style.width= '100%';

   var elems = document.getElementsByClassName("menB");

   for(let i = 0; i < elems.length; i++){
   
      let r = elems[i].offsetRight
      elems[i].style.right = '10px';
   }
   


}



setMenuoff = function(){

    document.body.style.overflow = 'auto';
    //_menuMini.style.width= '0px';
    _modalbg.style.opacity = "0";


    var elems = document.getElementsByClassName("menB");

    for(let i = 0; i < elems.length; i++){
    
       let r = elems[i].offsetRight
       elems[i].style.right = (-400 - ( i * 120)) + 'px';
    }

}