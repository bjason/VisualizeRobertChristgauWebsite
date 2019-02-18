from textblob import TextBlob
# import requests
import xlwt
import csv
import lxml
import collections

rankList = ['A+', 'A', 'A-', 'B+', '***', '**', '*', 'S', 'N', 'B', 'B-', 'C+', 'C',
            'C-', 'D+', 'D', 'D-', 'E+', 'E', 'E-', 'X']
rankList = ['A+']
ignorewords = set(['mr', 'mrs', 'one', 'two', 'said', 'i', '/i', '< i >', '< /i >', '<', '>', 'from',
                   'is', 'of', 'it', 'and', 'by', 'his', 'this', 'that', 'in', 'on', "i 'm", "i 'd", "i 've", "ca n't", "wo n't"])

with open('rc.csv', 'wb') as csvfile:
    fieldnames = ['album/ rank', 'word', 'frequency', 'polarity', 'subjectivity']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    wordcount_total = {}

    for rank in rankList:
        with open(rank.replace('*', 'Star') + '.csv', encoding="utf-8") as csvfile:
            fieldnames = ['isSoundTrack', 'rank', 'album',
                        'artist', 'year', 'url', 'comment']

            wordcount = {}
            reviews = ""

            csv_reader = csv.reader(csvfile, delimiter=',')
            for row in csv_reader:
                review = row[6].lower()
                # .replace(".", "").replace(",", "").replace(":", "").replace(
                #     "\"", "").replace("!", "").replace("â€œ", "").replace("â€˜", "").replace("*", "")
                # reviews += review

                sentence = TextBlob(review)
                for word in sentence.noun_phrases:
                    if word not in ignorewords:
                        if word not in wordcount:
                            wordcount[word] = 2
                            wordcount_total[word] = 2
                        else:
                            wordcount[word] += 2
                            wordcount_total[word] += 2

                for tag in sentence.tags:
                    if tag[1] != "JJ":
                        continue

                    word = tag[0]
                    if word not in ignorewords:
                        if word not in wordcount:
                            wordcount[word] = 1
                            wordcount_total[word] = 1
                        else:
                            wordcount[word] += 1
                            wordcount_total[word] += 1

        n_print = 100
        print("\nOK. The {} most common words are as follows\n".format(n_print))
        word_counter = collections.Counter(wordcount)
        for word, count in word_counter.most_common(n_print):
            print(word, ": ", count)
