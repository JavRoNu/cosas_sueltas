function getTheOrder(arr){
  var arr_s = Array.from(arr);
  arr_s.sort((a,b) => b -a )
  let positions = [];
  for(let i = 0; i < arr_s.length; i++){
    positions.push(arr_s.findIndex((x) => x === arr[i]))
  }
  return(positions)
}

var tu_nombre = "Toni P.";
var tu_peso = 77;
var tu_altura = 172;
var dmahal = Array(22).fill(5);

function getnombre(){
  tu_nombre = document.getElementById("nombre").value;
  }
function getaltura(){
  tu_altura = document.getElementById("altura").value;
  }
function getpeso(){
  tu_peso = document.getElementById("peso").value;
  }
function applyUserData (){
  document.getElementById("pos_msg").innerHTML = "";
  let cls = document.getElementById("pos_msg").classList
  if( cls.contains("d-none")){
    cls.remove("d-none")
  }
  let mypos = get_myPosition().position;
  let posCol = get_myPosition().colors;
  let info = "Con un peso de <b>"+tu_peso+"kg</b> y <b>"+tu_altura+"cm</b> de altura la posicón más adecuada sería "
  info = info + "<span style = 'background-color:"+posCol[0]+";'>"+mypos[0]+"</span> seguida de <span style = 'background-color:"+posCol[1]+";'>"+ mypos[1]+"</span>. "+"Puedes comprobar tu distancia relativa frente a otras posiciones en los siguientes gráficos."
  
  document.getElementById("pos_msg").innerHTML = info;
  
  $("#pos_msg").show();
  document.getElementById('pos_msg').style.opacity = 1;
}

function buildgraf1(){
  let t1 = performance.now();
var trace_g1 = {
    x: df.Kg,
    y: df.Cm_j,
    mode: 'markers',
    type: 'scatter',
    opacity: 0.5,
    name: "NFL",
    text: df.Player,
    transforms: [{
      type: 'groupby',
      groups: df.Pos_r
    }]
  };



  var layout_g1 = {
    paper_bgcolor:'rgba(0,0,0,0)',
    plot_bgcolor:'rgba(0,0,0,0)',
    hovermode: 'closest',
    font : {family:'Cabin, sans-serif'},
    title: {
      text: 'Distribución de la Liga',
      yref: 'paper',
      automargin: true,
    },
    xaxis: {
      title: {
        text: 'Peso (Kg)'
      },
    },
    yaxis: {
      title: {
        text: 'Altura (cm)'
      }
    }
  };
  
;
  var  data_g1 = [trace_g1];
  var config = {responsive: true,displaylogo: false};
  Plotly.newPlot('graf1', data_g1,layout_g1,config);
  let t2 = performance.now();
  let elapsed = t2 - t1; 
  // Write the elapsed time to the browser title bar.
  time = elapsed/1000 + "s";
  console.log("buildgraf1 "+time);
}

function updategraf1(){

if(document.getElementById("graf1").data.length > 3){
  Plotly.deleteTraces('graf1',[1])
}
var user_trace = {
  x: [parseInt(tu_peso)],
  y: [parseInt(tu_altura)],
  mode: "markers",
  marker : {
    color: 'black',
    symbol: 'x' },
  text: [tu_nombre],
  name: tu_nombre 
}
Plotly.addTraces("graf1",[user_trace]);
}

function buildgraf2(){
  let t1 = performance.now();
  // regularize mahalonbis distance
  //let elmax = math.max(dmahal);
  //let elmin = math.min(dmahal);
  //let scaled = dmahal.map((x) => (x-elmin)/(elmax - elmin));
  //scaled = scaled.map((x) => math.round(x*10000)/10000)
  //scaled = scaled.map((x) => 1/(1+x));

  // get the order
  let scaled = Array.from(dmahal);
  //scaled.sort((a,b) => b -a );
  //let elorden  = getTheOrder(dmahal);

  // filter by order
  let ejeyfinal = Array.from(maha_df.Pos);
  //if(start_counter > 0){
  //for(let i = 0;i < ejeyfinal.length;i++){
  //  ejeyfinal[elorden[i]] = maha_df.Pos[i]
  //}
  //}
  let elcolor = maha_df.color

  var layout_g2 = {
    paper_bgcolor:'rgba(0,0,0,0)',
    plot_bgcolor:'rgba(0,0,0,0)',
    font : {family:'Cabin, sans-serif'},
    title: {
      text: 'Distancia con la posición',
      automargin: true,
    },
    yaxis: {autotick: false},
    xaxis: {
    title: {
      text: 'D.Mahalanobis'
    }
    } 
  }
  
  basic_trace = {
    cliponaxis:false,
    x: scaled,
    y: ejeyfinal,
    opacity: 0.5,
    marker: {color:elcolor},
    orientation: 'h',
    type: "bar",
  }

  var config = {responsive: true,displaylogo: false}
  Plotly.newPlot('graf2',[basic_trace],layout_g2,config);

  let t2 = performance.now();
  let elapsed = t2 - t1; 
  // Write the elapsed time to the browser title bar.
  time = elapsed/1000 + "s";
  console.log("buildgraf2 "+time);
}

function updategraf2() {
Plotly.deleteTraces('graf2',[0])
  // get the order
  let scaled = Array.from(dmahal);
  scaled.sort((a,b) => b -a );
  let elorden  = getTheOrder(dmahal);

  // filter by order
  let ejeyfinal = Array.from(maha_df.Pos);
  let elcolor = Array.from(maha_df.color)
 
  for(let i = 0;i < ejeyfinal.length;i++){
    ejeyfinal[elorden[i]] = maha_df.Pos[i]
    elcolor[elorden[i]] = maha_df.color[i]
  }

  var user_trace2 = {
    cliponaxis:false,
    x: scaled,
    y: ejeyfinal,
    opacity: 0.5,
    marker: {color:elcolor},
    orientation: 'h',
    type: "bar",
  }

Plotly.addTraces("graf2",[user_trace2])
}

