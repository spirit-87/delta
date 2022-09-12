/* Adds Element BEFORE NeighborElement */
Element.prototype.appendBefore = function(element) {
    element.parentNode.insertBefore(this, element);
}, false;
  
/* Adds Element AFTER NeighborElement */
Element.prototype.appendAfter = function(element) {
    element.parentNode.insertBefore(this, element.nextSibling);
}, false;

function ajax_get(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log('responseText:' + xmlhttp.responseText);
            try {
                var dataJson = JSON.parse(xmlhttp.responseText);
            } catch(err) {
                console.log(err.message + " in " + xmlhttp.responseText);
                return;
            }
            callback(dataJson);
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}


function setOpacity(el) {
    var op = 0;
    setTimeout(function func() {
        if (op > 1)
            return;
        el.style.opacity = op;
        op += 0.1;
        setTimeout (func, 60);
    }, 60);    
}

function gap(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}


