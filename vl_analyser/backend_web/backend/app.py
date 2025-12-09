from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from models import db, ScanResult
from nmap_scan import run_nmap_scan
from predict import predict_priority
from zap_scan import run_zap_scan
from wapiti_scan import run_wapiti_scan



app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///scans.db'
db.init_app(app)


@app.route('/scan', methods=['POST', 'OPTIONS'])
def scan():

    if request.method == 'OPTIONS':
        response = make_response('', 204)
        response.headers['Access-Control-Allow-Methods'] = 'POST,OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
        return response
     

    url = request.json.get('url')
    tool = request.json.get('tool')

    if tool == 'nmap':
        result = run_nmap_scan(url)
    elif tool == 'zap':
        result = run_zap_scan(url)
    elif tool == 'wapiti':
         result = run_wapiti_scan(url)

    else:
        return jsonify({'error': 'Unsupported tool'}), 400

    new_scan = ScanResult(url=url, tool=tool, result=str(result))
    db.session.add(new_scan)
    db.session.commit()

    return jsonify({'message': 'Scan completed', 'result': result})

@app.route('/history', methods=['GET'])
def history():
    scans = ScanResult.query.order_by(ScanResult.id.desc()).all()
    return jsonify([{
        'id': s.id,
        'url': s.url,
        'tool': s.tool,
        'result': s.result
    } for s in scans])

@app.route('/lastfive', methods=['GET'])
def lastfive():
    scans = ScanResult.query.order_by(ScanResult.id.desc()).limit(5)
    return jsonify([{
        'id': s.id,
        'url': s.url,
        'tool': s.tool
    } for s in scans])

@app.route('/api/scan-stats', methods=['GET'])
def get_scan_stats():
    zap_count = ScanResult.query.filter_by(tool='zap').count()
    nmap_count = ScanResult.query.filter_by(tool='nmap').count()
    wapiti_count = ScanResult.query.filter_by(tool='wapiti').count()

    data = [
        {"name": "Scans", "ZAP": zap_count, "Nmap": nmap_count, "Wapiti": wapiti_count}
    ]

    return jsonify(data)


@app.route('/api/test-priority', methods=['POST'])
def test_priority():
    data = request.get_json()
    text = data.get("description", "")

    if not text:
        return jsonify({"error": "Missing vulnerability description"}), 400

    try:
        priority = predict_priority(text)
        return jsonify({"priority": priority})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/predict_priority", methods=["POST"])
def predict_api():
    data = request.json
    vuln_type = data.get("type")
    score = data.get("score")
    if not vuln_type or score is None:
        return jsonify({"error": "Missing 'type' or 'score'"}), 400
    priority = predict_priority(vuln_type, float(score))
    return jsonify({"priority": priority})

if __name__ == '__main__':
    app.run(debug=True)