function buildgraf3(posgroup) {
  let t1 = performance.now();  

  let traceGroup = []
  
  for(let i = 0;i < df.Pos_r.length ;i++){
    if( df.Pos_r[i] === posgroup){

      traceGroup.push(df.Pos[i])
    }else{
      traceGroup.push("Otros")
    }
  }

  var trace_g1 = {
    x: df.Kg,
    y: df.Cm_j,
    mode: 'markers',
    type: 'scatter',
    opacity: 0.8,
    name: posgroup,
    text: df.Player,
    transforms: [{
      type: 'groupby',
      groups: traceGroup,
      styles: [{target: 'Otros', value: {marker: {color: 'gray', opacity: 0.3}}}]
    }]
  };

  var layout_g1 = {
    paper_bgcolor:'rgba(0,0,0,0)',
    plot_bgcolor:'rgba(0,0,0,0)',
    hovermode: 'closest',
    font : {family:'Cabin, sans-serif'},
    title: {
      text: 'Distribución de '+ posgroup,
      yref: 'paper',
      automargin: true,
    },
    legend: {orientation: 'h', side: 'top'}
  };
  
;
  var  data_g1 = [trace_g1];
  var config = {responsive: true,displaylogo: false};
  Plotly.newPlot('graf3', data_g1,layout_g1,config);
  let t2 = performance.now();
  let elapsed = t2 - t1; 
  // Write the elapsed time to the browser title bar.
  time = elapsed/1000 + "s";
  console.log("buildgraf3 "+time);
}

function updategraf3(posgroup) {
  //spshow();
  let t1 = performance.now();  
  var graphDiv = document.getElementById('graf3')
  Plotly.purge(graphDiv);
  buildgraf3(posgroup)

  let t2 = performance.now();
  let elapsed = t2 - t1; 
  time = elapsed/1000 + "s";
  console.log("UPDATE GRAF 3  "+time);
  //sphide();
}
// document.getElementById("spinner-container").style.zIndex = -1;

// get data for malahanobis
function calc_maha(punto,mu_mat,lavar,lacov) {
  let a = [punto[0] - mu_mat[0],punto[1] - mu_mat[1]];
  let b = math.inv([[lavar[0],lacov],[lacov,lavar[1]]]);
  let c = math.multiply(a,b);
  let d2 = math.sqrt(math.multiply(c,a));
  return(d2);
}

function  get_distances(){
  let punto = [tu_peso,tu_altura];
  let dmhalg = [];

  for(let i = 0;i < maha_df.Pos.length ; i++){
    let k = calc_maha(punto,[maha_df.x_gmu[i],maha_df.y_gmu[i]],[maha_df.x_gva[i],maha_df.y_gva[i]],maha_df.xy_gco[i]);
    dmhalg.push(math.round(k*1000)/1000);
  } 
  dmahal = dmhalg;
}

function get_myPosition(){
    // get the order
    let scaled = Array.from(dmahal);
    scaled.sort((a,b) => a -b );
    let elorden  = getTheOrder(dmahal);
  
    // filter by order
    let ejeyfinal = Array.from(maha_df.Pos);
    let elcolor = Array.from(maha_df.color)
   
    for(let i = 0;i < ejeyfinal.length;i++){
      ejeyfinal[elorden[i]] = maha_df.Pos[i]
      elcolor[elorden[i]] = maha_df.color[i]
    }

  return({"position":[ejeyfinal[21],ejeyfinal[20]],"colors":[elcolor[21],elcolor[20]]});
}

buildgraf2();
get_distances();
buildgraf1();
buildgraf3("DB-CB-S");

// tabla jugadores
function buildtable() {
  let t1 = performance.now();  
  cuerpo = document.getElementById("cuerpotabla");
  for(let i = 0; i < df.Pos.length ;i++){
      let row = cuerpo.insertRow();
      let addit = [df.Player[i],df.Pos_r[i],df.Pos[i],df.Cm_j[i],df.Kg[i]];
      for(let i2 = 0 ; i2 < 5;i2++){
        let addup = row.insertCell(i2)
        addup.innerHTML = addit[i2]
      }

    }
  let t2 = performance.now();
  let elapsed = t2 - t1; 
  time = elapsed/1000 + "s";
  console.log("buildtable in  "+time);  
}

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


function updategraf3Table(index){

  if(document.getElementById("graf3").data.length > 2){
    Plotly.deleteTraces('graf3',[1])
  }

 var user_trace3 = {
   x: [df.Kg[index]],
   y: [df.Cm_j[index]],
   mode: "markers",
   marker : {
     color: 'black',
     symbol: 'x' },
   text: [df.Player[index]],
   name: df.Player[index]
 }
 Plotly.addTraces("graf3",[user_trace3]);
}

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

// Custom range filtering function
function filterTable(posgroup){
  table.column(1).search(posgroup).draw();
} 

function  sphide(){
  console.log("hide spinner");
  $("#spinner-container").hide();
}

function spshow(){
  console.log("show spinner");
  $("#spinner-container").show();
}

filterTable("DB-CB-S");
sphide();

function update2nd(lapos){
  spshow();     
setTimeout(function() {
  updategraf3(lapos);
  filterTable(lapos);
  sphide();
}, 0);
}

function updateInitialSpinner(per){
  let degre = 3.60*per
  document.getElementById("progress-value").innerHTML = per+"%"
  document.getElementById("initial-spinner").style.background = "conic-gradient(#484e52 "+degre+"deg, #f3f3f3 0deg)" 
}