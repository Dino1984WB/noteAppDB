from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

# Create a list to store notes
notes = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/notes', methods=['GET'])
def get_notes():
    return jsonify(notes)

@app.route('/notes', methods=['POST'])
def create_note():
    data = request.get_json()
    note = {
        'id': data['id'],
        'text': data['text']
    }
    notes.append(note)
    return jsonify(note), 201

@app.route('/notes/<int:note_id>', methods=['DELETE'])
def delete_note(note_id):
    for note in notes:
        if note['id'] == note_id:
            notes.remove(note)
            break
    return jsonify({'message': 'Note deleted'})

if __name__ == '__main__':
    app.run()
