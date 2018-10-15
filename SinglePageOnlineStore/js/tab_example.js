// Kambathalli parswanatha Nagachandra
// Account: jadrn053
// CS645, Spring 2018
// Project #1
$(document).ready(function() {

    $("#tabs").tabs();
    $("[name='sku']").val('');
    $("[name='sku']").focus();
    var skufordel = $("#skuForDel");

    $('#sku').on('blur', function() {
        var sku = $('#sku').val()
        if(!sku) return
        $('#message').show();
        if(isValidSKU(sku))
        {
            var url = "/perl/jadrn053/checkdup.cgi?sku=" + sku;
            $.get(url, process_reply);
            $('#message').text("");


        }
        else
        {
            $('#message').text("Please enter a valid SKU number");
            $("#addInventorySubmit").prop('disabled', true);
            return
        }

    });

    $("#addInventorySubmit").prop('disabled', true);
    $("#deleteInventorySubmit").prop('disabled', true);

    $("#Deldescription").prop('disabled', true);
    $("#Delcategories").prop('disabled', true);
    $("#Delcost").prop('disabled', true);
    $("#Delvendor").prop('disabled', true);
    $("#Delretail").prop('disabled', true);
    $("#DelQuantity").prop('disabled', true);
    $("#Delfeatures").prop('disabled', true);
    $("#DelManufacturer").prop('disabled', true);

    var errorStatusHandle = $('#message');
    var elementHandle = new Array(12);
    elementHandle[0] = $('[name="categories"]');
    elementHandle[1] = $('[name="cost"]');
    elementHandle[2] = $('[name="vendor"]');
    elementHandle[3] = $('[name="retail"]');
    elementHandle[4] = $('[name="ManufacturerId"]');
    elementHandle[5] = $('[name="Quantity"]');
    elementHandle[6] = $('[name="description"]');
    elementHandle[7] = $('[name="product_image"]');
    elementHandle[8] = $('[name="features"]');
    elementHandle[9] = $('[name="sku"]');
    elementHandle[10] = $('[name="skuForDel"]');



    function isValidData() {



        var cat = $("#categories");

        if (cat.val() == "0") {
            elementHandle[0].addClass("error");
            errorStatusHandle.text("Please select a category");
            return false;
        }

        if (isEmpty(elementHandle[1].val())) {
            elementHandle[1].addClass("error");
            errorStatusHandle.text("Please enter Cost");
            elementHandle[1].focus();
            return false;
        }
        var ven = $("#vendor");
        if (ven.val() == "0") {
            elementHandle[2].addClass("error");
            //If the "Please Select" option is selected display error.
            errorStatusHandle.text("Please select a vendor");
            return false;
        }

        if (isEmpty(elementHandle[3].val())) {
            elementHandle[3].addClass("error");
            errorStatusHandle.text("Please enter retail price");
            elementHandle[3].focus();
            return false;
        }

        if (isEmpty(elementHandle[4].val())) {
            elementHandle[4].addClass("error");
            errorStatusHandle.text("Please enter ManufacturerId");
            elementHandle[4].focus();
            return false;
        }

        if (isEmpty(elementHandle[5].val())) {
            elementHandle[5].addClass("error");
            errorStatusHandle.text("Please enter Quantity");
            elementHandle[5].focus();
            return false;
        }

        if (isEmpty(elementHandle[6].val())) {
            elementHandle[6].addClass("error");
            errorStatusHandle.text("Please enter description");
            elementHandle[6].focus();
            return false;
        }

        if (isEmpty(elementHandle[8].val())) {
            elementHandle[8].addClass("error");
            errorStatusHandle.text("Please enter Feature");
            elementHandle[8].focus();
            return false;
        }

        if (!$.isNumeric(elementHandle[1].val())) {
            errorStatusHandle.text("Please enter numeric value only for cost");
            elementHandle[1].focus();
            return false;
        }

        if (!$.isNumeric(elementHandle[3].val())) {
            errorStatusHandle.text("Please enter numeric value only for retail");
            elementHandle[3].focus();
            return false;
        }
        if (!$.isNumeric(elementHandle[5].val())) {
            errorStatusHandle.text("Please enter numeric value only for quantity");
            elementHandle[5].focus();
            return false;
        }
        if (!isValidImage()) {
            elementHandle[7].focus();
            return false;
        }
        if ((elementHandle[1].val())<=0) {
            elementHandle[1].addClass("error");
            errorStatusHandle.text("Please enter cost greater than zero");
            elementHandle[1].focus();
            return false;
        }

        if ((elementHandle[3].val())< ((1.25)*(elementHandle[1].val()))) {
            elementHandle[3].addClass("error");
            errorStatusHandle.text("Please enter retail prize 25% more than cost prize");
            elementHandle[3].focus();
            return false;
        }

        if ((elementHandle[3].val())<=0) {
            elementHandle[3].addClass("error");
            errorStatusHandle.text("Please enter retail greater than zero");
            elementHandle[3].focus();
            return false;
        }

        if ((elementHandle[5].val())< 0) {
            elementHandle[5].addClass("error");
            errorStatusHandle.text("Please enter quantity greater than zero");
            elementHandle[5].focus();
            return false;
        }


        errorStatusHandle.text("");
        return true;
    }

    function isValidImage() {

        var files = $('input[name="product_image"]')[0].files;

        if (files.length == 0 || files[0].size == 0) {
            errorStatusHandle.text("Please upload product image");
            return false;

        } else {

            if (files[0].size / 3000 > 3000) {


                elementHandle[7].addClass("error");
                errorStatusHandle.text("File size should be with in 3MB ");
                return false;
            }

            elementHandle[7].removeClass("error");
            errorStatusHandle.text("");
            return true;
        }
    }


    elementHandle[9].on('blur', function () {

        if (isEmpty(elementHandle[9].val())) {
            elementHandle[9].addClass("error");
            errorStatusHandle.text("Please enter SKU");
            elementHandle[9].focus();
            return false;
        }

    });

    elementHandle[10].on('blur', function () {
        console.log("skucheck")

        if (isEmpty(elementHandle[10].val())) {
            elementHandle[10].addClass("error");
            errorStatusHandle.text("Please enter SKU");
            elementHandle[10].focus();
            return false;
        }

    });

    elementHandle[0].on('blur', function () {
        var cat = $("#categories");

        if (cat.val() == "0") {
            elementHandle[0].addClass("error");


            errorStatusHandle.text("Please select a category");
            return false;
        }
    });

    elementHandle[1].on('blur', function () {
        if (isEmpty(elementHandle[1].val())) {
            elementHandle[1].addClass("error");
            errorStatusHandle.text("Please enter Cost");
            elementHandle[1].focus();
            return false;
        }
        if (!$.isNumeric(elementHandle[1].val())) {
            errorStatusHandle.text("Please enter numeric value only for cost");
            elementHandle[1].focus();
            return false;
        }
        if ((elementHandle[1].val())<=0) {

            elementHandle[1].addClass("error");
            errorStatusHandle.text("Please enter cost greater than zero");
            elementHandle[1].focus();
            return false;
        }

    });
    elementHandle[2].on('blur', function () {
        var ven = $("#vendor");
        if (ven.val() == "0") {
            elementHandle[2].addClass("error");
            //If the "Please Select" option is selected display error.
            errorStatusHandle.text("Please select a vendor");
            return false;
        }
    });

    elementHandle[3].on('blur', function () {
        if (isEmpty(elementHandle[3].val())) {
            elementHandle[3].addClass("error");
            errorStatusHandle.text("Please enter retail price");
            elementHandle[3].focus();
            return false;
        }
        if (!$.isNumeric(elementHandle[3].val())) {
            errorStatusHandle.text("Please enter numeric value only for retail");
            elementHandle[3].focus();
            return false;
        }
        if ((elementHandle[3].val())< ((1.25)*(elementHandle[1].val()))) {

            elementHandle[3].addClass("error");
            errorStatusHandle.text("Please enter retail prize 25% more than cost prize");
            elementHandle[3].focus();
            return false;
        }

        if ((elementHandle[3].val())<=0) {

            elementHandle[3].addClass("error");
            errorStatusHandle.text("Please enter retail greater than zero");
            elementHandle[3].focus();
            return false;
        }
    });

    elementHandle[4].on('blur', function () {
        if (isEmpty(elementHandle[4].val())) {
            elementHandle[4].addClass("error");
            errorStatusHandle.text("Please enter ManufacturerId");
            elementHandle[4].focus();
            return false;
        }
    });

    elementHandle[5].on('blur', function () {
        if (isEmpty(elementHandle[5].val())) {
            elementHandle[5].addClass("error");
            errorStatusHandle.text("Please enter Quantity");
            elementHandle[5].focus();
            return false;
        }

        if (!$.isNumeric(elementHandle[5].val())) {
            errorStatusHandle.text("Please enter numeric value only for quantity");
            elementHandle[5].focus();
            return false;
        }
        if ((elementHandle[5].val())< 0) {

            elementHandle[5].addClass("error");
            errorStatusHandle.text("Please enter quantity greater than zero");
            elementHandle[5].focus();
            return false;
        }
    });
    elementHandle[6].on('blur', function () {
        if (isEmpty(elementHandle[6].val())) {
            elementHandle[6].addClass("error");
            errorStatusHandle.text("Please enter description");
            elementHandle[6].focus();
            return false;
        }
    });

    elementHandle[7].on('blur', function () {
        if (!isValidImage()) {
            elementHandle[7].focus();
            return false;
        }
    });

    elementHandle[8].on('blur', function () {
        if (isEmpty(elementHandle[8].val())) {

            elementHandle[8].addClass("error");
            errorStatusHandle.text("Please enter Feature");
            elementHandle[8].focus();
            return false;
        }
    });



    $('#skuForDel').on('blur', function() {

        var sku = $('#skuForDel').val()
        if(!sku) return
        if(isValidSKU(sku))
        {
            var url = "/perl/jadrn053/checkdup.cgi?sku=" + sku;
            $.get(url, process_reply_del);
            $('#messageD').text("");
        }
        else
        {
            $('#messageD').text("Please Enter a Valid SKU");
            $("#deleteInventorySubmit").prop('disabled', true);
            return
        }


        var url = "/perl/jadrn053/checkdup.cgi?sku="+sku;
        $.get(url, process_reply_del);
        var product_del_url = "/perl/jadrn053/fetch_string_del.cgi?skuForDel="+sku;

        $.get(product_del_url, handle_string_data_del);


    });

    /*$('#tabedit').on('click', function () {

        $("[name='skuE']").val('');
        $("[name='skuE']").focus();

   });*/
    $('#deltab').on('click', function () {

       $("[name='skuForDel']").val('');
       $("[name='skuForDel']").focus();

    });
    $('#newtab').on('click', function () {


        $("[name='sku']").focus();

    });



    /*$('#skuE').on('blur', function() {
        console.log("pr");
        var sku = $('#skuE').val()
        if(!sku) return
        var url = "/perl/jadrn053/checkdup.cgi?sku="+sku;
        $.get(url, process_reply_edit);
        var product_url = "/perl/jadrn053/fetch_string.cgi?skuE="+sku;
        console.log(product_url);
        $.get(product_url, handle_string_data_edit);

    });*/


    $('#product_image').change(function(){
        console.log("upload");
        if (isValidImage()) {
            errorStatusHandle.text("");
        }
        Imageshw(this);

    });

    $('#sku').on('focus', function() {
        $('#status').text("");
    });

    $('#button').on('click', function () {
        document.getElementById("pic").style.display = "none";
        $("#addInventorySubmit").prop('disabled', true);


    });

    $('#buttonDel').on('click', function () {

        $('#picD1').attr('src',"#");
        $("#skuForDel").prop('disabled', false);
        $("#deleteInventorySubmit").prop('disabled', true);


    });


    $("#product_image_del").change(function(){
        var input = this;
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {

                $('#picD1')
                    .attr('src', e.target.result);

            };
            imageName = input.files[0].name;
            console.log(imageName);
            reader.readAsDataURL(input.files[0]);
        }




    });

    $("#Add_inventory_form").submit(function (e) {

        e.preventDefault();

        if(isValidData())
        {
            errorStatusHandle.text("");
            var product_url = "/perl/jadrn053/Add_inventory_details.cgi";
            var data = new FormData(this);
            console.log("IN");


            $.ajax({
                url: product_url,
                type: 'POST',
                data: data,
                processData: false,
                contentType: 'multipart/form-data',

                success: function (response) {
                    console.log("INsa");
                    console.log(response);
                    if (response == "OK") {
                        console.log("INsb");
                        console.log(response);

                        $("#message").html('Product has been successfully added to the Database!')
                        document.getElementById("pic").style.display = "none";
                        $('#Add_inventory_form')[0].reset();
                        $("#addInventorySubmit").prop('disabled', true);



                    }
                },
                error: function () {
                    console.log("INsc");
                    console.log("Error");

                    $("#message").html('Something went wrong Please try again Later ')


                },
                statusCode: {
                    500: function () {
                        console.log("INsd");
                        console.log(response);
                        $("#message").html('Something went wrong Please try again Later ')

                    }
                }
            });
        }
        else
        {
            return;
            console.log("Mag")
        }
        setTimeout(clearState, 2000);


    });


    /*$("#edit_inventory_form").submit(function (e) {
        console.log("HI");
        e.preventDefault();
        var product_urll = "/perl/jadrn053/Edit_inventory_details.cgi";
        console.log(product_urll);
        var data = new FormData(this);
        console.log("IN");

        $.ajax({
            url: product_urll,
            type: 'POST',
            data: data,
            processData: false,
            contentType: 'multipart/form-data',

            success: function(response) {
                console.log("INsa");
                console.log(response);
                if (response == "OK") {
                    console.log("INsb");
                    console.log(response);

                    $("#messageE").html('Product was edited successfuly!');
                    $('#edit_inventory_form')[0].reset();
                    $('#picE1').attr('src',"#");

                }
            },
            error: function () {
                console.log("INsc");
                console.log("Error");

                $("#message").html('Error')

            },
            statusCode: {
                500: function() {
                    console.log("INsd");
                    console.log(response);
                    $("#messageE").html('ServerError')
                }
            }
        });
    });*/

    $("#delete_inventory_form").submit(function (e) {
        e.preventDefault();
        var product_url = "/perl/jadrn053/Delete_inventory.cgi";
        var data = new FormData(this);
        console.log("IN");
        data.append('skuForDel',skufordel.val());
        $.ajax({
            url: product_url,
            type: 'POST',
            data: data,
            processData: false,
            contentType: 'multipart/form-data',

            success: function(response) {
                console.log("INsa");
                console.log(response);
                if (response == "OK") {
                    console.log("INsb");
                    console.log("LEY");

                    $("#messageD").html('Product was deleted successfuly!')
                    $("#skuForDel").prop('disabled', false);
                    $('#delete_inventory_form')[0].reset();
                    $('#picD1').attr('src',"#");
                    $("#deleteInventorySubmit").prop('disabled', true);

                }
            },
            error: function () {
                console.log("INsc");
                console.log("Error");

                $("#messageD").html('Something went wrong Please try again Later ')

            },
            statusCode: {
                500: function() {
                    console.log("INsd");
                    console.log(response);
                    $("#messageD").html('Something went wrong Please try again Later ')
                }
            }
        });
    });

    function process_reply(response)
    {
        console.log("pr");
        console.log(response);
        $('#status').show();
        if (response == "OK")
        {
            $('#status').text("");
            $("#addInventorySubmit").prop('disabled', false);
        }
        else if(response == "AccessFailed")
            {
                window.location.replace("http://jadran.sdsu.edu/~jadrn053/proj1/ErrorPage.html");
            }
        else
            {
            $('#status').text("SKU already exsists please enter a new SKU to add Inventory");
            $("#addInventorySubmit").prop('disabled', true);
        }
        setTimeout(clearStatus, 2000);

    }
    function clearStatus() {
        $('#status').fadeOut(1000);

    }

    function clearState() {
        $('#message').fadeOut(1000);

    }

});




