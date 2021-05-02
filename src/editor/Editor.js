import React, {useState, useRef, useEffect} from 'react';
import ReactQuill from 'react-quill';
import debounce from '../helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';





const Editor = ({selectedNote,selectedNoteIndex,notes,classes, noteUpdate}) => {

     const [text, setText] =  useState(selectedNote.body);
     const [title , setTitle] =  useState(selectedNote.title);
     const [id, setId] =  useState(selectedNote.id);
     
     const updateBody = async(val) => {

       await setText(val);
        update();

     };


    
    
     const updateTitle = async (txt) => {
        await setTitle(txt);
        update();
      }

      
     const update = useRef(debounce(() => {
       
        noteUpdate(id, {title: title,  text: text })

     }, 1500)).current;


     

     useEffect(() => {
        setTitle(selectedNote.title);
        setText(selectedNote.body);
        setId(selectedNote.id) ;
       
  
       },[selectedNote]);

      
   

     

     

     


    return (
        <div className={classes.editorContainer}>
            <ReactQuill value = {text} onChange={(val) => updateBody(val)}></ReactQuill>
            
        </div>
    )
}

export default withStyles(styles)(Editor) ;
