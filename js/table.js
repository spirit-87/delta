ajax_get("data.json", function(dataJson){
    //console.log(dataJson);

    var data=[];
    data.push(dataJson[0].receipts);
    data.push(dataJson[1].cash);
    data.push(dataJson[2].nonCash);
    data.push(dataJson[3].creditCard);
    data.push(dataJson[4].averageReceipt);
    data.push(dataJson[5].averageGuest);
    data.push(dataJson[6].deleteFromReceipt);
    data.push(dataJson[7].deleteFromBill);
    data.push(dataJson[8].numberReceipts);
    data.push(dataJson[9].numberGuests);
    //console.log(data);

    var days=data[0].length;
    var container = document.getElementById("table");
    var table = document.createElement("table");
    var tr = document.createElement("tr");
    var thText = ["Показатель","Текущий день","Вчера","Позавчера","Предыдущая дата"];
    for (i=4;i<=days;i++) {
        thText[i]="Предыдущие даты";
    }
    for (var i=0;i<=days;i++) {
        var th = document.createElement("th");
        th.innerText = thText[i];
        if (th.innerHTML=="Выбранная дата") {th.className="currentDate"};
        tr.appendChild(th);
    }
    table.appendChild(tr);

    var trText = ["Выручка","Наличные","Безналичный расчет","Кредитная карта","Средний чек, руб","Средний гость, руб",
    "Удаления из чека (после оплаты), руб","Удаления из чека (до оплаты), руб","Количество чеков","Количество гостей"];

    for (i in data) {
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        var divCont = document.createElement("div");
        divCont.className="divCont";
        divCont.innerHTML = trText[i];
        if (i>0 && i<=3) {divCont.classList.add("sub")};
        divCont.id=i;
        td.appendChild(divCont);
        tr.appendChild(td);
        tr.id=i;
        for (j in data[i]) {
            var td = document.createElement("td");
            var divCont = document.createElement("div");
            divCont.className="divCont";
            var divData= document.createElement("div");
            divData.innerHTML = gap(data[i][j]);
            divCont.appendChild(divData);
            if (j==0) {
                divCont.classList.add("currentDate");
            }
            else {            
                var diffPerc = Math.round(100*data[i][j-1]/data[i][j]);
                var divPerc=document.createElement('div');
                divPerc.className="diffPerc";
                divData.className="divData";

                if (diffPerc < 100) {
                    divPerc.innerHTML="-"+(100-diffPerc)+"%";
                    td.className="down";
                    //console.log(diffPerc);
                };
                if (diffPerc > 100) {
                    divPerc.innerHTML="+"+(diffPerc-100)+"%";
                    td.className="up";
                    //console.log(diffPerc);
                };
                  /*if (diffPerc < 100 || diffPerc > 100) {
                    divData.className="divData";
                    divCont.appendChild(divPerc);
                };*/
                divCont.appendChild(divPerc);
            }
            td.appendChild(divCont);
            tr.appendChild(td);
        };

        tr.onclick = function (e) {
            element = e.target.closest("tr");
            nextElement = element.nextSibling;
            var graphClose=false;
            if (nextElement != null && nextElement.id=="rowGraph") {graphClose=true;};
            graphElement = document.getElementById("rowGraph");
            var index = Number(element.id);
            if (graphElement !=null) {graphElement.parentElement.removeChild(graphElement)};

            if (graphClose==false) { 
                var trGraph = document.createElement("tr");
                trGraph.className="rowGraph";
                trGraph.id="rowGraph";

                var tdGraph = document.createElement("td");
                var divGraph = document.createElement("div");
                divGraph.id="graphContainer";
                tdGraph.appendChild(divGraph);
                tdGraph.colSpan=days+1;
                tdGraph.className="colGraph";
                tdGraph.id="colGraph";
                trGraph.appendChild(tdGraph);
                trGraph.appendAfter(element);

                var chartData = [];
                //console.log(data[index]);
                //for (i in data[index]){
                //alert(index);
                //alert(data[index].length);
                for (i=0;i<data[index].length;i++) {
                    console.log(thText[i+1]);
                    if (i==0) {chartData.push(['Текущий день',data[index][i]])}
                    else {chartData.push(['-'+i+' день',data[index][i]])};
                    console.log(chartData);
                }
                var chart = anychart.line(chartData);
                    chart.title("");
                    chart.container("graphContainer").draw();
                
                setOpacity(trGraph);
            }
        }
        table.appendChild(tr);
    }
    container.appendChild(table);

});

