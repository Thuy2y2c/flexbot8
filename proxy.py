from bs4 import BeautifulSoup as BS
import requests
import os
from time import sleep

abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

HEADERS = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:87.0) Gecko/20100101 Firefox/87.0'
}

print()

try:
    f = open('socks4.txt', 'r')
    s4_read = f.read()
    f.close()
except:
    print('Đang tạo socks4.txt')
    open('socks4.txt', 'w').write('')
    f = open('socks4.txt', 'r')
    s4_read = f.read()
    f.close()
    sleep(1)

#!Socks4
print()
sleep(1)
print('Đang tìm kiếm socks4...')

with open('socks4.txt', 'a') as file:
    lol = 0
    r = requests.get(f'https://hidemy.name/ru/proxy-list/?type=4#list', headers=HEADERS)
    soup = BS(r.content, 'html.parser')
    proxies = soup.find('div', class_='table_block').find('tbody').find_all('tr')
    for i in proxies:
        _proxy = i.find('td')
        _port = _proxy.find_next('td').text
        _proxy = _proxy.text
        proxy = _proxy + ':' + _port
        if proxy in s4_read: continue
        if lol == 0:
            if s4_read == [''] or s4_read == [] or s4_read == '':
                file.write(proxy)
            lol = 1
        else:
            file.write(f'\n' + proxy)

while True:
    try:
        with open('socks4.txt', 'a') as file:
            site = soup.find('li', class_='next_array').find('a').get('href')

            r = requests.get(f'https://hidemy.name{site}', headers=HEADERS)
            soup = BS(r.content, 'html.parser')

            proxies = soup.find('div', class_='table_block').find('tbody').find_all('tr')

            for i in proxies:
                _proxy = i.find('td')
                _port = _proxy.find_next('td').text
                _proxy = _proxy.text
                proxy = _proxy + ':' + _port
                if proxy in s4_read: continue
                file.write(f'\n' + proxy)

    except Exception as e:
        break

r = requests.get(f'https://raw.githubusercontent.com/roosterkid/openproxylist/main/SOCKS4_RAW.txt', headers=HEADERS)
soup = BS(r.content, 'html.parser')

proxies = soup.find_all('tr')

with open('socks4.txt', 'a') as file:
    for i in proxies:
        proxy = i.text.split('\n')[2]
        if proxy in open('socks4.txt', 'r').read(): continue
        file.write('\n' + proxy)

r = requests.get(f'https://www.proxyscan.io/download?type=socks4', headers=HEADERS)
soup = BS(r.content, 'html.parser')

proxies = str(r.content).split(f'\n')[0].split(f'\\n')

with open('socks4.txt', 'a') as file:
    for i in proxies:
        if i in open('socks4.txt', 'r').read(): continue
        if '<' in i: continue
        lol = 0
        for j in abc:
            if j in i: lol = 1
        if lol == 1: continue
        file.write('\n' + i)

print('Thành Công!')

r = requests.get(f'https://api.proxyscrape.com/v2/?request=getproxies&protocol=socks4&timeout=10000&country=all', headers=HEADERS)
soup = BS(r.content, 'html.parser')

proxies = str(r.content).split(f'\n')[0].split(f'\\n')

with open('socks4.txt', 'a') as file:
    for i in proxies:
        if i in open('socks4.txt', 'r').read(): continue
        if '<' in i: continue
        lol = 0
        for j in abc:
            if j in i: lol = 1
        if lol == 1: continue
        file.write('\n' + i)

print('Thành công!')
os.rename('socks4.txt', 'proxies.txt')