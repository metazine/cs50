import os

from cs50 import SQL
from flask import Flask, flash, jsonify, redirect, render_template, request, session
from flask_session import Session
from tempfile import mkdtemp
from werkzeug.exceptions import default_exceptions, HTTPException, InternalServerError
from werkzeug.security import check_password_hash, generate_password_hash
from datetime import date, datetime

from helpers import apology, login_required, lookup, usd, parseInt

# Configure application
app = Flask(__name__)

# Ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True

# Ensure responses aren't cached
@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

# Custom filter
app.jinja_env.filters["usd"] = usd

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///finance.db")

# Make sure API key is set
if not os.environ.get("API_KEY"):
    raise RuntimeError("API_KEY not set")


@app.route("/")
@login_required
def index():
    """Show portfolio of stocks"""
    share_count_sums = db.execute("""
        SELECT  stock_id, SUM(share_count) AS share_count_sum
          FROM  trade
         WHERE  user_id IS ?
         GROUP  BY stock_id
        HAVING  share_count_sum > 0
        """, 
        session["user_id"]
    )

    cash = db.execute("SELECT cash FROM user WHERE id IS ?", session["user_id"])[0]["cash"]
    stocks = [{}]
    overall_value = cash

    for share_count_sum in share_count_sums:
        stock  = db.execute("SELECT name, symbol FROM stock WHERE id IS ?", share_count_sum["stock_id"])[0]

        price = lookup(stock["symbol"])["price"]

        total_stock_price =  price * share_count_sum["share_count_sum"]
        overall_value += total_stock_price;
        
        stock["unit_price"] = price
        stock["total_price"] =  total_stock_price
        stock["shares_owned"] = share_count_sum["share_count_sum"]

        stocks.append(stock)
    
    stocks.pop(0)
    if len(stocks) == 0:
        return redirect("/buy")
    
    return render_template("home.html", stocks=stocks, overall_value=overall_value, cash=cash)


@app.route("/buy", methods=["GET", "POST"])
@login_required
def buy():
    """Buy shares of stock"""
    if request.method == "POST":
        symbol = request.form.get("symbol")
        stock_amount_text = request.form.get("amount")

        if not symbol:
            return apology("Symbol not given")
        if not stock_amount_text:
            return apology("Amount not given")
        
        stock_amount = parseInt(stock_amount_text)
        if not stock_amount:
            return apology("amount is not an integer")
        if stock_amount < 1:
            return apology("Amount of stock bought must be one or more")

        stock = lookup(symbol)

        if not stock:
            return apology("Unknown stock symbol")
        
        is_stock_name_already_in_table = len(db.execute("SELECT (name) FROM stock WHERE name IS ?", stock["name"])) > 0
        
        if not is_stock_name_already_in_table:
            db.execute("INSERT INTO stock (name, symbol) VALUES (?, ?);", stock["name"], stock["symbol"])

        user_cash = db.execute("SELECT cash FROM user where id IS ?", session["user_id"])[0]["cash"]
        total_price = stock["price"] * stock_amount

        if user_cash - total_price < 0:
            return apology("not enough cash")
        else:
            user_cash -= total_price
             
        db.execute("UPDATE user SET cash = (?) WHERE id IS (?)", user_cash, session["user_id"])

        stock_id = db.execute("SELECT id FROM stock WHERE name IS (?)", stock["name"])[0]["id"]

        date_time = datetime.now().strftime("%d/%m/%y %H:%M:%S")
        db.execute("INSERT INTO trade (date_time, share_count, stock_id, user_id) VALUES (?, ?, ?, ?)", date_time, stock_amount, stock_id, session["user_id"])

        return redirect("/")

    else:
        return render_template("buy_request.html") 

@app.route("/history")
@login_required
def history():
    """Show history of transactions"""
    trades = db.execute("SELECT * FROM trade WHERE user_id IS ? ORDER BY date_time DESC", session["user_id"])
    
    try:
        trades[0]
    except:
        return apology("You have made no trades yet")

    for i in range(len(trades)):
        trades[i]["stock"] = db.execute("SELECT name, symbol FROM stock WHERE id IS ?", trades[i]["stock_id"])[0]
        trades[i]["bought_or_sold"] = "bought" if trades[i]["share_count"] > 0 else "sold"
        trades[i]["share_count"] = abs(trades[i]["share_count"])
    
    return render_template("history.html", trades=trades)

