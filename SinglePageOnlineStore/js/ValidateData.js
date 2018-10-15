$(document).ready(function () {

    var errorStatusHandle = $('#message_line');
    var elementHandle = new Array(17);
    elementHandle[0] = $('[name="categories"]');
    elementHandle[1] = $('[name="cost"]');
    elementHandle[2] = $('[name="vendor"]');
    elementHandle[3] = $('[name="retail"]');
    elementHandle[4] = $('[name="ManufacturerId"]');
    elementHandle[5] = $('[name="Quantity"]');
    elementHandle[6] = $('[name="description"]');
    elementHandle[7] = $('[name="product_image"]');
    elementHandle[8] = $('[name="features"]');
   /* elementHandle[9] = $('[name="email"]');
    elementHandle[10] = $('[name="gender"]');
    elementHandle[11] = $('[name="month"]');
    elementHandle[12] = $('[name="day"]');
    elementHandle[13] = $('[name="year"]');
    elementHandle[14] = $('[name="experiencelevel"]');
    elementHandle[15] = $('[name="age"]');
    elementHandle[16] = $('[name="userpic"]');*!/*/

    function isValidData() {

        var cat = $("#categories");
        if (cat.val() == "0") {
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

        if ($.isNumeric(elementHandle[1].val())) {
            console.log("numeric")
            errorStatusHandle.text("Please enter numeric value only for cost");
            elementHandle[1].focus();
            return false;
        }

        if ($.isNumeric(elementHandle[3].val())) {
            errorStatusHandle.text("Please enter numeric value only for retail");
            elementHandle[3].focus();
            return false;
        }
        if ($.isNumeric(elementHandle[5].val())) {
            errorStatusHandle.text("Please enter numeric value only for quantity");
            elementHandle[5].focus();
            return false;
        }

        if (!validateDate()) {
            return false;
        }

        if (!isValidImage()) {
            elementHandle[16].focus();
            return false;
        }


        errorStatusHandle.text("");
        return true;
    }



});






/*if ($.isNumeric(elementHandle[5].val())) {
    errorStatusHandle.text("The city appears to be invalid.");
    elementHandle[5].focus();
    return false;
}

if (!isValidState(elementHandle[4].val())) {
    elementHandle[4].addClass("error");
    errorStatusHandle.text("State appears invalid,"+
        "Enter two letter state abbreviation");
    elementHandle[4].focus();
    return false;
}
if (isEmpty(elementHandle[5].val())) {
    elementHandle[5].addClass("error");
    errorStatusHandle.text("Please enter your zip code");
    elementHandle[5].focus();
    return false;
}
if (!$.isNumeric(elementHandle[5].val())) {
    elementHandle[5].addClass("error");
    errorStatusHandle.text("The zip code appears to be invalid, " +
        "numbers only please.");
    elementHandle[5].focus();
    return false;
}
if (elementHandle[5].val().length != 5) {
    elementHandle[5].addClass("error");
    errorStatusHandle.text("The zip code must have exactly five digits")
    elementHandle[5].focus();
    return false;
}
if (isEmpty(elementHandle[6].val())) {
    elementHandle[6].addClass("error");
    errorStatusHandle.text("Please enter your area code");
    elementHandle[6].focus();
    return false;
}
if (!$.isNumeric(elementHandle[6].val())) {
    elementHandle[6].addClass("error");
    errorStatusHandle.text("The area code appears to be invalid, " +
        "numbers only please.");
    elementHandle[6].focus();
    return false;
}
if (elementHandle[6].val().length != 3) {
    elementHandle[6].addClass("error");
    errorStatusHandle.text("The area code must have exactly three digits")
    elementHandle[6].focus();
    return false;
}
if (isEmpty(elementHandle[7].val())) {
    elementHandle[7].addClass("error");
    errorStatusHandle.text("Please enter your phone number prefix");
    elementHandle[7].focus();
    return false;
}
if (!$.isNumeric(elementHandle[7].val())) {
    elementHandle[7].addClass("error");
    errorStatusHandle.text("The phone number prefix is invalid, " +
        "numbers only please. ");
    elementHandle[7].focus();
    return false;
}
if (elementHandle[7].val().length != 3) {
    elementHandle[7].addClass("error");
    errorStatusHandle.text("The phone number prefix must have exactly three digits")
    elementHandle[7].focus();
    return false;
}
if (isEmpty(elementHandle[8].val())) {
    elementHandle[8].addClass("error");
    errorStatusHandle.text("Please enter your phone number");
    elementHandle[8].focus();
    return false;
}
if (!$.isNumeric(elementHandle[8].val())) {
    elementHandle[8].addClass("error");
    errorStatusHandle.text("The phone number appears to be invalid, " +
        "numbers only please. ");
    elementHandle[8].focus();
    return false;
}
if (elementHandle[8].val().length != 4) {
    elementHandle[8].addClass("error");
    errorStatusHandle.text("The phone number must have exactly four digits")
    elementHandle[8].focus();
    return false;
}
if (isEmpty(elementHandle[9].val())) {
    elementHandle[9].addClass("error");
    errorStatusHandle.text("Please enter your email address");
    elementHandle[9].focus();
    return false;
}
if (!isValidEmail(elementHandle[9].val())) {
    elementHandle[9].addClass("error");
    errorStatusHandle.text("The email address appears to be invalid,");
    elementHandle[9].focus();
    return false;
}
if (isEmpty(elementHandle[10].val()) || !isValidGender()) {
    elementHandle[10].addClass("error");
    errorStatusHandle.text("Please enter your gender");
    elementHandle[10].focus();
    return false;
}

if (isEmpty(elementHandle[11].val())) {
    elementHandle[11].addClass("error");
    errorStatusHandle.text("Please enter month");
    elementHandle[11].focus();
    return false;
}
if (elementHandle[11].val().length != 2) {
    elementHandle[11].addClass("error");
    errorStatusHandle.text("The Month value should have exactly two numbers")
    elementHandle[11].focus();
    return false;
}

if (!$.isNumeric(elementHandle[11].val())) {
    elementHandle[11].addClass("error");
    errorStatusHandle.text("The month appears to be invalid, " +
        "numbers only please. ");
    elementHandle[11].focus();
    return false;
}
if (isEmpty(elementHandle[12].val())) {
    elementHandle[12].addClass("error");
    errorStatusHandle.text("Please enter day");
    elementHandle[12].focus();
    return false;
}
if (!$.isNumeric(elementHandle[12].val())) {
    elementHandle[12].addClass("error");
    errorStatusHandle.text("The day appears to be invalid, " +
        "numbers only please. ");
    elementHandle[12].focus();
    return false;
}
if (elementHandle[12].val().length != 2) {
    elementHandle[12].addClass("error");
    errorStatusHandle.text("The day must have exactly two digits")
    elementHandle[12].focus();
    return false;
}
if (isEmpty(elementHandle[13].val())) {
    elementHandle[13].addClass("error");
    errorStatusHandle.text("Please enter year");
    elementHandle[13].focus();
    return false;
}
if (!$.isNumeric(elementHandle[13].val())) {

    elementHandle[13].addClass("error");
    errorStatusHandle.text("The year appears to be invalid, " +
        "numbers only please. ");
    elementHandle[13].focus();
    return false;
}
if (elementHandle[13].val().length != 4) {

    errorStatusHandle.text("The year must have exactly four digits")
    elementHandle[13].focus();
    return false;

}*/

       /* if (isEmpty(elementHandle[14].val()) || !isValidExperience()) {
            elementHandle[14].focus();
            return false;
        }
        if (isEmpty(elementHandle[15].val()) || !isValidCategory()) {
            elementHandle[15].focus();
            return false;
        }
        if (!isValidImage()) {
            elementHandle[16].focus();
            return false;
        }*/


















    function isEmpty(fieldValue) {
        return $.trim(fieldValue).length == 0;
    }