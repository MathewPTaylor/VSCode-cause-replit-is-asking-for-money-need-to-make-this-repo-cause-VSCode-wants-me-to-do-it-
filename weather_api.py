import dotenv
import os
import requests
import json

dotenv.load_dotenv("./my.env")
key = os.getenv("WEATHER_KEY")

URL_PROXY = "http://api.weatherapi.com/v1"

path = "/current.json"
location = "London"

final_url = f"{URL_PROXY}{path}?key={key}&q={location}"
print(final_url)


# quit()
r = requests.get(f"{URL_PROXY}{path}?key={key}&q={location}")
print(r)
data = r.json()

with open("weather.json", "w") as f:
    f.write(json.dumps(data))
print(json.dumps(data))
