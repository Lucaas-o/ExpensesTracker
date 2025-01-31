from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def init_db():
    conn = sqlite3.connect('expenses.db')
    c = conn.cursor()
    c.execute('DROP TABLE IF EXISTS expenses')  # This will drop the table if it exists
    c.execute('''
        CREATE TABLE expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            amount REAL NOT NULL,
            date TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

init_db()

@app.route('/api/expenses', methods=['POST'])
def save_expense():
    data = request.json
    expense_name = data['name']
    expense_amount = data['amount']
    expense_date = data['date']

    conn = sqlite3.connect('expenses.db')
    c = conn.cursor()
    c.execute('''
        INSERT INTO expenses (name, amount, date) VALUES (?, ?, ?)
    ''', (expense_name, expense_amount, expense_date,))
    
    conn.commit()
    conn.close()
    return jsonify({"message": "Expense saved successfully"}), 201

if __name__ == '__main__':
    app.run(debug=True)
