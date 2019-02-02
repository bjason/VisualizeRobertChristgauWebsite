from bs4 import BeautifulSoup
from pyecharts import Bar
from pyecharts import Pie
import requests
import xlwt
import csv
import lxml

rankList = ['A+','A','A-','B+','***','**','*','S','N','B','B-','C+','C',
                        'C-','D+','D','D-','E+','E','E-','X']
rankTotal = []
rankAlbumTotal = []

with open('rc.csv', 'w', newline='') as csvfile:
    fieldnames = ['isSoundTrack', 'rank', 'album', 'artist', 'year']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

    for rank in rankList:
        # para = []
        param = {'g': rank}
        retry = 50
        while retry > 0:
            print(('retrying:' + str(retry)))
            try:
                req = requests.get("https://www.robertchristgau.com/get_gl.php", params = param, timeout = 5)
            except BaseException as e:
                print('Timeout, try again')
                retry -= 1
            else:
                # succeed
                print('ok')
                break
        else:
                # fail
                print('Try 50 times, But all failed')

        #print req
        html = req.text
        soup = BeautifulSoup(html, 'lxml')
        soup.prettify().encode("gbk", 'ignore').decode("gbk", "ignore")

        ul = soup.find_all('ul')

        # ordinary album list
        for item in ul[0].children:
            d = {
                "isSoundTrack": 'false',
                "rank": rank,
                "album": "",
                "artist": "",
                "year": "" } # dictionary to store the data
            try:
                a = item.find_all('a')
                
                artist = a[0].string
                d["artist"] = artist
                if len(a) > 1:
                    album = a[1].string
                    d["album"] = album
                else:
                    album = item.i.string
                    d["album"] = album
                    
                year = item.b.next_sibling.next_sibling.next_sibling.string[2:6]
                d["year"] = year

                print(artist + ' - ' + album + ' (' + year + ')')
                print(type(d))
                writer.writerow(d)

            except BaseException as e:
                continue

        print('\nCompilations/Soundtracks\n')

        # soundtrack list
        if len(ul) > 1:
            for item in ul[1].children: 
                d = {
                    "isSoundTrack": 'true',
                    "rank": rank,
                    "album": "",
                    "artist": "Various Artists",
                    "year": "" } # dictionary to store the data           
                try:
                    album = item.a.string
                    d["album"] = album
                    year = item.b.next_sibling.string[2:6]
                    d["year"] = year
                except BaseException as e:
                    try:                    
                        album = item.i.string
                        d["album"] = album
                    except BaseException as e:
                        continue
                
                print(album + ' (' + year + ')')
                print(type(d))
                writer.writerow(d)