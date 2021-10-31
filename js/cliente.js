$(document).ready(function () {
    traerClient();
    inicial();
});


function traerClient(){
    $.ajax({
        url: "http://localhost:8080/api/Client/all",
        type: "GET",
        datatype: "JSON",
        success:function(respuesta){
            console.log(respuesta);
            mostrarClient(respuesta)
        }
    });
}

function mostrarClient(){
    $.ajax({
        dataType: 'json',
        url: "http://localhost:8080/api/Client/all",
        type:'GET',
        
        success:function(respuesta) {
            let item=respuesta;

            for(i=0;i<item.length;i++){
                $("#resultadoClient").append("<tr>");
                $("#resultadoClient").append("<td>"+item[i].name+"</td>");
                $("#resultadoClient").append("<td>"+item[i].email+"</td>");
                $("#resultadoClient").append("<td>"+item[i].age+"</td>");
                $("#resultadoClient").append('<td><a class="btnO" onclick="obtenerClientEspecifico('+item[i].idClient+')">Editar</a></td>');
                $("#resultadoClient").append('<td><button class="btnB"  title="Borrar" onclick="borrarClient('+item[i].idClient+')">&#10007</button></td>');
                $("#resultadoClient").append("</tr>");
            }
        },        
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error");
        }
    });
}

function guardarClient(){
    let myData={
        email:$("#email_client").val(),
        password:$("#pass_client").val(),
        name:$("#name_client").val(),
        age:$("#age_client").val(),
    };
    $.ajax({
        type:"POST",
        contentType: "application/json; charset=utf-8",
        datatype:"JSON",
        url: "http://localhost:8080/api/Client/save",
        data:JSON.stringify(myData),
        success:function(respuesta){
            $("#resultadoClient").empty();
            $("#name_client").val("");
            $("#email_client").val("");
            $("#pass_client").val("");
            $("#age_client").val("");
            traerClient();
            alert("¡Se ha registrado la informacion!");
            inicial();    
        },        
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error");
        }    
    });
}

function editarClient(){     
    let myData={         
        idClient:$("#id_client").val(),
        name:$("#name_client").val(),
        email:$("#email_client").val(),
        password:$("#pass_client").val(),
        age:$("#age_client").val(),    
    };     
    console.log(myData);     
    let dataToSend=JSON.stringify(myData);     
    $.ajax({         
        type:"PUT",         
        contentType: "application/json; charset=utf-8",
        datatype:"JSON",         
        data:dataToSend,         
        url: "http://localhost:8080/api/Client/update",
        success:function(respuesta){
            if($("#id_client").val() =="" && 
                $("#name_client").val() == "" &&            
                $("#email_client").val() =="" &&           
                $("#pass_client").val() =="" &&           
                $("#age_client").val()=="" ){
                alert("Los campos no puede estar vacios");
            }else{             
                $("#resultadoClient").empty();
                $("#id_client").val("");
                $("#name_client").val("");
                $("#email_client").val("");
                $("#pass_client").val("");
                $("#age_client").val("");
                traerClient();          
                alert("¡Se ha actualizado el registro!");
                inicial();    
                $("#id_client").removeAttr('disabled'); 
            }         
        },        
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error");
        }   
    }); 
}

function borrarClient(idClient){
    // let dataToSend=JSON.stringify(myData);
    $.ajax({
        type:"DELETE",
        contentType:"application/JSON",
        datatype:"JSON",
        url: "http://localhost:8080/api/Client/"+idClient,
        // data:dataToSend,
        success:function(respuesta){
            $("#resultadoClient").empty();
            traerClient(); 
            alert("¡Se ha borrado el registro!")
        },        
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error");
        }
    });
}

function obtenerClientEspecifico(idClient){
    $("#id_client").attr('disabled','disabled');
    mostrar();
    $("#guardar").hide();
    $("#actualizar").show(500);


    $.ajax({
        dataType: 'json',
        url: "http://localhost:8080/api/Client/"+idClient,
        type:'GET',
        success:function(response) {
            console.log(response);
            let item=response;
            $("#id_client").val(item.idClient);
            $("#email_client").val(item.email);
            $("#pass_client").val(item.password);
            $("#name_client").val(item.name);
            $("#age_client").val(item.age);
        },        
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error");
        }
    });
}

function inicial(){
    $(".form").hide();
    $("#id_client").hide();
    $(".tabla-box").show(500);
    $("#id_client").removeAttr('disabled'); 
}

function mostrar(){
    $(".form").show(500);
    $("#guardar").show(500);
    $(".tabla-box").hide();
    $("#actualizar").hide();
    
    $("#id_client").val(""),
    $("#name_client").val(""),
    $("#email_client").val(""),
    $("#pass_client").val(""),
    $("#age_client").val("")
}

