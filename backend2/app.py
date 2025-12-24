from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# In-memory storage for orders and foods
orders = []
foods = []

# Node.js backend URL
NODE_BACKEND_URL = "http://localhost:5002"

@app.route('/api/analytics/users', methods=['GET'])
def get_user_analytics():
    """Get user analytics by calling Node.js backend"""
    try:
        # Get users from Node.js backend
        response = requests.get(f"{NODE_BACKEND_URL}/api/auth/users")
        if response.status_code == 200:
            users = response.json()
            analytics = {
                "total_users": len(users),
                "active_users": len([u for u in users if u.get('isActive', True)]),
                "user_growth": "calculated growth metric"
            }
            return jsonify(analytics)
        else:
            return jsonify({"error": "Failed to fetch users from Node.js backend"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/analytics/orders', methods=['GET'])
def get_order_analytics():
    """Get order analytics"""
    try:
        # Get orders from database
        orders = list(db.orders.find({}, {'_id': 0}))
        analytics = {
            "total_orders": len(orders),
            "pending_orders": len([o for o in orders if o.get('status') == 'Pending']),
            "completed_orders": len([o for o in orders if o.get('status') == 'Completed']),
            "total_revenue": sum(o.get('total', 0) for o in orders)
        }
        return jsonify(analytics)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/analytics/foods', methods=['GET'])
def get_food_analytics():
    """Get food analytics"""
    try:
        # Get foods from in-memory storage
        analytics = {
            "total_foods": len(foods),
            "categories": len(set(f.get('category', 'Uncategorized') for f in foods)),
            "avg_price": sum(f.get('price', 0) for f in foods) / len(foods) if foods else 0
        }
        return jsonify(analytics)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/sync', methods=['POST'])
def sync_data():
    """Sync data between backends"""
    try:
        # Example: Sync user data from Node.js to Python backend
        response = requests.get(f"{NODE_BACKEND_URL}/api/auth/users")
        if response.status_code == 200:
            users = response.json()
            # Process and store in Python backend if needed
            return jsonify({"message": "Data synced successfully", "synced_users": len(users)})
        else:
            return jsonify({"error": "Failed to sync data"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5002)
