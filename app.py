from flask import Flask, jsonify, request

app = Flask(__name__)

notes = []  # Temporary in-memory storage for notes

@app.route('/notes', methods=['GET'])
def get_notes():
    return jsonify(notes)

@app.route('/notes', methods=['POST'])
def add_note():
    note = request.json
    notes.append(note)
    return jsonify({'message': 'Note added successfully'})

@app.route('/notes/<int:note_id>', methods=['DELETE'])
def delete_note(note_id):
    for note in notes:
        if note['id'] == note_id:
            notes.remove(note)
            return jsonify({'message': 'Note deleted successfully'})
    return jsonify({'message': 'Note not found'})

if __name__ == '__main__':
    app.run()
