import requests
from bs4 import BeautifulSoup
from html.parser import HTMLParser
page = requests.get('https://www.cbssports.com/fantasy/football/rankings/standard/QB/') 
soup = BeautifulSoup(page.content, 'html.parser')
print(soup.prettify())