from textblob import TextBlob
# import requests
import xlwt
import csv
import lxml
import collections

rankList = ['A+', 'A', 'A-', 'B+', '***', '**', '*', 'S', 'N', 'B', 'B-', 'C+', 'C',
            'C-', 'D+', 'D', 'D-', 'E+', 'E', 'E-', 'X']
ignorewords = set(['mr', 'mrs', 'one', 'two', 'said', 'i', '/i', '< i >', '< /i >', '<', '>', 'from',
                   'is', 'of', 'it', 'and', 'by', 'his', 'this', 'that', 'in', 'on', "i 'm", "i 'd", "i 've", "ca n't", "wo n't"])

with open('rc.csv', 'w', newline='') as csvfile:
    fieldnames = ['album', 'artist', 'polarity', 'subjectivity']
    writer = csv.writer(csvfile)
    writer.writerow(f for f in fieldnames)

    wordcount_total = {}

    for rank in rankList:
        with open(rank.replace('*', 'Star') + '-modified.csv', 'w', newline='') as rankfile:
            fieldnames = ['word', 'frequency']
            rank_writer = csv.writer(rankfile)
            rank_writer.writerow(f for f in fieldnames)

            with open(rank.replace('*', 'Star') + '.csv', encoding="ISO-8859-1") as csvfile:
                fieldnames = ['isSoundTrack', 'rank', 'album',
                              'artist', 'year', 'url', 'comment']

                wordcount = {}
                # reviews = ""

                csv_reader = csv.reader(csvfile, delimiter=',')
                row = 0
                for row in csv_reader:  # an album
                    if row == 0:
                        row = 1
                        continue

                    d = [row[2], row[3], 0, 0]

                    review = row[6].lower()
                    if len(review) == 0:
                        continue
                    # .replace(".", "").replace(",", "").replace(":", "").replace(
                    #     "\"", "").replace("!", "").replace("â€œ", "").replace("â€˜", "").replace("*", "")
                    # reviews += review

                    sentence = TextBlob(review)

                    d[2] = sentence.sentiment.polarity
                    d[3] = sentence.sentiment.subjectivity

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

                    writer.writerow(d)

            n_print = 50
            print("\nOK. The {} most common words are as follows\n".format(n_print))
            word_counter = collections.Counter(wordcount)
            for word, count in word_counter.most_common(n_print):
                print(word, ": ", count)

                d = [word, count]
                rank_writer.writerow(d)

    with open('total-modified.csv', 'w', newline='') as rankfile:
        n_print = 100
        print("\nOK. The {} most common words are as follows\n".format(n_print))
        word_counter = collections.Counter(wordcount_total)

        fieldnames = ['word', 'frequency']
        rank_writer = csv.writer(rankfile)
        rank_writer.writerow(f for f in fieldnames)

        for word, count in word_counter.most_common(n_print):
            print(word, ": ", count)

            rank_writer.writerow([word, count])

        # save for text cloud
