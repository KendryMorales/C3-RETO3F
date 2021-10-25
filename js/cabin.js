$(document).ready(function () {
    traerCabin();
    inicial();
    llenarCombo();
});


function traerCabin() {
    $.ajax({
        url: "http://132.226.44.0:8080/api/Cabin/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            mostarCabin(respuesta);
        }
    });
}


function mostarCabin() {
    $.ajax({
        dataType: 'json',
        url: "http://132.226.44.0:8080/api/Cabin/all",
        type: 'GET',
        success: function (respuesta) {
            let item = respuesta;
            for (i = 0; i < item.length; i++) {
                $("#resultado").append("<tr>");
                $("#resultado").append("<td>" + item[i].brand + "</td>");
                $("#resultado").append("<td>" + item[i].rooms + "</td>");
                $("#resultado").append("<td>" + item[i].category.name + "</td>");
                $("#resultado").append("<td>" + item[i].name + "</td>");
                $("#resultado").append("<td>" + item[i].description + "</td>");
                $("#resultado").append('<td><a class="btnO" onclick="obtenerCabinEspecifica(' + item[i].id + ')">Editar</a></td>');
                $("#resultado").append('<td><button class="btnB" title="Borrar" onclick="borrarCabin(' + item[i].id + ')">&#10007</button></td>');
                $("#resultado").append("</tr>");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error");
        }
    });
}


function guardarCabin() {
    let myData = {
        brand: $("#brand").val(),
        rooms: $("#rooms").val(),
        category: {id:+$("#idcategoria").val()},
        name: $("#name").val(),
        description: $("#description").val()
    };
    console.log(myData)
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        datatype: "JSON",
        data: JSON.stringify(myData),
        url: "http://132.226.44.0:8080/api/Cabin/save",
        success: function (respuesta) {
            $("#resultado").empty();
            $("#brand").val("");
            $("#rooms").val("");
            $("#idcategoria").val("");
            $("#name").val("");
            $("#description").val("");
            traerCabin();
            alert("¡Se ha registrado la informacion!");
            inicial();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error");
        }
    });
}

function editarCabin() {
    let myData = {
        id: $("#id").val(),
        brand: $("#brand").val(),
        rooms: $("#rooms").val(),
        category: {id:+$("#idcategoria").val()},
        name: $("#name").val(),
        description: $("#description").val(),
    };
    console.log(myData);
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://132.226.44.0:8080/api/Cabin/update",
        type: "PUT",
        datatype: "JSON",
        contentType: "application/json; charset=utf-8",
        data: dataToSend,
        success: function (respuesta) {
            if ($("#id").val() == "" &&
                $("#brand").val() == "" &&
                $("#rooms").val() == "" &&
                $("#idcategoria").val() == "" &&
                $("#name").val() == "" &&
                $("#description").val() == "") {
                alert("Los campos no puede estar vacios");
            } else {
                $("#resultado").empty();
                $("#id").val("");
                $("#brand").val("");
                $("#rooms").val("");
                $("#idcategoria").val("");
                $("#name").val("");
                $("#description").val("");
                $("#id").removeAttr('disabled');
                alert("¡Se ha actualizado el registro!");
                inicial();
                traerCabin();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error");
        }
    });
}

function borrarCabin(id) {
    $.ajax({
        type: "DELETE",
        contentType: "application/json; charset=utf-8",
        datatype: "JSON",
        url: "http://132.226.44.0:8080/api/Cabin/" + id,
        success: function (respuesta) {
            $("#resultado").empty();
            traerCabin();
            alert("¡Se ha borrado el registro!");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error");
        }
    });
}

function obtenerCabinEspecifica(id) {
    mostrar();
    $("#guardar").hide();
    $("#actualizar").show(500);

    $.ajax({
        dataType: 'json',
        url: "http://132.226.44.0:8080/api/Cabin/" + id,
        type: 'GET',
        success: function (respuesta) {
            console.log(respuesta);
            let item = respuesta;
            $("#id").val(item.id);
            $("#brand").val(item.brand);
            $("#rooms").val(item.rooms);
            $("#idcategoria").val(item.category.id);
            $("#name").val(item.name);
            $("#description").val(item.description);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error");
        }
    });
}

function inicial() {
    $(".form").hide();
    $(".tabla-box").show(500);
    $("#id").hide();
}

function mostrar() {
    $(".form").show(500);
    $("#guardar").show(500);
    $(".tabla-box").hide();
    $("#actualizar").hide();

    // $("#id").val(""),
        $("#brand").val(""),
        $("#rooms").val(""),
        $("#category_id").val(""),
        $("#name").val("")
    $("#description").val("")
}

function llenarCombo() {
    console.log("se esta ejecutando")
    $.ajax({
        url: "http://132.226.44.0:8080/api/Category/all", 
        type: "GET", 
        datatype: "JSON", 
        success: function (respuesta) {
            console.log(respuesta); 
            let $select = $("#idcategoria"); 
            $.each(respuesta, function (id, name) {
                $select.append('<option value=' + name.id + '>' + name.name + '</option>');
                console.log("select " + name.id);
            });
        }
    })
}