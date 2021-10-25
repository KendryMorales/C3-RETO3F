$(document).ready(function () {
    traerReserva();
    llenarCabin();
    llenarCliente();
    inicial();
    // format:'YY-MM-DD HH:mm:ss'       
});


function traerReserva(){
    $.ajax({
        url: "http://132.226.44.0:8080/api/Reservation/all",
        type: "GET",
        datatype: "JSON",
        success:function(respuesta){
            console.log(respuesta);
            mostarReserva(respuesta);
        }
    });
}


function mostarReserva(){
    $.ajax({
        dataType: 'json',
        url: "http://132.226.44.0:8080/api/Reservation/all",
        type:'GET',        
        success:function(respuesta) {
            let item=respuesta;
            for(i=0;i<item.length;i++){
                $("#resultadoReserva").append("<tr>");
                $("#resultadoReserva").append("<td>"+item[i].idReservation+"</td>");
                $("#resultadoReserva").append("<td>"+FormatoFecha(item[i].startDate)+"</td>");
                $("#resultadoReserva").append("<td>"+FormatoFecha(item[i].devolutionDate)+"</td>");
                $("#resultadoReserva").append("<td>"+item[i].cabin.name+"</td>");
                $("#resultadoReserva").append("<td>"+item[i].client.idClient+"</td>");
                $("#resultadoReserva").append("<td>"+item[i].client.name+"</td>");
                $("#resultadoReserva").append("<td>"+item[i].client.email+"</td>");
                $("#resultadoReserva").append("<td>"+item[i].score+"</td>");
                $("#resultadoReserva").append('<td><a class="btnO" onclick="obtenerReservaEspecifica('+item[i].idReservation+')">Editar</a></td>');
                $("#resultadoReserva").append('<td><button class="btnB" title="Borrar" onclick="borrarReserva('+item[i].idReservation+')">&#10007</button></td>');
                $("#resultadoReserva").append("</tr>");
            }
        },        
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error");
        }
    });
}

// value = new Date(parseInt(value.replace("/Date(", "").replace(")/",""), 10));

function guardarReserva(){
    let myData={
        startDate:$("#inicio").val(),
        devolutionDate:$("#devolucion").val(),
        cabin: {id:+$("#idcabin_reserva").val()},
        client:{idClient:+$("#idclient_reserva").val()},
    };
    console.log(myData)
    $.ajax({
        url: "http://132.226.44.0:8080/api/Reservation/save",
        type:"POST",
        datatype:"JSON",
        contentType: "application/json; charset=utf-8",
        data:JSON.stringify(myData),
        success:function(respuesta){
            $("#resultadoReserva").empty();
            $("#inicio").val("");
            $("#devolucion").val("");
            $("#idcabin_reserva").val("");
            $("#idclient_reserva").val("");
                traerReserva();
                alert("¡Se ha registrado la informacion!");   
                inicial();    
        },        
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error");
        }
    });
}

function editarReserva(){     
    let myData={         
        idReservation:$("#id").val(),         
        startDate:$("#inicio").val(),         
        devolutionDate:$("#devolucion").val(),         
        cabin: {id:+$("#idcabin_reserva").val()},
        client:{idClient:+$("#idclient_reserva").val()},        
    };     
    console.log(myData);     
    let dataToSend=JSON.stringify(myData);     
    $.ajax({         
        url: "http://132.226.44.0:8080/api/Reservation/update",
        type:"PUT",         
        data:dataToSend,         
        contentType: "application/json; charset=utf-8",
        datatype:"JSON",         
        success:function(respuesta){
            if($("#id").val() =="" && 
                $("#inicio").val() == "" &&            
                $("#devolucion").val() =="" &&           
                $("#idcabin_reserva").val() =="" &&            
                $("#idclient_reserva").val()=="" ){
                alert("Los campos no puede estar vacios");
            }else{
                $("#resultadoReserva").empty();
                $("#id").val("");             
                $("#inicio").val("");             
                $("#devolucion").val("");             
                $("#idcabin_reserva").val("");             
                $("#idclient_reserva").val("");             
                traerReserva();
                alert("¡Se ha actualizado el registro!");
                inicial();    
                $("#id").removeAttr('disabled'); 
            }            
        },        
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error");
        }
    }); 
}

