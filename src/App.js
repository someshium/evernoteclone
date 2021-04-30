import './App.css';
import React, {useState, useEffect} from 'react';
import {projectFirestore} from './firebase/config';
import Editor from './editor/Editor'
import Sidebar from './sidebar/Sidebar'




function App() {
  const firebase = require('firebase') ;

  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null) ;
  const [selectedNote, setSelectedNote] = useState(null) ;
  const [notes, setNotes] = useState(null) ;


  useEffect(() => {
    projectFirestore.collection('notes').onSnapshot( serverUpdate => {
      const notes = serverUpdate.docs.map(doc => {
        const data= doc.data();
        data['id'] = doc.id;
        return data;

      })
      console.log(notes);
      setNotes(notes);

    })

  },[])


    const selectNote = (note, index) => {
      selectedNoteIndex = index;
      selectedNote = note;
    }

    const deleteNote = () => {

    }

    const newNote = () => {
      
    }

  return (
    <div className="App">
     <Sidebar selectedNoteIndex = {selectedNoteIndex} notes= {notes} deleteNote = {deleteNote} selectNote = {selectNote} newNote = {newNote}/>
     <Editor />
    </div>
  );
}

export default App;
