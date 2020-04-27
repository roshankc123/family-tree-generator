
// Create the XHR object.
function makeRequest(method, url) {
    var request = new XMLHttpRequest();
    if ("withCredentials" in request) {
        // request for modern browsers
        console.log(request);
        request.open(method, url, true);
    } 
    else if (typeof XDomainRequest != "undefined") {
        // request for older IE browsers
        request = new XDomainRequest();
        request.open(method, url);
    } else {
        // CORS not supported.
        request = null;
    }
    return request;
}

var editForm = document.getElementById("edit-form");
editForm.onsubmit = event => {
    event.preventDefault();
    // All data from the form
    var allData = new FormData(editForm);
    var div_id = 1;

    // Server to send data
    var url = `http://40.71.91.158/api/main.php?&div_id=${div_id}`;

    var request = makeRequest('POST', url);
    if (!request) {
        console.log('Cross site request not supported');
        return;
    }

    // Handle the requests
    request.onreadystatechange = () => {
        if(this.readystate == 4 && this.status == 200){
            var response = JSON.parse(this.responseText);
            console.log(response);
        } else if(this.status != 200 && this.readystate == 4){
            console.log("Some error occured");
        }
    };

    request.send(allData);
};