from espn_api.football import League
from fantasyfootballbackend.models import User
import csv

def findTopPlayers(link): #scrapes data from fantasypros.com to get top players in each position
    with open(link) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter = ",")
        for row in csv_reader:
            split = row[1].split(" ")
            players.append(split[0] + " " + split[1])
        return players

    
            


def replacable(player,freeAgencyList,positionArray):
    playerName = player.name
    try:
        rankOfPlayer = positionArray.index(playerName)
    except:
        return 
    for players in freeAgencyList:
        try:
            if positionArray.index(players.name) < rankOfPlayer:
                string = players.name +  " should replace " + playerName
                return string
        except:
             pass
        
    
#We have to account for the differences in naming conventions between ESPN and fantasy pros.
        
def topPositions(yourPlayers, bestPlayers):
    

    #Assigns different players to each position
    myFLEX = myRBs
    myFLEX.extend(myWRs)
    myFLEX.extend(myTEs)
    return {
        "topQBs" : topPositions(myQBs,topQBs),
        "topRBs" : topPositions(myRBs,topRBs),
        "topWRs" : topPositions(myWRs,topWRs),
        "topTEs" : topPositions(myTEs,topTEs),
        "topFLEX" : topPositions(myFLEX,topFLEX),
        "topDSTs" : topPositions(myDSTs,topDSTs),
        "topKs" : topPositions(myKs,topKs),
        "replaceQBs" : positionReplacable(myQBs,freeQBs,topQBs),
        "replaceRBs" : positionReplacable(myRBs,freeRBs,topRBs),
        "replaceWRs" : positionReplacable(myWRs,freeWRs,topWRs),
        "replaceTEs" : positionReplacable(myTEs,freeTEs,topTEs),
        "replaceDSTs" : positionReplacable(myDSTs,freeDSTs,topDSTs),
        "replaceKs" : positionReplacable(myKs,freeKs,topKs)
    }
    

