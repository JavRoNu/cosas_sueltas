
var tu_nombre = "Toni P.";
var tu_peso = 77;
var tu_altura = 172;
var dmahal = Array(22).fill(5);
buildtable();
    // pasar a datatable
let table = new DataTable('#mitabla',{
    responsive: true,
    columnDefs: [
      {target: 1,visible: false }
  ],
    language: {
      url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json',
      lengthMenu: "Mostrar _MENU_ jugadores por página",
      info: "Mostrando de _START_ a _END_ de _TOTAL_ jugadores",
      infoEmpty: "No se encuentra níngun jugador",
      infoFiltered: "( de un total de _MAX_ jugadores)"
    }
});

    // toggle row selection
table.on('click', 'tbody tr', function (e){
    let classList = e.currentTarget.classList;
  
    if (classList.contains('selected')) {
        classList.remove('selected');
    }
    else {
        table.rows('.selected').nodes().each((row) => row.classList.remove('selected'));
        classList.add('selected');
    }
  
    let mirow =  table.row( this ).index();
    console.log("Row Index to show: "+mirow);
    updategraf3Table(mirow);
  
});

 // initial spinner
setTimeout(() => {
    updateInitialSpinner(20);
    buildgraf1();
    setTimeout(() => {
        updateInitialSpinner(40);
        get_distances();
        buildgraf2();
        setTimeout(() => {
            updateInitialSpinner(60);
            buildgraf3("DB-CB-S");
            setTimeout(() => {
                updateInitialSpinner(80);
                filterTable("DB-CB-S");
                setTimeout(() => {
                    updateInitialSpinner(99);
                    setTimeout(() => {
                        sphide();
                        document.getElementById("loadscreen").style.opacity = 0
                        setTimeout(() => {
                        document.getElementById("loadscreen").classList.remove("d-flex")
                        document.getElementById("loadscreen").classList.add("d-none") 
                        },2000);
                    },0)
                },0)
            },0)
        },0)
    },0)
},0)



