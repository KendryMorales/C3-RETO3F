$(document).ready(function () {
    mostarRStatus();
    inicial();
    mostarRClient();
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


function mostarRClient() {
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
                // // $("#resultadoRClient").append("<td><a href= 'javascript:pintarRespuestaClientesReservaciones("+respuesta[i].client.reservations+");'>Ver reservaciones</a></td>");
                $("#resultadoRClient").append("<td>" + "<a href= 'javascript:pintarRespuestaClientesReservaciones('"+item[i].client.reservations+")>Ver reservaciones" +"</a>" + "</td>");


                $("#resultadoRClient").append("</tr>");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error");
        }
    });
}

function pintarRespuestaClientesReservaciones(respuesta){
    console.log(respuesta);
        let myTable="<table>";
        myTable+="<tr>";
          
        for(i=0;i<respuesta.length;i++){
        myTable+="<th>total</th>";
            myTable+="<td>"+respuesta[i].startDate+"</td>";
            
           
            myTable+="</tr>";
        }
        myTable+="</table>";
        $("#resultadoClientes").html(myTable);
    }


    function inicial() {
        $(".tabla-box").hide();  
        $(".tabla-box1").hide();  
    }
    
    function mostrarStatus() {
        $(".tabla-box").show(500);  
        $(".tabla-box1").hide();  

    }

    function mostrarCliente() {
        $(".tabla-box1").show(500);  
        $(".tabla-box").hide();     
    }