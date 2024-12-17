from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Temporary in-memory user data (replace with a database for production)
users = {}

@app.route("/", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password")
        
        # Check if user exists and password matches
        if email in users and users[email] == password:
            return redirect(url_for("index"))
        else:
            return "Invalid login credentials. Please try again."
    
    return render_template("login.html")

@app.route("/signup", methods=["GET", "POST"])
def signup():
    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password")
        
        # Check if user already exists
        if email in users:
            return "User already exists. Please log in."
        else:
            users[email] = password
            return redirect(url_for("login"))
    
    return render_template("signup.html")

@app.route("/form", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        # Process form data
        name = request.form.get("name")
        dob = request.form.get("dob")
        email = request.form.get("email")
        phone = request.form.get("phone")
        address = request.form.get("address")
        parent = request.form.get("parent")
        grade = request.form.get("class")
        school = request.form.get("school")
        
        return (f"Admission Form Submitted!<br>"
                f"Name: {name}<br>Date of Birth: {dob}<br>Email: {email}<br>"
                f"Phone: {phone}<br>Address: {address}<br>"
                f"Parent/Guardian: {parent}<br>Class: {grade}<br>"
                f"Previous School: {school}")
    
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)
