# Visualization for Robert Christgau

To visit: https://bjason.github.io/VisualizeRobertChristgauWebsite/index.html

This is the source code for visualize for robert christgau webpage. All data are gained through [rc.py](https://github.com/bjason/VisualizeRobertChristgauWebsite/blob/master/rc.py) from the blog of Mr.Robert, https://www.robertchristgau.com/

### Introduction
This visualization visualized over Robert's over 16,000 graded reviews and presented the distribution of the album reviews to the years and to the grade letter. In the reviews, he graded an album among A+, A, A-, B+, \*\*\*, \*\*, \*, S, N, B, B-, C+, C, C-, D+, D, D-, E+, E, E-, X. A+ is the highest grade meaning "this is a record of sustained beauty, power, insight, groove, and/or googlefritz that has invited and repaid repeated listenings in the daily life of someone with 500 other CDs to get to" and E- is, of course, the opposite. The specific grading critiria can be found here. 

There is 3 graph and 1 list.

1. Grade graph. Grade view shows the distribution to the grade, that is, what is the proportion of certain grade Christgau ever gave. You can scroll on this graph to rotate the pie graph to get better view of one certain grade. Besides, hover over one grade to have detail statistic of this grade.
![img](https://i.imgur.com/M2aD0B1.png)
2.	Year view shows the review distribution to the year. The darker color tells more albums this certain year Christgau graded to the certain grade. Hover over to see detail statistic of one grade. Click on it to see all the albums of one certain year and one certain grade.
![img](https://i.imgur.com/5dLN1md.png)
3.	Artist view is the view where grades are shown according to the artists. When an artist has more albums graded as a certain grade, the bubble becomes bigger. Vice versa. To interact, click on one bubble to read detail.
![img](https://i.imgur.com/2k6asO6.png)

The list shows all the albums in given parameters. You can assign specific year or/and rank in the right of the page. For example, the following picture shows the album released in 1967 and ranked as A+.
![img](https://i.imgur.com/WeuTtLQ.png)

### Library
The website uses [D3.js](d3js.org) to draw visualization and jQeury to make smooth user experience.
