

var ws;

function IniciarConexion(){
	ws = new WebSocket("ws://achex.ca:4010");

	ws.onopen = function(){
		alert('conexion abierta');
		ws.send('{"setID":"michatroom", "passwd":"12345"}');
	}

	ws.onmessage = function(Mensaje){
         var MensajesObtenidos = Mensaje.data;
         var objeto = jQuery.parseJSON(MensajesObtenidos);

         //$('#imp').append($('<li>').text(objeto.nombre+' dice: '+objeto.contenido));
         if ((objeto.nombre !=null) && (objeto.contenido !=null)) {
         	$('#plantilla').clone().appendTo('.chat');
         	$('.chat #plantilla').show(10);
         	$('.chat #plantilla .nombre').html(objeto.nombre);
         	$('.chat #plantilla .mensaje').html(objeto.contenido);

         	 $('.chat #plantilla').attr("id","");
         }
         $('#texto').val('');
                         
      	}

	ws.onclose = function(){
		alert('conexion cerrada');
	}
}

IniciarConexion();

$(document).ready(function(){
	var nombre = prompt("ingresa nombre:");
	$('#btnenviar').click(function(){
       // ws.send($('#texto').val());
       ws.send('{"to":"michatroom", "nombre":"'+nombre+'", "contenido":"'+$('#texto').val()+'"}');
	});
});
