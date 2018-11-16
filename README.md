# Audio Logger

A processing algorithm for logging audio data depending on who is speaking.

## Assumptions for this project:

* We'll be guaranteed one detection per user per time
* Detections can, and will, come out of order by time and value
* The printed output should be displayed in order by time, showing which user had the highest score for that time
* Output should be printed as soon as possible, once all the data is available
* The ResultProcessor will receive all four of its detections within 10 seconds (otherwise the app might crash)
