
// insert new row with editable cells
var rowCounter = 1
function insertRowFunction() {
    var table = document.getElementById("myTable");
    var insert = 1;
    var rowId = "row" + rowCounter++;
    for (var i = 0; i < insert; i++) {
        var row = table.insertRow(2);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        var cell9 = row.insertCell(8);
        row.setAttribute("class", "hello");
        row.setAttribute("id", rowId);
        cell1.innerHTML = "<button class='rowBtn'>insert</button>";
        cell2.innerHTML = '<input type="text" class="plantName" name="plantName" />';
        cell3.innerHTML = '<input type="number" class="pQty" name="pQty" min="0" max="999" >';
        cell4.innerHTML = '<input type="text" id="sowDate" name="datepicker_sow" class="datepicker_sow" />';
        cell5.innerHTML = '<input type="text" id="harvestDate1" name="datepicker_harvest" class="datepicker_harvest" />';
        cell6.innerHTML = '<input type="text" class="pVol" name="pVol" />';
        cell7.innerHTML = '<input type="text" class="pPrice" name="pPrice" />';
        cell8.innerHTML = '<div class="total" name="total">0.00</div>';
        cell9.innerHTML = "<div><input class='deleteBtn' type='button' value='Remove'></div>";
    }
    refreshFunction();
    $("#" + rowId + ' input').change(refreshFunction);
    $("#" + rowId + ' .deleteBtn').click(removeFunction);
    $("#" + rowId + ' .rowBtn').click(insertRowFunction);
}

//remove row on harvest table and calling recalculate function
function removeFunction() {
    $(this).closest('tr').remove();
    multiplyFunction();
    addFunction();
}
;

// sum of the quantities
function addFunction() {
    var sumValue = 0;
   // console.log('sumValue', sumValue);
    $('tr.hello').each(function () {
        var qty = parseInt($(this).find('input.pQty', this).val(), 10);
       // console.log('qty', qty)
        if (!isNaN(qty)) {
            sumValue = ((sumValue + qty));
        }

       // console.log("sumValue, Qty", sumValue, qty);
    });
    $("tfoot td.sumQty").text(sumValue);
}

// multiply price*harvested volume in KG 
function multiplyFunction(){
        var multiValue = parseFloat(0);
        var addVolValue = parseFloat(0);
        //console.log(multiValue);
        //calculate each row
        $("tr.hello").each(function(){
            // var number = parseFloat($(this).find('div.pVol', this).text(),10);
            // var price = parseFloat($(this).find('div.pPrice', this).text(),10);
             var number = parseFloat($(this).find('input.pVol', this).val(),10);
             var price = parseFloat($(this).find('input.pPrice', this).val(),10);
             var sumVolume = $("tfoot td.sumVol");
            //console.log(number, price);
            var ptotal = ((number*1) * (price*1)|| 0) // multiply value formula plus converting nan to zero
            var priceTot = ptotal.toFixed(2)
            //console.log(number,price,priceTot);
            $(".total",this).text((priceTot));
            //console.log(number,price,ptotal, multiValue);
            multiValue= (multiValue + ptotal);
            if (!isNaN(number)){
                addVolValue = addVolValue + number;
            }
           // console.log("multivalue,ptotal",multiValue, ptotal);
            });
            //$("tfoot td.sumAmt").text(multiValue);
            var sumAmtDec = multiValue.toFixed(2);
            $("tfoot td.sumAmt").text(sumAmtDec);
            var sumVolume = addVolValue.toFixed(2);
            $("tfoot td.sumVol").text((sumVolume)||0);
    }


//datepicker in inputfield
function dateFunction() {
    var sowDate = $("input.datepicker_sow").datepicker({
        minDate: "-2w",
        //dateFormat:"dd-mm-yy",
        dateFormat: "yy-mm-dd",
        onClose: function (dateSelected) {
            harvestDate.datepicker("option", "minDate", dateSelected);
        }
    });
    var harvestDate = $("input.datepicker_harvest").datepicker({
        //dateFormat:"dd-mm-yy",
        dateFormat: "yy-mm-dd",
        onClose: function (dateSelected) {
            sowDate.datepicker("option", "maxDate", dateSelected);
        }
    });
}
;


function refreshFunction() {
    multiplyFunction();
    addFunction();
    dateFunction();
}

//clear field in tables
function clearAllFunction() {
    $('#myTable input[type="text"]').val("");
    $('#myTable input[type="number"]').val("");
    $('#myTable .sumAmt, .sumQty, .sumVol, .total').text("");
    $('.datadisplay #hiddentable').html('');
    refreshFunction()
}


//click save button to save the table
function saveDiary() {
    var diaryname = window.prompt("Enter diary name", ""); // pop up to ask user to give the name of the diary
   // console.log(diaryname);
    var dataObj = {"data": []};
    $("#myTable tr.hello").each(function () {
        var obj = {"name": $(this).find('input.plantName').val(),
            "quantity": $(this).find('input.pQty').val(),
            "sow_date": $(this).find('input.datepicker_sow').val(),
            "harvest_date": $(this).find('input.datepicker_harvest').val(),
            "harvest_volume": $(this).find('input.pVol').val(),
            "price": $(this).find('input.pPrice').val(),
            "total_amt": $(this).find('.total').text(),
            "diary_name": diaryname};

        dataObj["data"].push(obj);
       // console.log(dataObj["data"][0]);
        //console.log(result);
    });

   // console.log(JSON.stringify(dataObj));
    var request = $.ajax({
        url: "postdiary.php",
        method: "POST",
        data: dataObj,
        dataType: "JSON",
        complete: function (data) {
            //console.log(data);
        }

    });

}


