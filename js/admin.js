$(document).ready(function () {
    traerAdmin();
    inicial();
});
// 132.226.44.0

function traerAdmin(){
    $.ajax({
        url: "http://132.226.44.0:8080/api/Admin/all",
        type: "GET",
        datatype: "JSON",
        success:function(respuesta){
            console.log(respuesta);
            mostrarAdmin(respuesta)
        }
    });
}

function mostrarAdmin(){
    $.ajax({
        dataType: 'json',
        url: "http://132.226.44.0:8080/api/Admin/all",
        type:'GET',
        
        success:function(respuesta) {
            let item=respuesta;

            for(i=0;i<item.length;i++){
                $("#resultado").append("<tr>");
                $("#resultado").append("<td>"+item[i].name+"</td>");
                $("#resultado").append("<td>"+item[i].email+"</td>");
                $("#resultado").append('<td><a class="btnO" onclick="obtenerAdminEspecifico('+item[i].idAdmin+')">Editar</a></td>');
                $("#resultado").append('<td><button class="btnB"  title="Borrar" onclick="borrarAdmin('+item[i].idAdmin+')">&#10007</button></td>');
                $("#resultado").append("</tr>");
            }
        },        
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error");
        }
    });
}

function guardarAdmin(){
    let myData={
        email:$("#email_Admin").val(),
        password:$("#pass_Admin").val(),
        name:$("#name_Admin").val(),
    };
    $.ajax({
        type:"POST",
        contentType: "application/json; charset=utf-8",
        datatype:"JSON",
        url: "http://132.226.44.0:8080/api/Admin/save",
        data:JSON.stringify(myData),
        success:function(respuesta){
            $("#resultado").empty();
            $("#name_Admin").val("");
            $("#email_Admin").val("");
            $("#pass_Admin").val("");
            traerAdmin();
            alert("¡Se ha registrado la informacion!");
            inicial();    
        },        
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error");
        }    
    });
}

function editarAdmin(){     
    let myData={         
        idAdmin:$("#id_Admin").val(),
        name:$("#name_Admin").val(),
        email:$("#email_Admin").val(),
        password:$("#pass_Admin").val(),
    };     
    console.log(myData);     
    let dataToSend=JSON.stringify(myData);     
    $.ajax({         
        type:"PUT",         
        contentType: "application/json; charset=utf-8",
        datatype:"JSON",         
        data:dataToSend,         
        url: "http://132.226.44.0:8080/api/Admin/update",
        success:function(respuesta){
            if($("#id_Admin").val() =="" && 
                $("#name_Admin").val() == "" &&            
                $("#email_Admin").val() =="" &&           
                $("#pass_Admin").val() ==""){
                alert("Los campos no puede estar vacios");
            }else{             
                $("#resultado").empty();
                $("#id_Admin").val("");
                $("#name_Admin").val("");
                $("#email_Admin").val("");
                $("#pass_Admin").val("");
                traerAdmin();          
                alert("¡Se ha actualizado el registro!");
                inicial();    
                $("#id_Admin").removeAttr('disabled'); 
            }         
        },        
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error");
        }   
    }); 
}

function borrarAdmin(idAdmin){
    // let dataToSend=JSON.stringify(myData);
    $.ajax({
        type:"DELETE",
        contentType:"application/JSON",
        datatype:"JSON",
        url: "http://132.226.44.0:8080/api/Admin/"+idAdmin,
        // data:dataToSend,
        success:function(respuesta){
            $("#resultado").empty();
            traerAdmin(); 
            alert("¡Se ha borrado el registro!")
        },        
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error");
        }
    });
}

function obtenerAdminEspecifico(idAdmin){
    $("#id_Admin").attr('disabled','disabled');
    mostrar();
    $("#guardar").hide();
    $("#actualizar").show(500);


    $.ajax({
        dataType: 'json',
        url: "http://132.226.44.0:8080/api/Admin/"+idAdmin,
        type:'GET',
        success:function(response) {
            console.log(response);
            let item=response;
            $("#id_Admin").val(item.idAdmin);
            $("#email_Admin").val(item.email);
            $("#pass_Admin").val(item.password);
            $("#name_Admin").val(item.name);
        },        
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error");
        }
    });
}

function inicial(){
    $(".form").hide();
    $("#id_Admin").hide();
    $(".tabla-box").show(500);
    $("#id_Admin").removeAttr('disabled'); 
}

function mostrar(){
    $(".form").show(500);
    $("#guardar").show(500);
    $(".tabla-box").hide();
    $("#actualizar").hide();
    
    $("#id_Admin").val(""),
    $("#name_Admin").val(""),
    $("#email_Admin").val(""),
    $("#pass_Admin").val("")
}