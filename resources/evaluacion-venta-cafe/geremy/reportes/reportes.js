document.addEventListener("DOMContentLoaded", function () {
    var transacciones = JSON.parse(localStorage.getItem("transacciones")) || [];
    var totalComprasUSD = 0;
    var totalVentasUSD = 0;
    var cuentasPorCobrarBs = 0;
    for (var i = 0; i < transacciones.length; i++) {
        var t = transacciones[i];
        if (t.tipo == "Compra") {
            totalComprasUSD += t.valorNumericoUSD;
        } else if (t.tipo == "Venta") {
            cuentasPorCobrarBs += t.valorNumericoBs;
            totalVentasUSD += t.valorNumericoUSD;
        }
    }
    var balanceFinalUSD = totalVentasUSD - totalComprasUSD;
    document.getElementById("ganancia-total").innerText = "$" + balanceFinalUSD.toFixed(2);
    document.getElementById("total-cxc").innerText = cuentasPorCobrarBs.toFixed(2) + " Bs.";
    document.getElementById("total-operaciones").innerText = "Total de registros encontrados: " + transacciones.length;
    var estadoElem = document.getElementById("estado-negocio");
    estadoElem.classList.remove("positivo", "negativo");
    if (balanceFinalUSD > 0) {
        estadoElem.innerText = "El sistema registra ganancias positivas actualmente.";
        estadoElem.classList.add("positivo");
    } else if (balanceFinalUSD < 0) {
        estadoElem.innerText = "Está perdiendo dinero actualmente.";
        estadoElem.classList.add("negativo");
    } else {
        estadoElem.innerText = "El negocio está en equilibrio.";
    }
});
