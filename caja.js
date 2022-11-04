
var bd;
function iniciar(){
	console.log(bd)
	//boton = document.getElementById("almacenar");
    //boton.addEventListener("click", agregarobjeto, false);
    var solicitud = indexedDB.open("TiendaC");

    solicitud.onsuccess=function(e){
		bd=e.target.result;
		cajadatos.innerHTML="";
    	var transaccion=bd.transaction(["Caja"], "readonly");
    	var almacen1=transaccion.objectStore("Caja"); 
   	 	var cursor=almacen1.openCursor();

    	cursor.addEventListener("success", mostrarDatos, false);		
	}

}

var valores=[];
//en esta trasaccion de lectura mostramos el contenido almacenado en la bace de datos
//y utilizamos los codicionales xq las ventas y las compras cuentan con distitos caracteres, entonces utilizamos los condicionales para 
//diferenciar las compras de las ventas
function mostrarDatos(e){
		var cursor=e.target.result;
		if(cursor){
			if(cursor.value.actividad == "Compra"){
				cajadatos.innerHTML+="<div class='card text-center mb-4'><div class='card-body'><strong>Actividad</strong>:"+cursor.value.actividad+" | <strong>Codigo</strong>:"+cursor.value.codigo +" | <strong>Fecha</strong>:"+cursor.value.fecha+" | <strong>Prenda</strong>:" + cursor.value.prenda + " | <strong>Talle</strong>:" + cursor.value.talle + " | <strong>Valor</strong>:" + 
				cursor.value.valor + " | <strong>Unidades</strong>:" + cursor.value.unidades+"</div></div>";
			}else{
				cajadatos.innerHTML+="<div class='card text-center mb-4'><div class='card-body'><strong>Actividad</strong>:"+cursor.value.actividad+" | <strong>Codigo</strong>:"+cursor.value.codigo +" | <strong>Fecha</strong>:"+cursor.value.fecha+" | <strong>Valor</strong>:" + 
			    cursor.value.valorU + " | <strong>Unidades</strong>:" + cursor.value.unidades+"</div></div>";
			}
			cursor.continue(); 
		}
}
//abrimos otra transaccion de lectura
let cajaHoy=0;  
function mostrarCaja(){
    var transaccion=bd.transaction(["Caja"], "readonly");
    var almacen1=transaccion.objectStore("Caja"); 
    var cursor=almacen1.openCursor();

    cursor.addEventListener("success", sierreCaja, false);
    console.log("hola1")
    cajaHoy=0;
}

//en esta funcion hacemos un cierre de caja de ese dia
function sierreCaja(e){
		
		var cursor=e.target.result;
		//en la linea 52 hasta el 55 es un metodo que se utiliza para obtener la fecha de hoy
		var f = new Date();
		var dd = f.getDate();
		var mm = f.getMonth()+1;
		var yy = f.getFullYear();
		dd = addZero(dd);
		mm = addZero(mm);
		var hoy = yy +"-"+mm+"-"+dd;
		console.log("1",hoy)

		if(cursor){
			if(cursor.value.actividad == "Compra"){
				console.log("2",cursor.value.fecha, hoy)
				if(cursor.value.fecha == hoy){
					cajaHoy+=(cursor.value.valor*cursor.value.unidades);
					console.log("3",cajaHoy, (cursor.value.valor*cursor.value.unidades))
				}
			}else{
				
			}
			cursor.continue(); 
		}
		resultadoHC.innerHTML=cajaHoy;
}
function addZero(i){
	if(i < 10){
		i="0"+i;
	}
	return i;
}
window.addEventListener("load", iniciar, false);