function borrarReserva(idReservation){
    $.ajax({
        type:"DELETE",
        // data:JSON.stringify(myData),
        contentType:"application/JSON",
        datatype:"JSON",
        url: "http://132.226.44.0:8080/api/Reservation/"+idReservation,
        success:function(respuesta){
            $("#resultadoReserva").empty();
            traerReserva(); 
            alert("¡Se ha borrado el registro!");
        },        
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error");
        }  
    });
}

function obtenerReservaEspecifica(idReservation){
    $("#id").attr('disabled','disabled');
    mostrar();
    $("#guardar").hide();
    $("#actualizar").show(500);
    $.ajax({
        dataType: 'json',
        url: "http://132.226.44.0:8080/api/Reservation/"+idReservation,
        type:'GET',
        success:function(respuesta) {
            console.log(respuesta);
            let item=respuesta;
            $("#id").val(item.idReservation);
            $("#inicio").val(item.startDate);
            $("#devolucion").val(item.devolutionDate);
            $("#idcabin_reserva").val(item.cabin.id);
            $("#idclient_reserva").val(item.client.idClient);
        },        
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error");
        }
    });
}

function inicial(){
    $(".form").hide();
    $("#id").hide();
    $(".tabla-box").show(500);
    $("#id").removeAttr('disabled'); 
}

function mostrar(){
    $(".form").show(500);
    $("#guardar").show(500);
    $(".tabla-box").hide();
    $("#actualizar").hide();
    
    $("#id").val(""),
    $("#inicio").val(""),
    $("#devolucion").val(""),
    $("#idclient_reserva").val(""),
    $("#idcabin_reserva").val("")
}

function llenarCliente() {
    console.log("se esta ejecutando")
    $.ajax({
        url: "http://132.226.44.0:8080/api/Client/all", 
        type: "GET", 
        datatype: "JSON", 
        success: function (respuesta) {
            console.log(respuesta); 
            let $select = $("#idclient_reserva"); 
            $.each(respuesta, function (idClient, name, email) {
                $select.append('<option value=' + name.idClient + '>' + name.name +'</option>');
                console.log("select " + name.idClient);
            });
        }
    })
}


function llenarCabin() {
    console.log("se esta ejecutando")
    $.ajax({
        url: "http://132.226.44.0:8080/api/Cabin/all", 
        type: "GET", 
        datatype: "JSON", 
        success: function (respuesta) {
            console.log(respuesta); 
            let $select = $("#idcabin_reserva"); 
            $.each(respuesta, function (id, name) {
                $select.append('<option value=' + name.id + '>' + name.name +'</option>');
                console.log("select " + name.id);
            });
        }
    })
}


function FormatoFecha(fechaInicio){
    var vFecha = new Date(fechaInicio);

    var vdia= vFecha.getDate(); 
    var vmes= vFecha.getMonth()+1; 
    var vanio= vFecha.getFullYear(); 

    // vdia = vdia<10? "0"+vdia: vdia;
    // vmes = vmes<10 ? "0"+vmes: vmes;
    return vdia+"/"+vmes+"/"+vanio;
}

// let date = new Date()

// let day = date.getDate()
// let month = date.getMonth() + 1
// let year = date.getFullYear()

// if(month < 10){
//   console.log(`${day}-0${month}-${year}`)
// }else{
//   console.log(`${day}-${month}-${year}`)
// }


// <script>
//   var myDate = new Date();
//   var thisMonth = new Date(myDate.getFullYear(), myDate.getMonth(), 1);
//   var nextMonth = new Date(myDate.getFullYear(), myDate.getMonth() + 2, 0);

//   console.log("Formatted date start: " + formatDate(thisMonth));
//   console.log("Formatted date end: " + formatDate(nextMonth));

//   function padLeft(n){
//     return ("00" + n).slice(-2);
//   }

//   function formatDate(){        
//     var d = new Date,
//         dformat = [ padLeft(d.getDate()),
//                     padLeft(d.getMonth()+1),
//                     d.getFullYear()
//                     ].join(' ');
//      return dformat
//   }

// </script>