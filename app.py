# The MIT License (MIT)
# Copyright (c) 2016 Thibault NORMAND
#
# Permission is hereby granted, free of charge, to any person obtaining a copy of
# this software and associated documentation files (the "Software"), to deal in
# the Software without restriction, including without limitation the rights to
# use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
# of the Software, and to permit persons to whom the Software is furnished to do
# so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
# FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
# COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
# IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
# CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

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
    process = subprocess.Popen("/opt/vc/bin/raspistill -vf -hf -w 1800 -h 1200 -t 1 --no-preview -o ./static/preview/%s" % filename, shell=True)
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
