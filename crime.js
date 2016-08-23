var count=0;
var over="OVER $500";
var under="$500 AND UNDER"
var crime=[];
var obj={};
var flag=-1;

const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream('Crimes_-_2001_to_present.csv')
});
console.time("Crime Data:");
rl.on('line', function (line) {
  var data=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);


count++;

if(count===1){
  // console.log("Year: "+data.indexOf("Year"));
  index_year=data.indexOf("Year");

  // console.log("Over: "+data.indexOf("Description"));
  index_descript=data.indexOf("Description");
}
year=data[index_year];
descript=data[index_descript];

if(year>=2001 && year<=2016 ){

 if(descript===over){

  if(crime.length===0){
    var obj={};
    obj.year=year;
    obj.over=0;
    obj.under=0;
    crime.push(obj);
  }

 else if(crime.length>0){
   for(var i=0;i<crime.length;i++){
    if(crime[i].year===year){
     flag=i;
     break;
   }
  }
      if(flag>=0){
       var sum=crime[i].over;
         sum=sum+1;
         crime[i].over=sum;
         flag=-1;
       }

       else if(flag===-1){
       var obj={};
       obj.year=year;
       obj.over=0;
       obj.under=0;
       crime.push(obj);
     }

 }

 }

 else if(descript===under){

   if(crime.length===0){
     var obj={};
     obj.year=year;
     obj.over=0;
     obj.under=0;
     crime.push(obj);
   }

  else if(crime.length>0){
    for(var i=0;i<crime.length;i++){
     if(crime[i].year===year){
      flag=i;
      break;
    }
   }
       if(flag>=0){
        var sum=crime[i].under;
          sum=sum+1;
          crime[i].under=sum;
          flag=-1;
        }

        else if(flag===-1){
        var obj={};
        obj.year=year;
        obj.over=0;
        obj.under=0;
        crime.push(obj);
      }

  }
}
}
// console.log(crime);
});


rl.on('close', function() {
var file1= JSON.stringify(crime);
fs.writeFile('crime.json',file1,function(){console.log("crime.json Generated")});
console.timeEnd("Crime Data:");
});