$(document).ready(function () {
    $('#myTable input').change(refreshFunction);
    $('.deleteBtn').click(removeFunction);
    $('.rowBtn').click(insertRowFunction);
    $('#clearAllBtn').click(clearAllFunction);

    //connect to database
    $('#saveBtn').click(saveDiary);

    //retrieve info from database
    //$('#myRecord').click(getDiary);
    $('#myRecord').click(showDiaryName);
});

// to show the diary name in the dialogbox
function showDiaryName() {
    var postbox = $('#dialogbox').dialog({
        position: {
            my: 'left',
            at: 'top',
            of: $('h2')
        }
    }).parents(".ui-dialog").css("opacity", "0.8");
    //console.log("Coco");
    $('#dialogbox').empty();
    $.ajax({
        method: 'GET',
        data: 'data',
        url: 'getdiaryname.php',
        //success: function(data){console.log(data)},
    }).done(function (data) {
       // console.log(data);
        var text = '';
        if (typeof (data) == "object" && data.length > 0) {
            //if(data.length >0){
            for (i = 0; i < data.length; i++) {
                var saveddiaryname = data[i].diary_name;
                //alert(diaryname);
                text +=
                        '<form class="imageform" method="get" action= "getdiary.php">'

                        + '<p><input type="button" id="' + saveddiaryname + '" name="saveddiaryname" value="' + data[i].diary_name + '" onClick="clickthis(this.id)"></p></form>';

            }
           // console.log(text);
            if (text != "") {
                $("#dialogbox").append(text).css({"font-size": "1.6em", "cursor": "pointer"});  //append the saved diaryname from the user in dialogbox

            }
        } else {
            $('#dialogbox').html("no record");
        }
    });
}

//get the name of diary and pass database to get the plants lists
function clickthis(click_id) {
    $('#dialogbox').dialog('close');
    //alert(click_id);
    $('.datadisplay #hiddentable .recordtable td').remove();
    //console.log(click_id);

    $.ajax({
        method: "GET",
        data: {id2: click_id},
        url: 'getdiary.php',
    }).done(function (data) {
        //console.log(click_id);
        //console.log(data);
        var str = '';
        //display json data into str in html
        if (typeof (data) == "object" && data.length > 0) {
            for (i = 0; i < data.length; i++) {
                var rowId = data[i].id;
                str +=
                        '<tr class="recordtable">'
                        + '<td><div name="plantName2" id="plantName-' + rowId + '" contenteditable="true">' + data[i].name + '</div></td>'
                        + '<td><div name="pQty2" contenteditable="true" id="pQty-' + rowId + '">' + data[i].quantity + '</div></td>'
                        + '<td><div name="datepicker_sow2" contenteditable="true" id="datepicker_sow-' + rowId + '">' + data[i].sow_date + '</div></td>'
                        + '<td><div name="datepicker_harvest2" contenteditable="true" id="datepicker_harvest-' + rowId + '">' + data[i].harvest_date + '</div></td>'
                        + '<td><div name="pVol2" contenteditable="true" id="pVol-' + rowId + '">' + data[i].harvest_volume + '</div></td>'
                        + '<td><div name="pPrice2" contenteditable="true" id="pPrice-' + rowId + '">' + data[i].price + '</div></td>'
                        + '<td><div name="total2" contenteditable="true" id="total-' + rowId + '">' + data[i].total_amt + '</div></td>'
                        + '<td class="hidden" id="diary_name"><div name="diary_name2">' + data[i].diary_name + '</div></td>'
                        + '<td class="hidden" id="id2"><div name="id2- ' + rowId + ' ">' + data[i].id + '</div></td>'
                        + '<td><button type="button" value="' + rowId + '" class="recordsavebtn">Update</td>'
                        + '</tr>';
               // console.log(rowId, data[i].name);
            }
            if (str != "") {
                $(".datadisplay #hiddentable").append(str).removeClass("hidden");
                $('#selectedRecord').removeClass("hidden").css({'color': 'forestgreen', 'font-size': '1.6em', 'font-weight': 'bold'});
                $('.recordsavebtn').click(updateDiary);
            }
        }
    });
}
;


function updateDiary(ev) {
    var rowId = $(this).val();
    var info = $('#updateMsg');
    //console.log("button value = " + btnclick);
    ev.preventDefault();
    //var diaryn = $('#diary_name').text();
   // console.log($("div#plantName-" + rowId).text());
    //var dataObj = {"data":[]};

    var dataObj = {
        'plantName2': $("div#plantName-" + rowId).text(),
        'pQty2': $("div#pQty-" + rowId).text(),
        'datepicker_sow2': $("div#datepicker_sow-" + rowId).text(),
        'datepicker_harvest2': $("div#datepicker_harvest-" + rowId).text(),
        'pVol2': $("div#pVol-" + rowId).text(),
        'pPrice2': $("div#pPrice-" + rowId).text(),
        'total2': $("div#total-" + rowId).text(),
        'id2': rowId
    };
    //console.log(JSON.stringify(dataObj));
    $.ajax({
        method: "POST",
        data: dataObj,
        url: 'updatediaryrecord.php',
    }).done(function (data) {
       // console.log(data);
        if (data.success == true) {
            //if (data!=''){
            $('#updateMsg').html("Your record is updated successfully!").css({'color': 'red', 'font-size':'1.6em'}).slideDown();
        } else {
            $('#updateMsg').html('Your record is updated successfully!').css({'color': 'green', 'font-size':'1.6em'}).slideDown();
        }
    }
    );
}
;
