import json
import math
import datetime

def makeWaveObj(sidx, rkind, starttime, lat, lng, trgsec):
    wobj = {"siteid":sidx, 
            "reisid":rkind, 
            'starttime':starttime.strftime("%Y%m%d%H%M%S"),
            'lat':lat,
            'lng':lng,
            'trgsec':trgsec,
            'data':[]}
    for didx in range(600):
        wobj["data"].append(math.sin(math.radians(didx)))
    return wobj

if __name__ == '__main__':
    jsonobj = {"items":[]}
    starttime = datetime.datetime.strptime("20181007102000", "%Y%m%d%H%M%S")
    wpbj1 = makeWaveObj(123,"reis1",starttime, 35.123,140.00,10)
    starttime = datetime.datetime.strptime("20181007102010", "%Y%m%d%H%M%S")
    wpbj2 = makeWaveObj(124,"reis1",starttime, 36.123,141.00,20)
    starttime = datetime.datetime.strptime("20181007102050", "%Y%m%d%H%M%S")
    wpbj3 = makeWaveObj(224,"reis2",starttime, 40.123,140.00,25)
    jsonobj["items"].append(wpbj1)
    jsonobj["items"].append(wpbj2)
    jsonobj["items"].append(wpbj3)
    print json.dumps(jsonobj)
