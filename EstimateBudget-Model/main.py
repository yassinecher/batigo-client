from flask import Flask, request, jsonify, send_file
import joblib
import pandas as pd
import numpy as np
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "http://localhost:4200"}})# You may restrict to localhost:4200 if needed

# Load the model, scaler, and mappings
model = joblib.load('decision_tree_model.joblib')
scaler = joblib.load('scaler.joblib')
type_projet_mapping = joblib.load('type_projet_mapping.joblib')
conditions_meteo_mapping = joblib.load('conditions_meteo_mapping.joblib')

# --- Global CORS settings ---
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:4200')  # or specific origin
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
    return response
import time
# --- Single route for both OPTIONS and POST ---
@app.route('/predict', methods=['POST', 'OPTIONS'])
def predict():
    if request.method == 'OPTIONS':
        # CORS preflight request handling
        return '', 200

    try:
        print("Raw data:", request.data)
        print("Headers:", request.headers)

        if request.data:
            data = request.get_json(force=True)
            print("Parsed data:", data)
            # Extract and encode features
            type_projet = data.get('type_projet')

            budget_estime = float(data.get('budget_estime'))
            duree_estimee = float(data.get('duree_estimee'))
            incident_qualite = int(data.get('incident_qualite'))
            incident_securite = int(data.get('incident_securite'))
            materiaux_defectueux = float(data.get('materiaux_defectueux'))
            conditions_meteo = data.get('conditions_meteo')

            type_projet_code = type_projet_mapping.get(type_projet)
            conditions_meteo_code = conditions_meteo_mapping.get(conditions_meteo)

            if type_projet_code is None or conditions_meteo_code is None:
                return jsonify({
                                   'error': f'Invalid categorical value. type_projet: {list(type_projet_mapping.keys())}, conditions_meteo: {list(conditions_meteo_mapping.keys())}'}), 400

            # Create feature DataFrame
            features = pd.DataFrame({
                'type_projet': [type_projet_code],
                'budget_estime': [budget_estime],
                'duree_estimee': [duree_estimee],
                'incident_qualite': [incident_qualite],
                'incident_securite': [incident_securite],
                'materiaux_defectueux': [materiaux_defectueux],
                'conditions_meteo': [conditions_meteo_code]
            })

            # Scale features
            features_scaled = scaler.transform(features)

            # Make prediction
            prediction = model.predict(features_scaled)[0]
            prediction = round(prediction, 2)
            return jsonify({'prediction': prediction})
        else:
            print("No data received")


    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/export_tree', methods=['GET'])
def export_tree():
    try:
        file_type = request.args.get('type', 'png')
        if file_type == 'png':
            file_path = 'decision_tree.png'
            return send_file(file_path, mimetype='image/png')
        elif file_type == 'svg':
            file_path = 'decision_tree.svg'
            return send_file(file_path, mimetype='image/svg+xml')
        elif file_type == 'dot':
            file_path = 'decision_tree.dot'
            return send_file(file_path, mimetype='text/plain')
        else:
            return jsonify({'error': 'Invalid file type. Use "png", "svg", or "dot"'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)