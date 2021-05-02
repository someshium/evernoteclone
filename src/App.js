import './App.css';
import React, {useState, useEffect} from 'react';
import {projectFirestore, timestamp} from './firebase/config';
import Editor from './editor/Editor'
import Sidebar from './sidebar/Sidebar'




function App() {
  const firebase = require('firebase') ;

  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null) ;
  const [selectedNote, setSelectedNote] = useState(null) ;
  const [notes, setNotes] = useState(null) ;

  const noteUpdate = (id,noteObj) => {
    
    if(!id) return;
    
    console.log(id, noteObj);

    projectFirestore.collection('notes').doc(id).update({
     title:noteObj.title,
     body: noteObj.text,
     createdAt: timestamp()
   })


  }


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

  },[setNotes])


    const selectNote = (note, index) => {
      setSelectedNoteIndex(index);
      setSelectedNote(note);
    }

    const deleteNote = (note) => {
      const noteIndex = notes.indexOf(note);
      if(selectedNoteIndex === noteIndex){
        setSelectedNoteIndex(null);
        setSelectedNote(null);
      }
      else{

          if(notes.length>1)
          {
            selectNode(notes[selectedNoteIndex-1],selectedNoteIndex-1) 
          }
          else{

            setSelectedNoteIndex(null);
            selectedNote(null);
          }

       
      }



    }

    const newNote = async(title) => {
      const note= {
        title: title,
        body: '',

      };
      const  newFromDB = await projectFirestore.collection('notes').add({title: note.title , body:note.body, createdAt:timestamp() });

      const newID = newFromDB.id
      await setNotes([...notes, note] ) ;
      const newNoteIndex = notes.indexOf(notes.filter(note => note.id === newID)[0])
      setSelectedNote(notes[newNoteIndex])
      setSelectedNoteIndex(newNoteIndex);

      
    } 

  return (
    <div className="App">
     <Sidebar selectedNoteIndex = {selectedNoteIndex} notes= {notes} deleteNote = {deleteNote} selectNote = {selectNote} newNote = {newNote}/>
     {
       selectedNote? <Editor selectedNote={selectedNote} selectedNoteIndex ={selectedNoteIndex} notes={notes} noteUpdate={noteUpdate}/> : null
     }
    </div>
  );
}

export default App;
