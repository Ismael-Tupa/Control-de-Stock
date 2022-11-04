var bd;
function iniciar(){

 //creamos vace de datos,  solicitud es la variable donde guardamos los datos. //
    var solicitud = indexedDB.open("TiendaC",2);
 //alamacenamos los datos , 
    solicitud.onsuccess=function(e){

		bd=e.target.result;
		

	}
	solicitud.onupgradeneeded=function(e){

		bd=e.target.result;
		
		//crea un almacen de datos dentro de la base de datos, la tabla de datos se va a llamar prendas y el campo clave va a ser codigo//
		bd.createObjectStore("Prendas", {keyPath:"codigo"});
		bd.createObjectStore("Caja",{keyPath: "id", autoIncrement: true});
	
	}
}
	window.addEventListener("load", iniciar , false);
