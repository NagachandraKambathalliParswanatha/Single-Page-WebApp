// Kambathalli parswanatha Nagachandra
// Account: jadrn053
// CS645, Spring 2018
// Project #1
$(document).ready(function() {
    var skuforedit = $("#skuE");
    $('#tabedit').on('click', function () {

        $("[name='skuE']").val('');
        $("[name='skuE']").focus();

    });
    $('#skuE').on('blur', function () {

        $('#messageE').show();
        var sku = $('#skuE').val()
        if (!sku) return
        if(isValidSKU(sku))
        {
            var url = "/perl/jadrn053/checkdup.cgi?sku=" + sku;
            $.get(url, process_reply_edit);
            $('#messageE').text("");
        }
        else
        {
            $('#messageE').text("Please enter a valid SKU number");
            $("#editInventorySubmit").prop('disabled', true);
            return
        }
        var product_url = "/perl/jadrn053/fetch_string.cgi?skuE=" + sku;

        $.get(product_url, handle_string_data_edit);

    });

    $("#editInventorySubmit").prop('disabled', true);

    var errorStatusHandle = $('#messageE');
    var elementHandle = new Array(11);
    elementHandle[0] = $('[name="Editcategories"]');
    elementHandle[1] = $('[name="Editcost"]');
    elementHandle[2] = $('[name="Editvendor"]');
    elementHandle[3] = $('[name="Editretail"]');
    elementHandle[4] = $('[name="EditManufacturer"]');
    elementHandle[5] = $('[name="EditQuantity"]');
    elementHandle[6] = $('[name="Editdescription"]');
    elementHandle[7] = $('[name="product_image_edit"]');
    elementHandle[8] = $('[name="Editfeatures"]');
    elementHandle[9] = $('[name="skuE"]');

    function isValidData() {



        var cate = $("#Editcategories");

        if (cate.val() == "0") {
            elementHandle[0].addClass("error");

            //If the "Please Select" option is selected display error.
            errorStatusHandle.text("Please select a category");
            return false;
        }

        if (isEmpty(elementHandle[1].val())) {
            elementHandle[1].addClass("error");
            errorStatusHandle.text("Please enter Cost");
            elementHandle[1].focus();
            return false;
        }
        var ven = $("#Editvendor");
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
       /* if (!isValidImage()) {
            elementHandle[7].focus();
            return false;
        }*/
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



    elementHandle[9].on('blur', function () {


        if (isEmpty(elementHandle[9].val())) {
            elementHandle[9].addClass("error");
            errorStatusHandle.text("Please enter SKU");
            elementHandle[9].focus();
            return false;
        }

    });

    elementHandle[0].on('blur', function ()
    {

        var cate = $("#Editcategories");

        if (cate.val() == "0") {
            elementHandle[0].addClass("error");

            //If the "Please Select" option is selected display error.
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
    elementHandle[2].on('blur', function ()
    {
        var ven = $("#Editvendor");
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

    elementHandle[8].on('blur', function () {
        if (isEmpty(elementHandle[8].val())) {

            elementHandle[8].addClass("error");
            errorStatusHandle.text("Please enter Feature");
            elementHandle[8].focus();
            return false;
        }
    });



    $('#buttonEdit').on('click', function () {

        $('#picE1').attr('src', "#");
        /* $('#picE1').css('display','none');*/
        $("#skuE").prop('disabled', false);
        $("#editInventorySubmit").prop('disabled', true);

    });
    $("#product_image_edit").change(function () {
        var input = this;
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {


                $('#picE1')
                    .attr('src', e.target.result);
                /* var toDisplay = "<img alt=\"Image\" width=\"150px\" height=\"150px\" src=  e.target.result />";
                 $('#picE1').html(toDisplay);*/
            };
            imageName = input.files[0].name;

            reader.readAsDataURL(input.files[0]);
        }
    });

    $("#edit_inventory_form").submit(function (e) {

        e.preventDefault();
        if(isValidData())
        {
            errorStatusHandle.text("");
            var product_urll = "/perl/jadrn053/Edit_inventory_details.cgi";

            var data = new FormData(this);

            data.append('skuE',skuforedit.val());
            $.ajax({
                url: product_urll,
                type: 'POST',
                data: data,
                processData: false,
                contentType: 'multipart/form-data',

                success: function (response) {

                    console.log(response);

                    if (response == "OK") {


                        $("#messageE").html('Product was edited successfuly!');
                        $('#edit_inventory_form')[0].reset();
                        $('#picE1').attr('src', "#");
                        $("#skuE").prop('disabled', false);
                        $("#editInventorySubmit").prop('disabled', true);

                    }
                },
                error: function () {


                    $("#messageE").html('Something went wrong Please try again Later ')

                },
                statusCode: {
                    500: function () {

                        $("#messageE").html('Something went wrong Please try again Later ')
                    }
                }
            });
        }
        else
        {
            return;

        }
    });





});

function isEmpty(fieldValue) {
    return $.trim(fieldValue).length == 0;
}

function isValidSKU(sku) {
    var pattern = new RegExp(/^[A-Z]{3}-\d{3}$/);
    return pattern.test(sku);
}

function process_reply_edit(response)
{

    if (response == "OK")
    {

        $('#statusE').text("Please Enter a exsisting Inventory to edit");
        $("#editInventorySubmit").prop('disabled', true);

    }
    else if(response == "AccessFailed")
    {
        window.location.replace("http://jadran.sdsu.edu/~jadrn053/proj1/ErrorPage.html");
    }
    else
    {

        $('#statusE').text("");
        $("#skuE").prop('disabled', true);
        $("#editInventorySubmit").prop('disabled', false);
    }

}

function handle_string_data_edit(response) {

    $("#editInventorySubmit").prop('disabled', false);
    var records = new Array();
    var ManuIdentifier = "";
    var Description = "";
    records = response.split("||");
    console.log(response);
    var fields = new Array();

    fields = records[0].split("|");

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

    /*$("#Manufacturer").val(answer);*/
    $("#Editfeatures").val(features);
    $("#Editcategories").val(catID);
    $("#Editcost").val(cost);
    $("#Editvendor").val(venID);
    $("#Editretail").val(retail);
    $("#EditManufacturer").val(vendorModel);
    $("#EditQuantity").val(quantity);
    $("#Editdescription").val(description);
    $("#Editfilename").val(filename);

    var toDisplay = "/~jadrn053/file_upload/_uploadDIR_/" + filename + '?' + new Date().getTime();

    /*$('#statusE').html("Your file has been received.<br />");*/

    $('#picE1').attr('src', toDisplay);
    /*  console.log($('#picE1').*/
    /*html(toDisplay));*/


}


