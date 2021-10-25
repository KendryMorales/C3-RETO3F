$(document).ready(function () {
    traerCategory();
    inicial();
});


function traerCategory(){
    $.ajax({
        url: "http://132.226.44.0:8080/api/Category/all",
        type: "GET",
        datatype: "JSON",
        success:function(respuesta){
            console.log(respuesta);
            mostarCategory(respuesta);
        }
    });
}


function mostarCategory(respuesta){
    $.ajax({
        dataType: 'json',
        url: "http://132.226.44.0:8080/api/Category/all",
        type:'GET',        
        success:function(respuesta) {
            let item=respuesta;
            for(i=0;i<item.length;i++){
                $("#resultadoCategory").append("<tr>");
                $("#resultadoCategory").append("<td>"+item[i].name+"</td>");
                $("#resultadoCategory").append("<td>"+item[i].description+"</td>");
                $("#resultadoCategory").append('<td><a class="btnO" onclick="obtenerCategoryEspecifica('+item[i].id+')">Editar</a></td>');
                $("#resultadoCategory").append('<td><button class="btnB" title="Borrar" onclick="borrarCategory('+item[i].id+')">&#10007</button></td>');
                $("#resultadoCategory").append("</tr>");
            }
        },        
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error");
        }
    });
}


function guardarCategory(){
    let myData={
        name:$("#name").val(),
        description:$("#description").val()
    };
    $.ajax({
        url: "http://132.226.44.0:8080/api/Category/save",
        type:"POST",
        contentType: "application/json; charset=utf-8",
        datatype:"JSON",
        data:JSON.stringify(myData),
        success:function(respuesta){
                $("#resultadoCategory").empty();
                $("#name").val("");
                $("#description").val("");
                traerCategory();
                alert("¡Se ha registrado la informacion!");   
                inicial();    
        },        
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("Ha ocurrido un error");
        }
    });
}


function editarCategory(){     
    let myData={
        id:$("#id").val(),
        name:$("#name").val(),     
        description:$("#description").val(),         
    };     
    console.log(myData);     
    $.ajax({         
        url: "http://132.226.44.0:8080/api/Category/update",
        type:"PUT",         
        datatype:"JSON",
        contentType: "application/json; charset=utf-8",
        data:JSON.stringify(myData),        
        success:function(respuesta){
            if( $("#id").val() =="" && 
                $("#name").val() =="" &&           
                $("#description").val()=="" ){
                alert("Los campos no puede estar vacios");
            }else{
                $("#resultadoCategory").empty();
                $("#id").val("");             
                $("#name").val("");             
                $("#description").val("");             
                traerCategory();
                alert("¡Se ha actualizado el registro!");
                inicial();    
            }            
        },        
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error");
        }
    }); 
}

function borrarCategory(id){
    $.ajax({
        url: "http://132.226.44.0:8080/api/Category/"+id,
        type:"DELETE",
        datatype:"JSON",
        contentType: "application/json; charset=utf-8",        
        // data:dataToSend,
        success:function(respuesta){
            $("#resultadoCategory").empty();
            traerCategory(); 
            alert("¡Se ha borrado el registro!");
        },        
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error");
        }  
    });
}

function obtenerCategoryEspecifica(id){
    mostrar();
    $("#guardar").hide();
    $("#actualizar").show(500);


    $.ajax({
        type:'GET',
        dataType: 'json',
        url: "http://132.226.44.0:8080/api/Category/"+id,
        success:function(respuesta) {
            console.log(respuesta);
            let item=respuesta;
            $("#id").val(item.id);
            $("#name").val(item.name);
            $("#description").val(item.description);
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
}

function mostrar(){
    $(".form").show(500);
    $("#guardar").show(500);
    $(".tabla-box").hide();
    $("#actualizar").hide();
    
    $("#name").val(""),
    $("#description").val("")
}