function process_reply_del(response){

    if(response == "OK") {
        $('#statusD').text("Please enter an exsisting SKU to delete");
        $("#deleteInventorySubmit").prop('disabled', true);
    }
    else if(response == "AccessFailed")
    {
        window.location.replace("http://jadran.sdsu.edu/~jadrn053/proj1/ErrorPage.html");
    }
    else
        {
            $('#statusD').text("");
            $("#skuForDel").prop('disabled', true);
            $("#deleteInventorySubmit").prop('disabled', false);
            $("#Deldescription").prop('disabled', true);
            $("#Delcategories").prop('disabled', true);
            $("#Delcost").prop('disabled', true);
            $("#Delvendor").prop('disabled', true);
            $("#Delretail").prop('disabled', true);
            $("#DelQuantity").prop('disabled', true);
            $("#Delfeatures").prop('disabled', true);
            $("#DelManufacturer").prop('disabled', true);
    }
}


function isEmpty(fieldValue) {
    return $.trim(fieldValue).length == 0;
}

function Imageshw(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        console.log("upload1");
        reader.onload = function (e) {
            $('#pic').css('display','block')
            console.log(e);
            console.log("upload10");

            $('#pic').attr('src', e.target.result);
        }
        console.log("upload2");
        reader.readAsDataURL(input.files[0]);
    }
}


