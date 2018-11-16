const fs = require('fs');
const assert = require('assert');
const ResultProcessor = require('../ResultProcessor');
const detections = [
  { time: 1, user: 'Brad', score: 0.81 },
  { time: 2, user: 'Chandru', score: 0.38 },
  { time: 1, user: 'Chandru', score: 0.73 },
  { time: 1, user: 'Alicia', score: 0.4 },
  { time: 3, user: 'Dominique', score: 0.46 },
  { time: 2, user: 'Alicia', score: 0.35 },
  { time: 2, user: 'Dominique', score: 0.79 },
  { time: 3, user: 'Chandru', score: 0.32 },
  { time: 2, user: 'Brad', score: 0.11 },
  { time: 4, user: 'Chandru', score: 0.55 },
  { time: 1, user: 'Dominique', score: 0.58 },
  { time: 3, user: 'Brad', score: 0.38 },
  { time: 4, user: 'Brad', score: 0.04 },
  { time: 4, user: 'Alicia', score: 0.01 },
  { time: 5, user: 'Chandru', score: 0.57 },
  { time: 3, user: 'Alicia', score: 0.9 },
  { time: 6, user: 'Brad', score: 0.57 },
  { time: 4, user: 'Dominique', score: 0.9 },
  { time: 5, user: 'Brad', score: 0.34 },
  { time: 5, user: 'Dominique', score: 0.52 },
  { time: 6, user: 'Alicia', score: 0.5 },
  { time: 6, user: 'Chandru', score: 0.82 },
  { time: 7, user: 'Brad', score: 0.2 },
  { time: 6, user: 'Dominique', score: 0.04 },
  { time: 5, user: 'Alicia', score: 0.5 },
  { time: 7, user: 'Alicia', score: 0.22 },
  { time: 8, user: 'Brad', score: 0.26 },
  { time: 7, user: 'Chandru', score: 1 },
  { time: 7, user: 'Dominique', score: 0.49 },
  { time: 9, user: 'Chandru', score: 0.78 },
  { time: 8, user: 'Dominique', score: 0.73 },
  { time: 8, user: 'Alicia', score: 0.25 },
  { time: 10, user: 'Brad', score: 0.7 },
  { time: 9, user: 'Alicia', score: 0.4 },
  { time: 8, user: 'Chandru', score: 0.69 },
  { time: 9, user: 'Dominique', score: 0.94 },
  { time: 10, user: 'Alicia', score: 0.44 },
  { time: 9, user: 'Brad', score: 0.38 },
  { time: 10, user: 'Dominique', score: 0.15 },
  { time: 10, user: 'Chandru', score: 0.64 }
];


describe('ResultProcessor', function() {
  let resultProcessor;
  beforeEach(function() {
    resultProcessor = new ResultProcessor();
    detections.forEach((detection) => {
      resultProcessor.addDetection(detection);
    });
  });

  afterEach(function() {
    fs.unlink(__dirname + '/detectionLog.txt', (err) => {
      if (err) console.error(err);
      
    });
  });

  it('should log 1 speaker for every second of time up to ten seconds', function(done) {
    setTimeout(() => {
      const detectionLog = fs.readFileSync(__dirname + '/detectionLog.txt', 'utf8');
      const testLog = fs.readFileSync(__dirname + '/testLog.txt', 'utf8');
      
      assert.equal(detectionLog, testLog);
      done();
    }, 1250);
  });
});
