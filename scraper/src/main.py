from concurrent.futures import ThreadPoolExecutor, as_completed
from multiprocessing import Pool

from bs4 import BeautifulSoup
import requests

from src.utils import timer_func, fetch_html_data

class AllTimeLeaderList(object):
    def __init__(self, url):
        self.url = url
        self.player_list = [] # (Player, StatCount)
        self.html_data = None

        self.fetch_html_data()
        self.scrape_player_list_data()
        self.download_player_data()
    
        print(self.player_list)
        print(len(self.player_list))
    
    def fetch_html_data(self):
        response = requests.get(self.url)
        self.html_data = response.text

    def is_hall_of_fame(raw_name_str):
        return raw_name_str[-1] == '*'
            
    @timer_func
    def scrape_player_list_data(self):
        soup = BeautifulSoup(self.html_data, 'html.parser')
        tables = soup.find_all('table')
        table_rows = tables[0].find_all('tr')

        for i, row in enumerate(table_rows):
            if i > 0:                
                player_endpoint = row.find('a').get('href')
                player_url = f'{BBALL_REF_BASE_URL}{player_endpoint}'
                player = Player(url=player_url)  
                self.player_list.append(player)
    
    @timer_func
    def download_player_data(self):  
        executor = ThreadPoolExecutor(60)
        for player in self.player_list:
            future = executor.submit(player.fetch_html_data)

        if MULTI_PROCESSING:
            with Pool(10) as p:
                self.player_list = p.map(trigger_player_scraping, self.player_list)
        else:
            for player in self.player_list:
                player.scrape_player_data()

class Player(object):
    def __init__(self, url=None, player_id=None):
        self.url = url
        self.player_id = player_id
        self.html_data = None
        self.name = ""
        self.number = None
        self.is_hof = False
        self.nicknames = []

        if not player_id and not url:
            raise ValueError('either player_id or url must be provided')
        elif not player_id:
            self.set_player_id(url)
        else:
            self.set_url(player_id)

    def __repr__(self):
        if self.name:
            return f'{self.name} - {self.nicknames}\n'
        else:
            return self.player_id

    def set_url(self, player_id):
        first_char = player_id[0]
        self.url = f'{BBALL_REF_BASE_URL}/players/{first_char}/{player_id}.html'
        return self

    def set_player_id(self, url):
        self.player_id = url.split('/')[-1].replace('.html', '')
        return self

    def scrape_nicknames(self):
        soup = BeautifulSoup(self.html_data, 'html.parser')        
        pattern = r'\([A-Z].*\)'
        import re
        p_tags = soup.find(id='meta').find_all('p')
        for p in p_tags:
            nicknames = []
            if not re.search(pattern, str(p)):
                continue
            else:
                nicknames_str = p.get_text().replace('\n', '').replace('(','').replace(')','')
                nicknames = nicknames_str.split(', ')
                return nicknames
            
    def create_soup(self):
        self.soup = BeautifulSoup(self.html_data, 'html.parser')

    def scrape_player_data(self):
        
        
        soup = BeautifulSoup(self.html_data, 'html.parser')
        name = soup.find('h1').find('span').get_text()

        pattern = r'\([A-Z].*\)'
        import re
        p_tags = soup.find(id='meta').find_all('p')
        for p in p_tags:
            nicknames = []
            if not re.search(pattern, str(p)):
                continue
            else:
                nicknames_str = p.get_text().replace('\n', '').replace('(','').replace(')','')
                nicknames = nicknames_str.split(', ')
                self.nicknames = nicknames
                break

        # breakpoint()
        self.name = name
        
        print(f'Processing {self.player_id}')
        return self

    def fetch_html_data(self):
        response = requests.get(self.url)
        self.html_data = response.text
        return self


class PointsLeaderList(AllTimeLeaderList):
    def __init__(self) -> None:
        url = "https://www.basketball-reference.com/leaders/pts_career.html"
        super().__init__(url) 

def trigger_player_scraping(player: Player):
    return player.scrape_player_data()

def main():
    points_leaders = PointsLeaderList()

if __name__ == "__main__":
    BBALL_REF_BASE_URL = "https://www.basketball-reference.com"
    MULTI_THREADING = True
    MULTI_PROCESSING = True
    main()
