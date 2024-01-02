from flask import Flask, render_template, jsonify, request
import flask_socketio
from flask_socketio import SocketIO


app = Flask(__name__)
socketio = SocketIO(app)


@app.route('/')
def index():
        return render_template('car.html')


#디버깅용
def messageReceived(methods=['GET','POST']):
    print('data in')


@socketio.on('connect')
def handle_connect():
    client_id = request.sid  #세션id
    print(f'클라이언트 연결. 세션 ID: {client_id}')


@socketio.on('disconnect')
def handle_disconnect():
    client_id = request.sid
    print(f'클라이언트 연결 해제. 세션 ID: {client_id}')

@socketio.on('sendData')
def handle_send_data(data):
    print('receiced data: ' + str(data))
    socketio.emit('response', data, callback=messageReceived)



if __name__ == '__main__':
    #app.run(debug=False, host='0.0.0.0', port=8052)
    socketio.run(app, debug=False, host='0.0.0.0', port=8052)


