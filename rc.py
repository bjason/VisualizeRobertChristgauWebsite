# from textblob import TextBlob
# import requests
import xlwt
import csv
import lxml

rankList = ['A+', 'A', 'A-', 'B+', '***', '**', '*', 'S', 'N', 'B', 'B-', 'C+', 'C',
            'C-', 'D+', 'D', 'D-', 'E+', 'E', 'E-', 'X']
rankTotal = []
rankAlbumTotal = []
ignorewords = set(['mr','mrs','one','two','said','i'])

for rank in rankList:
    with open(rank.replace('*', 'Star') + '.csv') as csvfile:
        fieldnames = ['isSoundTrack', 'rank', 'album',
                      'artist', 'year', 'url', 'comment']

        wordcount = {}
        reviews = ""

        csv_reader = csv.reader(csvfile, delimiter=',')
        for row in csv_reader:
            review = row[6].lower().replace(".","").replace(",","").replace(":","").replace("\"","").replace("!","").replace("â€œ","").replace("â€˜","").replace("*","")
            reviews += review

            for word in review.split():
                if word not in ignorewords:
                    if word not in wordcount:
                        wordcount[word] = 1
                    else:
                        wordcount[word] += 1