@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":

        # Ensure username was submitted
        if not request.form.get("username"):
            return apology("must provide username", 403)

        # Ensure password was submitted
        elif not request.form.get("password"):
            return apology("must provide password", 403)

        # Query database for username
        rows = db.execute("SELECT * FROM user WHERE username = :username",
                          username=request.form.get("username"))

        # Ensure username exists and password is correct
        if len(rows) != 1 or not check_password_hash(rows[0]["hash"], request.form.get("password")):
            return apology("invalid username and/or password", 403)

        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]

        # Redirect user to home page
        return redirect("/")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("login.html")


@app.route("/logout")
def logout():
    """Log user out"""

    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/")


@app.route("/quote", methods=["GET", "POST"])
@login_required
def quote():
    """Get stock quote."""
    
    if request.method == "POST":
        symbol = request.form.get("symbol")

        if not symbol:
            return apology("No symbol given")

        print(lookup("NFLX"))
        quote = lookup(symbol)

        if not quote:
            return apology("unknown symbol")

        return render_template("quote_results.html", name=quote["name"], symbol=quote["symbol"], price=quote["price"])
        
    else:
        return render_template("quote.html")

@app.route("/register", methods=["GET", "POST"])
def register():
    """Register user"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":
        # Ensure username was submitted
        if not request.form.get("username"):
            return apology("must provide username", 403)
           
        # Ensure password was submitted
        elif not request.form.get("password"):
            return apology("must provide password", 403)

        elif not request.form.get("password_check"):
            return apology("You must enter your password twice")

        username = request.form.get("username")
        password = request.form.get("password")
        password_check = request.form.get("password_check")

        if password != password_check:
            return apology("passwords must match", 403)

        if len(username) > 50: 
            return apology("username is too long", 403)

        password_hash = generate_password_hash(password)
        db.execute("INSERT INTO user (username, hash) VALUES (?, ?)", username, password_hash)

        # Redirect user to home page
        return redirect("/login")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("register.html")


@app.route("/sell", methods=["GET", "POST"])
@login_required
def sell():
    """Sell shares of stock"""
    if request.method == "POST":
        symbol = request.form.get("symbol")
        shares_to_be_sold_count_text = request.form.get("amount")

        if not symbol:
            return apology("Symbol not given")
        if not shares_to_be_sold_count_text:
            return apology("Amount not given")
        
        shares_to_be_sold_count = parseInt(shares_to_be_sold_count_text)
        if not shares_to_be_sold_count:
            return apology("amount is not an integer")
        if shares_to_be_sold_count < 1:
            return apology("Amount of shares sold must be greater than zero")

        stock = db.execute("SELECT SUM(share_count) AS share_count_sum, stock_id FROM trade WHERE stock_id IS (SELECT id FROM stock WHERE symbol IS ?)", symbol)

        if stock[0]["share_count_sum"] - shares_to_be_sold_count < 0:
            return apology("You don't have enough shares to sell")

        if len(stock) == 0:
            return apology("You don't own any of that stock")

        stock[0]["price"] = lookup(symbol)["price"]
        user_cash = db.execute("SELECT cash FROM user WHERE id IS ?", session["user_id"])[0]["cash"]
        user_cash += stock[0]["price"] * shares_to_be_sold_count

        date_time = datetime.now().strftime("%d/%m/%y %H:%M:%S")
        db.execute("INSERT INTO trade (date_time, share_count, stock_id, user_id) VALUES (?, ?, ?, ?)", date_time, -shares_to_be_sold_count, stock[0]["stock_id"], session["user_id"])
        db.execute("UPDATE user SET cash = (?) WHERE id IS (?)", user_cash, session["user_id"])        
        return redirect("/")

    return render_template("sell.html")
       

def errorhandler(e):
    """Handle error"""
    if not isinstance(e, HTTPException):
        e = InternalServerError()
    return apology(e.name, e.code)


# Listen for errors
for code in default_exceptions:
    app.errorhandler(code)(errorhandler)
