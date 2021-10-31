$(document).ready(function () {
    mostarRStatus();
    inicial();
    mostarTopCliente();
});


function mostarRStatus() {
    $.ajax({
        url: "http://132.226.44.0:8080/api/Reservation/report-status",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            $("#resultadoStatus").append("<tr>");
            $("#resultadoStatus").append("<td>" + respuesta.completed + "</td>");
            $("#resultadoStatus").append("<td>" + respuesta.cancelled + "</td>");
            $("#resultadoStatus").append("</tr>");

        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error");
        }
    });
}


function mostarTopCliente() {
    $.ajax({
        dataType: 'json',
        url: "http://132.226.44.0:8080/api/Reservation/report-clients",
        type: 'GET',
        success: function (respuesta) {
            let item = respuesta;
            for (i = 0; i < item.length; i++) {
                $("#resultadoRClient").append("<tr>");
                $("#resultadoRClient").append("<td>" + item[i].total + "</td>");
                $("#resultadoRClient").append("<td>" + item[i].client.name + "</td>");
                $("#resultadoRClient").append("<td>" + item[i].client.email + "</td>");
                $("#resultadoRClient").append("<td>" + item[i].client.age + "</td>");
                $("#resultadoRClient").append("</tr>");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error");
        }
    });
}

function mostrarReporteDate() {
    var fechaInicio = document.getElementById("inicio").value;
    var fechaCierre = document.getElementById("fin").value;


    console.log(fechaInicio);
    console.log(fechaCierre);

    $.ajax({
        url: "http://132.226.44.0:8080/api/Reservation/report-dates/" + fechaInicio + "/" + fechaCierre,
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            let item = respuesta;
            for (i = 0; i < item.length; i++) {
                $("#resultadoRDate").append("<tr>");
                $("#resultadoRDate").append("<td>" + FormatoFecha(item[i].startDate) + "</td>");
                $("#resultadoRDate").append("<td>" + FormatoFecha(item[i].devolutionDate) + "</td>");
                $("#resultadoRDate").append("<td>" + item[i].status + "</td>");
                $("#resultadoRDate").append("</tr>");

            }
        }
    });
}

function inicial() {
    $(".tabla-box").hide();
    $(".tabla-box1").hide();
    $(".tabla-box2").hide();
}

function mostrarStatus() {
    $(".tabla-box").show(500);
    $(".tabla-box1").hide();
    $(".tabla-box2").hide();

}

function mostrarCliente() {
    $(".tabla-box1").show(500);
    $(".tabla-box").hide();
    $(".tabla-box2").hide();
}

function mostrarDate() {
    $(".tabla-box2").show(500);
    $(".tabla-box").hide();
    $(".tabla-box1").hide();
}

function FormatoFecha(fechaInicio) {
    var vFecha = new Date(fechaInicio);

    var vdia = vFecha.getDate();
    var vmes = vFecha.getMonth() + 1;
    var vanio = vFecha.getFullYear();

    // vdia = vdia<10? "0"+vdia: vdia;
    // vmes = vmes<10 ? "0"+vmes: vmes;

    vdia = ('0' + vdia).slice(-2);
    vmes = ('0' + vmes).slice(-2);

    return vanio + "/" + vmes + "/" + vdia;
}