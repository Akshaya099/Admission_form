from flask import Flask, render_template, redirect, url_for, request, session

app = Flask(__name__)
app.secret_key = 'your_secret_key'

# In-memory storage for users (you can replace this with a database)
users_db1 = {}

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        
        # Check if user already exists
        if email in users_db1:
            return 'User already exists. Please log in.'
        
        # Store user details (password is stored in plain text here)
        users_db1[email] = password
        
        # Redirect to form page after signup
        session['email'] = email
        return redirect(url_for('index'))
    
    return render_template('signup.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        
        # Check if the user exists and the password matches
        if email in users_db1 and users_db1[email] == password:
            session['email'] = email
            return redirect(url_for('index'))
        else:
            return 'Invalid credentials. Please try again.'
    
    return render_template('login.html')

@app.route('/index', methods=['GET', 'POST'])
def index():
    if 'email' not in session:
        return redirect(url_for('login'))
    
    if request.method == 'POST':
        return redirect(url_for('submit'))
    
    return render_template('index.html')

@app.route("/submit", methods=["POST"])
def submit():
    if request.method == "POST":
        form_data = {
            "name": request.form.get("name"),
            "email": request.form.get("email"),
            "phone": request.form.get("phone"),
            "course": request.form.get("course"),
            "gender": request.form.get("gender"),
            "nationality": request.form.get("nationality"),
            "previous_school": request.form.get("previous_school"),
            "percentage": request.form.get("percentage"),
            "city": request.form.get("city"),
            "state": request.form.get("state")
        }
        return render_template("submit.html", form_data=form_data)

if __name__ == '__main__':
    app.run(debug=True)
