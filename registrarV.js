
let indexedDB = window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB;
var bd;
function iniciar(){

    cajaForm = document.getElementById("cajaformulario1");
    boton = document.getElementById("extraer");
    boton.addEventListener("click", extraerObjeto, false);
    var solicitud = indexedDB.open("TiendaC", 2);
    solicitud.onsuccess=function(e){
        bd=e.target.result;
    }
}
function extraerObjeto(){
    var fecha = document.getElementById("fechaV").value;
    var codigo = document.getElementById("codigoV").value;
    var valor = parseFloat(document.getElementById("valorV").value);
    var unid = parseInt(document.getElementById("unidadesV").value);
    agregado(fecha, valor, unid, codigo);
    var transaccion = bd.transaction(["Prendas"], "readwrite");
    var almacen = transaccion.objectStore("Prendas");
    var request = almacen.get(codigo);

    request.onsuccess=function(e){
        var data = e.target.result;
        console.log("hola", data.unidades)
        var res1 = data.unidades - unid;
        if (res1 >= 0){
            data.unidades = res1;
            console.log(data.unidades)
            if (data.unidades == 0){
                data.unidades = "Agotado";
                var requestUpdate = almacen.put(data);
            }else{
                var requestUpdate = almacen.put(data);
                alert("Venta realizada")
            }
        }else if (data.unidades == "Agotado"){
            alert("El producto esta Agotado")
        }else{
            alert("unidades insuficietes")
            var requestUpdate = almacen.put(data);
        }
    }
}

function agregado(a, z, s, x){
    var transaccion = bd.transaction(["Caja"], "readwrite");
    var almacen = transaccion.objectStore("Caja");

    almacen.put({
        actividad: "venta",
        fecha: a,
        valorU : z,
        unidades: s,
        codigo: x
    })
}

window.addEventListener("load", iniciar , false);
 

