// An algorithm is presented by T. Gonzalez and S. Sahni
// Task = 2
// Cmax = max{sum(aj), sum(bj), max{ aj + bj }}

var jobs = [7, 9, 5, 4];

console.log(makeSpan(jobs));

function makeSpan(jobs) {
  var ascendingJobs = jobs.slice();
  var descendingJobs = jobs.slice();
  var schedule = [];
  var schedule1 = [];
  var schedule2 = [];
  var sumA = 0;
  var sumB = 0;
  var r = 0;
  var k = 0;

  ascendingJobs.sort(function(a, b) {
    return b-a;
  });
  descendingJobs.sort(function(a, b) {
    return a-b;
  });

  ascendingJobs.forEach(function (j, i) {
    if (j <= descendingJobs[r]) {
      schedule.push(j);
      ascendingJobs.splice(i, 1);
    } else {
      schedule.push(r);
      r = i;
    }
  });

  descendingJobs.forEach(function (j, i) {
    if (j <= ascendingJobs[k]) {
      schedule.unshift(j);
      descendingJobs.splice(i, 1);
    } else {
      schedule.unshift(k);
      k = i;
    }
  });

  schedule = schedule.filter(Number); // Remove zeros

  sumA = ascendingJobs.reduce(function(acc, val) {
    return acc + val;
  }, 0);
  sumB = descendingJobs.reduce(function(acc, val) {
    return acc + val;
  }, 0);

  k = [k];
  r = [r];

  if (sumA - ascendingJobs[k] < sumB - descendingJobs[r]) {
    schedule1 = schedule.concat(r).concat(k);
    schedule2 = k.concat(schedule).concat(r);
  } else {
    schedule1 = k.concat(schedule).concat(r);
    schedule2 = r.concat(k).concat(schedule);
  }

  return { s1: schedule1, s2: schedule2 };
}



