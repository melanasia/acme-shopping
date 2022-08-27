from bs4 import BeautifulSoup as BS
import requests
import pandas as pd

names = []
prices = []
images = []
links = []
prod_desc = []
categories_arr = []
genres_arr = []

categories = ['Accessories', 'CD', 'Shirts', 'Sweatshirts', 'Vinyl']
genres = ['Broadway', 'Country', 'EDM', 'Hard Rock', 'Jazz/Blues', 'Pop']

for category in categories:
    for genre in genres:
        url = 'https://www.merchbar.com/search?idx=Merch&dFR%5Bgenre%5D%5B0%5D=' + genre + \
            '&cpt=Ivaly%20Erpbeqf&hMn%5BhierarchicalCategories.lvl0%5D=' + category + '&p=1'

        print(category, genre)
        r = requests.get(url)
        r.encoding = 'utf-8'
        html_content = r.text
        soup = BS(html_content, 'lxml')

        for element in soup.findAll(attrs='MerchTile_textContainer__3ba46'):
            categories_arr.append(category)
            genres_arr.append(genre)

            # get bands
            band = element.find_all(
                'div', {"class": "MerchTile_brandName__GraGd"})[0].text

            # get title
            title = element.find_all(
                'div', {"class": "MerchTile_title__FsnV6"})[0].text.replace('T-Shirt | ', '')

            names.append(band + ' - ' + title)

            # get price
            try:
                price = element.find_all(
                    'span', {"class": ['Price_price__bumLD', 'Price_price__bumLD Price_salePrice__KnHC9']})[0].text
                prices.append(price)
            except IndexError:
                price = 'Out of Stock'
                prices.append(price)

        # get img
        for element in soup.findAll(attrs='MerchTile_imageContainer__esE9p'):
            img = element.find_all('img')[0]['src']
            images.append(img)

        # get links
        for element in soup.findAll(attrs=['MerchTile_merchTile__1glz1 product-tile', 'MerchTile_merchTile__1glz1 product-tile MerchTile_dim__Ip1fB']):
            link = element.find_all('link')[0]['href']
            links.append(link)


# for link in links:
#     print(link)
#     r = requests.get(link)
#     r.encoding = 'utf-8'

#     html_content = r.text
#     soup = BS(html_content, 'lxml')
#     descriptions = soup.find_all('span', {"itemprop": "description"})[
#         0].find_all('span')

#     description = ''
#     for desc in descriptions:
#         description += ' ' + desc.text

#     prod_desc.append(description)


print(len(categories_arr), len(genres_arr), len(names), len(prices),
      len(images), len(prod_desc), len(links))
df = pd.DataFrame({'Category': categories_arr, 'Genre': genres_arr, 'Name': names, 'Cost': prices,
                  'Img': images, 'Link': links})
df.to_csv('product_data.csv', index=False, encoding='utf-8')
