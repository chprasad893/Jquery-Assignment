var cdata;
var pageIndex=1;
var pageSize=4;
var end=(pageIndex*pageSize);
var start=0;
var total_pages;



$(document).ready(function(){
$ .getJSON("crime.json", function(data){
data.sort(function(a, b){return a.year-b.year});
cdata=data;
if(cdata!=undefined)
{
  total_pages = Math.ceil(cdata.length / pageSize);
  myFunction(pageIndex);
}
});
});


function myFunction(pindex) {
  total_pages = Math.ceil(cdata.length / pageSize);
  if((pindex*pageSize)>cdata.length){
    end=cdata.length;
    start=(((pindex-1)*pageSize));
  }
  else{
     end=(pindex*pageSize);
     start=(end-pageSize);
  }

$ ("#myTable").html("");
  var table = document.getElementById("myTable");
  var head="<tr><th>Year</th><th>Under 500</th> <th>Over 500</th><th>Delete Data</th></tr>";
   table.innerHTML=head;

  for(var i=start;i<end;i++){
  var row = table.insertRow();
  var cell1 = row.insertCell();
  var cell2 = row.insertCell();
  var cell3 = row.insertCell();
  var cell4 = row.insertCell();
    cell1.innerHTML = cdata[i].year;
    cell2.innerHTML = cdata[i].under;
    cell3.innerHTML = cdata[i].over;
    cell4.innerHTML ='<button id="remove" onclick="deleteData('+pindex +','+ i +')">Delete</button>';
    // console.log(cdata);
}

$('#paging').html("");
for(j=0;j<total_pages;j++)
{
  $('#paging').append('<button type="button" id="nav" onclick="myFunction('+ (j+1) +')">'+ (j+1) + '</button>');
}

}

function addData(){
var obj={};
obj.year=document.getElementById('add_year').value;
obj.under=document.getElementById('add_under').value;
obj.over=document.getElementById('add_over').value;
cdata.push(obj);
// console.log(obj);
// console.log(cdata);
myFunction(total_pages);
}

function deleteData(pno,obj_no){
// console.log(obj_no);
for(var k=obj_no;k<((cdata.length)-1);k++){
  cdata[k].year=cdata[k+1].year;
  cdata[k].under=cdata[k+1].under;
  cdata[k].over=cdata[k+1].over;
}
cdata.pop();
// console.log(cdata);
myFunction(pno);
}