function isValidSKU(sku)
{
    var pattern = new RegExp(/^[A-Z]{3}-\d{3}$/);
    return pattern.test(sku);
}



function handle_string_data_del(response) {
    $("#deleteInventorySubmit").prop('disabled', false);
    var records = new Array();
    var ManuIdentifier = "";
    var Description = "";
    records = response.split("||");
    console.log(records);
    var fields = new Array();
    console.log(fields);
    fields = records[0].split("|");
    console.log(fields);
    console.log(fields[3]);
    /* var answer = (fields[3]).toString();*/
    var catID = (fields[1]).toString();
    var venID = (fields[2]).toString();
    var vendorModel = (fields[3]).toString();
    var description = (fields[4]).toString();
    var features = (fields[5]).toString();
    var cost = (fields[6]).toString();
    var retail = (fields[7]).toString();
    var quantity = (fields[8]).toString();
    var filename = (fields[9]).toString();
    console.log(catID);
    /*$("#Manufacturer").val(answer);*/
    $("#Delfeatures").val(features);
    $("#Delcategories").val(catID);
    $("#Delcost").val(cost);
    $("#Delvendor").val(venID);
    $("#Delretail").val(retail);
    $("#DelManufacturer").val(vendorModel);
    $("#DelQuantity").val(quantity);
    $("#Deldescription").val(description);
    $("#Delfilename").val(filename);
   /* var fname = document.getElementById("product_image").value;*/
    var sku = document.getElementById("skuForDel").value;
    console.log(sku);
   /* console.log(fname);*/
    /*   var where = fname.lastIndexOf("\\");  // this is safer!*/
    /*fname = fname.substring(where+1);*/

    $('#statusD').html("Your file has been received.<br />");
    var toDisplay = "/~jadrn053/file_upload/_uploadDIR_/" + sku;
    $('#picD1').attr('src', toDisplay);
}






