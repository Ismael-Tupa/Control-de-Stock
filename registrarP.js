
var bd;
function iniciar(){

    cajaForm = document.getElementById("cajaformulario");
    boton = document.getElementById("almacenar");

    boton.addEventListener("click", agregarobjeto, false);

    var solicitud = indexedDB.open("TiendaC");

    solicitud.onsuccess=function(e){
		bd=e.target.result;
	}
}
function verificador(bRadio){
    for(var i=0;i<bRadio.length;i++){
      if(bRadio[i].checked){
        resultado = bRadio[i].value;
      }
    }
  return resultado
}
function agregarobjeto(){

	var codigo = document.getElementById("codigo").value;
	var prenda = document.getElementById("prenda").value;
	var veriTalle =document.getElementsByName("talle");
	var talle = verificador(veriTalle);
	var valor = parseFloat(document.getElementById("valor").value);
	var unidades = parseInt(document.getElementById("unidades").value);
	var fecha = document.getElementById("fecha").value;

	trans(1,"Prendas",codigo, fecha, prenda, talle, valor, unidades);
	trans(2,"Caja",codigo, fecha, prenda, talle, valor, unidades);

	//agregar.addEventListener("success", mostrar, false);

    document.getElementById("codigo").value=""
	document.getElementById("prenda").value=""
	
	document.getElementById("valor").value=""
	document.getElementById("unidades").value=""
	document.getElementById("fecha").value=""

	console.log(codigo, fecha, prenda, talle, valor, unidades);
	//agregado(codigo, fecha, prenda, talle, valor, unidades);
	//Leyendo objetos
	odjeto.innerHTML= "<div class='card text-center mb-4'><div class='card-body'><h3>Producto agregado</h3><br><strong>Codigo</strong>:"+codigo+"-<strong>Fecha</strong>:"+fecha+"-<strong>Prenda</strong>:"+prenda+"-<strong>Talle</strong>:"+talle+"-<strong>Valor</strong>:"+valor+"-<strong>Unidades</strong>:"+unidades+"</div></div>";

}

function mostrar(){
    cajadatos.innerHTML="";
    var transaccion=bd.transaction(["Prendas"], "readonly");
    var almacen1=transaccion.objectStore("Prendas"); 
    var cursor=almacen1.openCursor();

    cursor.addEventListener("success", mostrarDatos, false);

 }
 function mostrarDatos(e){
	var cursor=e.target.result;
	if(cursor){
		cajadatos.innerHTML+="<div>"+cursor.value.codigo + " | " + cursor.value.fecha + " | " + cursor.value.prenda + " | " + cursor.value.talle + " | " + 
		cursor.value.valor + " | " + cursor.value.unidades + "</div";

		cursor.continue(); 
	}
}
function trans(op,tabla,a,b,c,d,e,f){
	var transaccion = bd.transaction(tabla,"readwrite");
	var almacen=transaccion.objectStore(tabla);
    if(op == 1){
		var agregar =almacen.add({codigo: a, fecha: b,prenda: c, talle: d, valor: e, unidades: f});
	}
	if(op == 2){
		var agregar =almacen.add({actividad:"Compra",codigo: a, fecha: b,prenda: c, talle: d, valor: e, unidades: f});
	}
}
window.addEventListener("load", iniciar , false);