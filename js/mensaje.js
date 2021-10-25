$(document).ready(function () {
    traerMessage();
    inicial();    
    llenarCliente();
    llenarCabin();
});

function traerMessage(){
    $.ajax({
        url: "http://132.226.44.0:8080/api/Message/all",
        type: "GET",
        datatype: "JSON",
        success:function(respuesta){
            console.log(respuesta);
            mostrarMessage(respuesta)
        }
    });
}

function mostrarMessage(){
    $.ajax({
        dataType: 'json',
        url: "http://132.226.44.0:8080/api/Message/all",
        type:'GET',
        
        success:function(respuesta) {
            let item=respuesta;
            for(i=0;i<item.length;i++){
                $("#resultadoMessage").append("<tr>");
                $("#resultadoMessage").append("<td>"+item[i].client.name+"</td>");
                $("#resultadoMessage").append("<td>"+item[i].cabin.name+"</td>");
                $("#resultadoMessage").append("<td>"+item[i].messageText+"</td>");
                $("#resultadoMessage").append('<td><a class="btnO" onclick="obtenerMessageEspecifico('+item[i].idMessage+')">Editar</a></td>');
                $("#resultadoMessage").append('<td><button class="btnB" title="Borrar"onclick="borrarMessage('+item[i].idMessage+')">&#10007</button></td>');
                $("#resultadoMessage").append("</tr>");
            }
        },        
        error: function(jqXHR, textStatus, errorThrown) {
        }
    });
}

function guardarMessage(){
    let myData={
        client: {idClient:+$("#client_message").val()},
        cabin:{id:+$("#cabin_message").val()},
        messageText:$("#text_message").val(),
    };
    $.ajax({
        type:"POST",
        url: "http://132.226.44.0:8080/api/Message/save",
        datatype:"JSON",
        contentType: "application/json; charset=utf-8",
        data:JSON.stringify(myData),
        success:function(respuesta){
            $("#resultadoMessage").empty();
            $("#client_message").val("");
            $("#cabin_message").val("");
            $("#text_message").val("");
            traerMessage();
            alert("¡Se ha registrado la informacion!");
            inicial();    
        },        
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error");
        }
    });
}

function editarMessage(){     
    let myData={         
        idMessage:$("#id_message").val(),
        client:{idClient:+$("#client_message").val()},
        cabin:{id:+$("#cabin_message").val()},
        messageText:$("#text_message").val(),
    };     
    console.log(myData);     
    let dataToSend=JSON.stringify(myData);     
    $.ajax({         
        url: "http://132.226.44.0:8080/api/Message/update",
        type:"PUT",         
        datatype:"JSON",         
        contentType: "application/json; charset=utf-8",
        data:dataToSend,         
        success:function(respuesta){  
            if($("#id_message").val() =="" && 
            $("#client_message").val() =="" && 
            $("#cabin_message").val() =="" && 
            $("#text_message").val() == ""){
            alert("Los campos no puede estar vacios");
        }else{              
            $("#resultadoMessage").empty();
            $("#id_message").val("");
            $("#client_message").val("");
            $("#cabin_message").val("");            
            $("#text_message").val("");
            traerMessage();          
            alert("¡Se ha actualizado el registro!");
            inicial();    
        }       
        },        
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error");
        }   
    }); 
}

function borrarMessage(idMessage){
    $.ajax({
        type:"DELETE",
        contentType: "application/json; charset=utf-8",
        datatype:"JSON",
        url: "http://132.226.44.0:8080/api/Message/"+idMessage,
        // data:JSON.stringify(myData),
        success:function(respuesta){
            $("#resultadoMessage").empty();
            traerMessage(); 
            alert("¡Se ha borrado el registro!")
        },        
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error");
        }
    });
}

function obtenerMessageEspecifico(idMessage){
    mostrar();
    $("#guardar").hide();
    $("#actualizar").show(500);


    $.ajax({
        dataType:'json',
        url: "http://132.226.44.0:8080/api/Message/"+idMessage,
        type:'GET',
        success:function(response) {
            console.log(response);
            let item=response;
            $("#id_message").val(item.idMessage);
            $("#client_message").val(item.client.idClient);
            $("#cabin_message").val(item.cabin.id);
            $("#text_message").val(item.messageText);
        },        
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error");
        }
    });
}

function inicial(){
    $(".form").hide();
    $("#id_message").hide();
    $(".tabla-box").show(500);
}

function mostrar(){
    $(".form").show(500);
    $("#guardar").show(500);
    $(".tabla-box").hide();
    $("#actualizar").hide();
    
    $("#id_message").val(""),
    $("#text_message").val("");
    $(".radio").prop("checked", false);
}

function llenarCliente() {
    console.log("se esta ejecutando")
    $.ajax({
        url: "http://132.226.44.0:8080/api/Client/all", 
        type: "GET", 
        datatype: "JSON", 
        success: function (respuesta) {
            console.log(respuesta); 
            let $select = $("#client_message"); 
            $.each(respuesta, function (idClient, name) {
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
            let $select = $("#cabin_message"); 
            $.each(respuesta, function (id, name) {
                $select.append('<option value=' + name.id + '>' + name.name +'</option>');
                console.log("select " + name.id);
            });
        }
    })
}