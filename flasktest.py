from flask import Flask, render_template, request, json
import math
import csv
# import dotenv
import os
import requests
from db import DB

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key

app = Flask(__name__)


# dotenv.load_dotenv("./my.env")
key = os.getenv("KEY")
# url = f"https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=AAPL&apikey={key}"
# r = requests.get(url)
# data = r.json()

def get_data_json(url=None):
    if url is None:
        with open("aapl.json", "r") as f:
            data = json.load(f)
            return data
    else:
        # url = f"https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=AAPL&apikey={key}"
        # r = requests.get(url)
        # data = r.json()
        # return data
        pass




total = 0
for i in range(1, 100):
    total += (1/i)

print("totAL:", total)

@app.route("/")
def index():
    return render_template("form.html")


@app.route("/rordor", methods=["GET", "POST"])
def rordor():
    good_deed_num = int(request.form["goodDeedNum"]) if request.method == "POST" else 30
    print(request.form)
    return render_template("rordor.html", noGoodDeeds=good_deed_num, level=good_deed_num // 30)

@app.route("/chess")
def chess():
    return render_template("chess.html")


@app.route("/orbit")
def orbit():
    return render_template("orbit.html")

@app.route("/invest", methods=["GET", "POST"])
def invest():
    return render_template("investment.html")

@app.route("/calculate", methods=["GET", "POST"])
def calculate_return():
    print("YOOO")
    server_data = request.get_json()
    return_pa = server_data["ReturnPA"]
    invest_pa = server_data["InputPA"]
    years = server_data["NoYears"]

    amount = CompoundInterest.calculate_earnings(return_pa, invest_pa, years)
    return_data = {
        "Amount" : amount
    }
    print(amount)
    return json.dumps(return_data)


@app.route("/d3", methods=["GET"])
def d3():
    return render_template("d3test.html")

@app.route("/get_csv", methods=["POST"])
def get_csv():
    # do some csv dict reader shit here
    array = []
    json_result = get_data_json()
    graph_data = json_result["Monthly Time Series"]
    # each key is the date and the value are the prices
    for key in graph_data.keys():
        print(key, type(key))
        array.append({
            "date": key,
            "value": graph_data[key]["4. close"]
        })
    
    print(array)
    return array


@app.route("/get_csv_candle", methods=["post"])
def csv_candle():
    array = []
    json_result = get_data_json()
    graph_data = json_result["Monthly Time Series"]
    # each key is the date and the value are the prices
    for key in graph_data.keys():
        print(key, type(key))
        array.append({
            "Date": key,
            "Open": graph_data[key]["1. open"],
            "Close": graph_data[key]["4. close"],
            "Low": graph_data[key]["3. low"],
            "High": graph_data[key]["2. high"] 
        })
    
    print(array)
    return array


    # with open('jail_data.csv') as csvfile:
    #     reader = csv.DictReader(csvfile)
    #     for line in reader:
    #         array.append(line)
    #     return json.dumps(array)


@app.route("/todo", methods=["post", "get"])
def todo():
    return render_template("todo.html")

@app.route("/add_todo")
def add_todo():
    data = request.get_json()


@app.route("/get_todo")
def get_todo():
    todo = DB.get_records(id)



class CompoundInterest:
    @staticmethod
    def calculate_earnings(return_pa: float, invested_pa: float, no_years: int) -> float:
        total = 0
        earnings_p: int
        for i in range(no_years):
            earnings_p = invested_pa * math.pow((1 + return_pa / 100), i)           
            total += earnings_p
    
        return total

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=2500, debug=True) #, auto_reload=True)