from flask import Flask, render_template, request, redirect, url_for, flash, session
import sqlite3
import os
from werkzeug.security import generate_password_hash, check_password_hash

# ========================
# APP CONFIGURATION
# ========================
app = Flask(
    __name__,
)
app.secret_key = "your_secret_key"  # Needed for sessions and flash messages

# ========================
# DATABASE SETUP
# ========================
DB_NAME = os.path.join(os.path.dirname(__file__), "database.db")  # correct DB path

def init_db():
    """Create users table if it doesn't exist."""
    with sqlite3.connect(DB_NAME) as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL
            )
        """)
    print("✅ Database initialized successfully.")

init_db()

# ========================
# ROUTES
# ========================

@app.route('/')
def home():
    return render_template('signin.html')

@app.route('/signin.html')
def signin_html_redirect():
    return redirect(url_for('signin_page'))

@app.route('/signin')
def signin_page():
    return render_template('signin.html')
@app.route('/signup')
def signup_page():
    return render_template('signup.html')

@app.route('/signup.html')
def signup_html_redirect():
    return redirect(url_for('signup_page'))


# ------------------------
# SIGNUP FUNCTIONALITY
# ------------------------
@app.route('/register', methods=['POST'])
def register_user():
    name = request.form['name']
    email = request.form['email']
    password = request.form['password']

    hashed_password = generate_password_hash(password)

    try:
        with sqlite3.connect(DB_NAME) as conn:
            conn.execute(
                "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
                (name, email, hashed_password)
            )
            conn.commit()
        flash("✅ Account created successfully! Please sign in.", "success")
        return redirect(url_for('signin_page'))
    except sqlite3.IntegrityError:
        flash("⚠️ Email already registered. Please try another one.", "error")
        return redirect(url_for('signup_page'))

# ------------------------
# SIGNIN FUNCTIONALITY
# ------------------------
@app.route('/login', methods=['POST'])
def login_user():
    email = request.form['email']
    password = request.form['password']

    with sqlite3.connect(DB_NAME) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
        user = cursor.fetchone()

    if user and check_password_hash(user[3], password):
        session['user_id'] = user[0]
        session['user_name'] = user[1]
        flash(f"Welcome back, {user[1]}!", "success")
        return redirect(url_for('dashboard'))
    else:
        flash("❌ Invalid email or password. Please try again.", "error")
        return redirect(url_for('signin_page'))

# ------------------------
# DASHBOARD (AFTER LOGIN)
# ------------------------
@app.route('/dashboard')
def dashboard():
    if 'user_id' not in session:
        flash("Please log in first.", "warning")
        return redirect(url_for('signin_page'))
    return render_template('home2.html', name=session['user_name'])

# ------------------------
# LOGOUT
# ------------------------
@app.route('/logout')
def logout():
    session.clear()
    flash("You have been logged out.", "info")
    return redirect(url_for('signin_page'))

# ========================
# RUN APP
# ========================
if __name__ == "__main__":
    app.run(debug=True)
