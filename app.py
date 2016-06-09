from flask import Flask, render_template, Response
from datetime import datetime
import json
import subprocess, os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/v1/preview')
def update_preview():
    time = datetime.now()
    filename = "capture-%04d%02d%02d-%02d%02d%02d.jpg" % (time.year, time.month, time.day, time.hour, time.minute, time.second)
    process = subprocess.Popen("/opt/vc/bin/raspistill -w 1296 -h 972 -t 0 -e jpg -q 15 -o ./static/preview/%s" % filename, shell=True)
    process.wait()

    data = {
        'filename': filename
    }
    js = json.dumps(data)
    resp = Response(js, status=200, mimetype='application/json')
    return resp

@app.route('/api/v1/print')
def print_preview():
    return 'Print preview'

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
