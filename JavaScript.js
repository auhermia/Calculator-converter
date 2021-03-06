﻿$(document).ready(function () {

    /* ================================================ *
    *                   CALCULATOR			            *
    * ================================================= */
    var value1 = "";
    var value2 = "";
    var operator = "";
    var result = 0;
    var calcFirst = true;
    
    var topDisplay = $("#topdisplay");
    topDisplay.text('');

    var bottomDisplay = $("#bottomdisplay");
    bottomDisplay.text('0');

    // retrieves text of num key entered and display on display
    $('.num').click(function () {
        value1 += $(this).text();
        bottomDisplay.text(value1);
        if (operator == '') {
            calcFirst = true;
            topDisplay.text('');
        }
        // allow only 1 instance of decimal
        let decimal = true;
        if ($(this).text() == '.') { decimal = false; }
    });

    $('#signop').click(function () {
        value1 = value1 * -1;
        bottomDisplay.text(value1);
    });

    // square root
    $('#sqrt').click(function () {
        if (calcFirst == false) {
            value1 = result;
        }
        value1n = parseFloat(value1);
        result = Math.sqrt(value1n);
        topDisplay.text($(this).text() + value1);
        bottomDisplay.text(result);
        value1 = "";
    });
    
    // + - * / ^
    $(".operator").not('#equal,#signop,#sqrt').click(function () {
        operator = $(this).text();
        if (calcFirst == false) {
            value1 = result;
        }
        topDisplay.text(value1 + " " + operator);
        bottomDisplay.text("");
        value2 = value1;
        value1 = "";
    });

    $("#equal").click(function () {

        // check values for incorrect syntax -!!!!!!!!!!!

        function findLength(val) {
            var valLength = "";
            if (val != Math.floor(val)) {
                valLength = val.toString().split('.')[1].length;
                return valLength;
                console.log(typeof valLength);
            }
            else
                valLength = "0";
            return parseFloat(valLength);
        }
        var length1 = findLength(value1);
        var length2 = findLength(value2);

        valLength = (length1 > length2) ? length1 : length2;

        topDisplay.text(value2 + " " + operator + " " + value1);

        result = operate(value2, value1, operator);

        bottomDisplay.text(result);

        value1 = "";
        value2 = "";
        operator = "";
        calcFirst = false;
    });

    function operate(a, b, operation) {
        a = parseFloat(a);
        b = parseFloat(b);
        if (operation === '+') { return a + b };
        if (operation === '-') { return a - b };
        if (operation === '×') { return a * b };
        if (operation === '÷') { return a / b };
        if (operation === '^') return Math.pow(a, b);
    }

    // Clear
    $('#clear').click(function () {
        value1 = "";
        value2 = "";
        bottomDisplay.text('0');
        topDisplay.empty();
        calcFirst = true;
    });

    // keypress... can't do +/- (-1 - 1 no bueno) or esc
    $(document).keypress(function (e) {
        var key = event.which;
        if      (key === 48) { $("#0").click(); }
        else if (key === 49) { $("#1").click(); }
        else if (key === 50) { $("#2").click(); }
        else if (key === 51) { $("#3").click(); }
        else if (key === 52) { $("#4").click(); }
        else if (key === 53) { $("#5").click(); }
        else if (key === 54) { $("#6").click(); }
        else if (key === 55) { $("#7").click(); }
        else if (key === 56) { $("#8").click(); }
        else if (key === 57) { $("#9").click(); }
        else if (key === 42) { $("#multiply").click(); }
        else if (key === 43) { $("#plus").click(); }     //fix
        else if (key === 45) { $("#minus").click(); }
        else if (key === 46) { $("#decimal").click(); }
        else if (key === 47) { $("#divide").click(); }
        else if (key === 94) { $("#expo").click(); }
        else if (key === 27) { $("#clear").click(); } // fix
        else if (key === 61 || key === 13) { $("#equal").click(); } // return fix
        else { return false; }
    });

    /* ================================================ *
    *                   UNIT CONVERSION		            *
    * ================================================= */

    
    // define mapping
    var area = [
        { 'Id': 'm2',  'Property': [1.0, 'Square meter (m^2)'] },
        { 'Id': 'cm2', 'Property': [10000, 'Square centimeter (cm^2)'] },
        { 'Id': 'km2', 'Property': [0.000001, 'Square kilometer (km^2)'] },
        { 'Id': 'in2', 'Property': [1550, 'Square inch (in^2)'] },
        { 'Id': 'ft2', 'Property': [10.7639, 'Square foot (ft^2)'] },
        { 'Id': 'mi2', 'Property': [3.861e-7, 'Square mile (mi^2)'] },
        { 'Id': 'acre', 'Property': [0.000247105, 'Acre (acre)'] }
    ];
    var length = [
        { 'Id': 'm' , 'Property': [1.0, 'Meter (m)'] },
        { 'Id': 'cm', 'Property': [100, 'Centimeter (cm)'] },
        { 'Id': 'km', 'Property': [.001, 'Kilometer (km)'] },
        { 'Id': 'in', 'Property': [39.36996, 'Inch (in)'] },
        { 'Id': 'ft', 'Property': [3.28084, 'Foot (ft)'] },
        { 'Id': 'yd', 'Property': [1.09361, 'Yard (yd)'] },
        { 'Id': 'mi', 'Property': [0.000621371, 'Mile (mi)'] }
    ];
    var mass = [
        { 'Id': 'kg', 'Property': [1.0, 'Kilogram (kg)'] },
        { 'Id': 'g',  'Property': [1000, 'Gram (g)'] },
        { 'Id': 'oz', 'Property': [35.274, 'Ounce (oz)'] },
        { 'Id': 'lb', 'Property': [2.20462, 'Pound (lb)'] },
        { 'Id': 't' , 'Property': [0.00110231, 'Ton (t)'] }
    ];
    var time = [
        { 'Id': 'd', 'Property': [1.0, 'Day (d)'] },
        { 'Id': 'h', 'Property': [24, 'Hour (h)'] },
        { 'Id': 'min', 'Property': [1440, 'Minute (min)'] },
        { 'Id': 'sec', 'Property': [86400, 'Second (sec)'] },
        { 'Id': 'w', 'Property': [0.142857, 'Week (w)'] },
        { 'Id': 'm', 'Property': [0.0328767, 'Month (m)'] },
        { 'Id': 'yr', 'Property': [0.00273973, 'Year (yr)'] }
    ];
    var volume = [
        { 'Id': 'l', 'Property': [1.0, 'Liter (L)'] },
        { 'Id': 'mL', 'Property': [1000, 'Milliliter (mL)'] },
        { 'Id': 'gal', 'Property': [0.264172, 'Gallon (gal)'] }
    ];
    // need to fix calculation
    var temperature = [
        { 'Id': 'f', 'Property': [1.0, 'Farenheit (F)'] },
        { 'Id': 'c', 'Property': [1.0, 'Celcius (C)'] }
    ];
       

    // when user switches conversion type
    function appendOption(convert_type) {
        $.each(convert_type, function (i, item) {
            $("#fromUnit, #toUnit").append("<option value='" + item.Id + "'>" + item.Property[1] + "</option>");
        });
    }

    var type = $('#type');

    type.on('change', function () {
        $('#fromUnit, #toUnit').html('');
        $('#from, #to').val('');
        
        if (type.val() == "Mass") {
            appendOption(mass);
        } else if (type.val() == "Temperature") {
            appendOption(temperature);
        } else if (type.val() == "Time") {
            appendOption(time);
        } else if (type.val() == "Volume") {
            appendOption(volume);
        } else if (type.val() == "Area") {
            appendOption(area);
        } else {
            appendOption(length);
        }
    });

    // allow only numeric in input
    $("#from").keypress(function (e) {
        if (e.which != 8 && e.which != 46 && (e.which < 48 || e.which > 57)){
            return false;
        }
    });


    // Conversions
    // ex: yd to in: yd to base, base to in
    //               yd to base = inverse of base to yd


    $('#convert_equal').click(function () {
        var fromUnit = document.getElementById("fromUnit").value;
        var toUnit = document.getElementById("toUnit").value; 

        var fromValue = parseFloat(document.getElementById("from").value);
        var toValue = 0;

        // length
        if ($('#type').val() == "Length") {
            var fromCoeff = length.filter(function (unit) {
                return unit.Id == fromUnit;
            }).map(function (unit) {
                return unit.Property[0];
            });

            var toCoeff = length.filter(function (unit) {
                return unit.Id == toUnit;
            }).map(function (unit) {
                return unit.Property[0];
            });
            toValue = fromValue * (1 / fromCoeff) * toCoeff;
        }
        // area
        else if ($('#type').val() == "Area") {
            var fromCoeff = area.filter(function (unit) {
                return unit.Id == fromUnit;
            }).map(function (unit) {
                return unit.Property[0];
            });

            var toCoeff = area.filter(function (unit) {
                return unit.Id == toUnit;
            }).map(function (unit) {
                return unit.Property[0];
            });
            toValue = fromValue * (1 / fromCoeff) * toCoeff;
        }
        // mass
        else if ($('#type').val() == "Mass") {
            var fromCoeff = mass.filter(function (unit) {
                return unit.Id == fromUnit;
            }).map(function (unit) {
                return unit.Property[0];
            });

            var toCoeff = mass.filter(function (unit) {
                return unit.Id == toUnit;
            }).map(function (unit) {
                return unit.Property[0];
            });
            toValue = fromValue * (1 / fromCoeff) * toCoeff;
        }
        // time
        else if ($('#type').val() == "Time") {
            var fromCoeff = time.filter(function (unit) {
                return unit.Id == fromUnit;
            }).map(function (unit) {
                return unit.Property[0];
            });

            var toCoeff = time.filter(function (unit) {
                return unit.Id == toUnit;
            }).map(function (unit) {
                return unit.Property[0];
            });            
            // need to fix rounding for units
            toValue = (fromValue * (1 / fromCoeff) * toCoeff).toFixed(1);
        }
        // volume
        else if ($('#type').val() == "Volume") {
            var fromCoeff = volume.filter(function (unit) {
                return unit.Id == fromUnit;
            }).map(function (unit) {
                return unit.Property[0];
            });

            var toCoeff = volume.filter(function (unit) {
                return unit.Id == toUnit;
            }).map(function (unit) {
                return unit.Property[0];
            });
            toValue = fromValue * (1 / fromCoeff) * toCoeff;
        }
        // temp
        else {
            if (toUnit == 'f' && fromUnit == 'c') { toValue = (fromValue * 9 / 5) + 32; }
            else if (toUnit == 'c' && fromUnit == 'f') { toValue = (fromValue - 32) * 5 / 9; }
            else { toValue = fromValue; }
            console.log(fromUnit);
            console.log(fromValue);
            console.log(toUnit);
            console.log(toValue);
            toValue = toValue.toFixed(1);
        }
        $('#to').val(toValue);
    });

    /* ================ MAIN NAVIGATION ================ */

    var calculator = $('#calculator');
    var converter = $('#converter');
    var calcbutton = $('#calcbutton');
    var convertbutton = $('#convertbutton');

    calculator.show();
    converter.hide();

    calcbutton.click(function () {
        calculator.show();
        converter.hide();
    });
    convertbutton.click(function () {
        calculator.hide();
        converter.show();
        appendOption(length);
    });

}); // end of script


/*
// to do 1/8/17


// loading up json file
window.onload = function () {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        // readystate 4 -- request is complete
        if (xhr.readyState == 4 && http.status == 200) {
            console.log(JSON.parse(xhr.response));
            console.log("test");
        }
    };
    xhr.open('GET', 'mapping.json', true); //async for now
    xhr.send(); // tell xhr to go get data;
    console.log(xhr);
};

*/