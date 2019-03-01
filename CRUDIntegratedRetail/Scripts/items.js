/// <reference path="jquery-1.9.1.intellisense.js" />
//Load Data in Table when documents is ready
$(document).ready(function () {
    loadData();
});

//Load Data function
function loadData() {
    $.ajax({
        url: "/Home/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.ItemsId + '</td>';
                html += '<td>' + item.Name + '</td>';
                html += '<td>' + item.Price + '</td>';
                html += '<td>' + item.Qty + '</td>';
                html += '<td>' + item.TotalPrice + '</td>';
                html += '<td><a href="#" onclick="return getbyID(' + item.ItemsId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.ItemsId + ')">Delete</a></td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Add Data Function 
function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var empObj = {
        ItemsId: $('#ItemsId').val(),
        Name: $('#Name').val(),
        Price: $('#Price').val(),
        Qty: $('#Qty').val(),
        TotalPrice: $('#TotalPrice').val()
    };
    $.ajax({
        url: "/Home/Add",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Function for getting the Data Based upon Employee ID
function getbyID(ItemsId) {
    $('#Name').css('border-color', 'lightgrey');
    $('#Price').css('border-color', 'lightgrey');
    $('#Qty').css('border-color', 'lightgrey');
    $('#TotalPrice').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Home/getbyID/" + ItemsId,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#ItemsId').val(result.ItemsId);
            $('#Name').val(result.Name);
            $('#Price').val(result.Price);
            $('#Qty').val(result.Qty);
            $('#TotalPrice').val(result.TotalPrice);

            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

//function for updating employee's record
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var empObj = {
        ItemsId: $('#ItemsId').val(),
        Name: $('#Name').val(),
        Price: $('#Price').val(),
        Qty: $('#Qty').val(),
        TotalPrice: $('#TotalPrice').val(),
    };
    $.ajax({
        url: "/Home/Update",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#ItemsId').val("");
            $('#Name').val("");
            $('#Price').val("");
            $('#Qty').val("");
            $('#TotalPrice').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//function for deleting employee's record
function Delele(ID) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/Home/Delete/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

//Function for clearing the textboxes
function clearTextBox() {
    $('#ItemsId').val("");
    $('#Name').val("");
    $('#Price').val("");
    $('#Qty').val("");
    $('#TotalPrice').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#Name').css('border-color', 'lightgrey');
    $('#Price').css('border-color', 'lightgrey');
    $('#Qty').css('border-color', 'lightgrey');
    $('#TotalPrice').css('border-color', 'lightgrey');
}
//Valdidation using jquery
function validate() {
    var isValid = true;
    if ($('#Name').val().trim() == "") {
        $('#Name').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Name').css('border-color', 'lightgrey');
    }
    if ($('#Price').val().trim() == "") {
        $('#Price').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Price').css('border-color', 'lightgrey');
    }
    if ($('#Qty').val().trim() == "") {
        $('#Qty').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Qty').css('border-color', 'lightgrey');
    }
    if ($('#TotalPrice').val().trim() == "") {
        $('#TotalPrice').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#TotalPrice').css('border-color', 'lightgrey');
    }
    return isValid;
}