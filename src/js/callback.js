/* 
* @function: API call using callback.
* @Description: Displays the Country Code in which the input name is the most popular with probability. 
* @Author: Kamya Garg
*/

// Declaring varibales
let form = document.getElementById("myForm");
let submit = document.getElementById("click");
let loader_round = document.getElementById("loader_id");
let output_all = document.getElementById("output");
let try_again_btn = document.getElementById("try_again");


form.addEventListener('submit', e => {
    e.preventDefault();

    //Getting the input data
    let inp_name = document.getElementById("name");

    if (inp_name.value == "") {
        let msg = "Please enter username"
        errorMsg(msg, "inp_name_error", inp_name);
    }
    else {
        let msg = "";
        successMsg(msg, "inp_name_error", inp_name);
        let input_name = inp_name.value.trim();

        //Hiding the display button
        submit.style.display = 'none';

        //Displaying the loader 
        loader_round.style.display = '';

        //Calling the async function with a delay of 3 seconds
        setTimeout(() => {
            callbackN(input_name,disOutput)
        }, 3000);

    }

    // To display the error message 
    function errorMsg(msg, id_div, id_inp) {
        document.getElementById(id_div).innerHTML = msg;
        id_inp.classList.add("red-border");
    }

    // To display the success green box
    function successMsg(msg, id_div, id_inp) {
        document.getElementById(id_div).innerHTML = msg;
        id_inp.classList.remove("red-border");
        id_inp.classList.add("green-border");
    }

});


function callbackN(input_name,callback){

    //Fetching the link with given input
    fetch('https://api.nationalize.io/?name='.concat(input_name))
    .then(response =>{
        return response.json();
    })
    .then((data)=>{
        let info = data;
        let req_info = info.country[0];

        //Hiding the loader before displaying the output
        console.log("loader");
        loader_round.style.display='none';

        //Checking if the retrieved data has some value
        console.log(typeof(req_info),"req info type");
        if (typeof (req_info) != 'undefined'){
            callback(req_info);
        }else{
            //Alert if the name is not there in API 
            console.log("try agan btn:", try_again_btn);
            try_again_btn.style.display = 'block';
            alert("A girl has no name");
        }

    })
}

//
function disOutput(req_info){
    let c_id = req_info.country_id;
    let prob = req_info.probability;

    //Printing the country id and probabilty
    document.getElementById("c_id").innerHTML = c_id;
    let pro = Math.round((prob + Number.EPSILON) * 100) / 100;
    document.getElementById("prob").innerHTML = pro;

    //Enabling the output section to display on screen
    output_all.style.display= 'block';
}


//Resetting the form
function clearForm() {
    document.getElementById("myForm").reset();
    output_all.style.display = 'none';
    submit.style.display = "block";
    let inp_name = document.getElementById("name");
    inp_name.classList.remove("green-border");
    // document.getElementById("name").classList.remove("green-border");
    // document.getElementById("inp_name_error").innerHTML = '';
}