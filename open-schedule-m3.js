var req1 = [10, 4, 10, 9, 7, 9, 23, 7, 15, 11];
var req2 = [10, 4, 10, 9, 7, 9 , 23, 7, 15, 11];
var tick = 0;
var res = [];
var desc = req1.sort(function (a, b) {
  return b > a;
});

calcTime(desc, desc.splice(0,3), res); // green - 37
ctx.strokeStyle = 'green';
draw(res);

res = [];
tick = 0;
calcTime(req2, req2.splice(0,3), res); // red - 36
ctx.strokeStyle = 'red';
draw(res);

function draw(array) {
  ctx.beginPath();
  ctx.moveTo(0, 0);
  res.forEach(function(e) {
    ctx.lineTo(e[0]*6, e[1]*6);
    ctx.stroke();
  });
}

function calcTime(array, zones, res) {
  tick++;
  zones.forEach(function (elem, i) {
    zones[i] > 0 ? zones[i]-- : null;
    if (zones[i] === 0 && array.length > 0) {
      zones[i] = array.splice(0,1)[0];
    }
  });
  var sum = zones.reduce(function(acc, val) {
    return acc + val;
    });
    res.push([tick, sum]);
  if (sum === 0) {
    return tick;
  }
  return calcTime(array, zones, res);
}
