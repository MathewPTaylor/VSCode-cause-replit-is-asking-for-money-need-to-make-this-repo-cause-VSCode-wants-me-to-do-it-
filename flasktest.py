from flask import Flask, render_template, request, json
import math

app = Flask(__name__)

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