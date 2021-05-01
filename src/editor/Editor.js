import React, {useState, useRef, useEffect} from 'react';
import ReactQuill from 'react-quill';
import debounce from '../helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';





const Editor = ({selectedNote,selectedNoteIndex,note,classes, noteUpdate}) => {

     const [text, setText] =  useState('');
     const [title , setTitle] =  useState('');
     const [id, setId] =  useState('');
     
     const updateBody = async(val) => {

       await setText(val);
        update();

     };


     const update = useRef(debounce(() => {
        
        noteUpdate(selectedNote.id, {ntitle: selectedNote.title,  ntext:selectedNote.text })

     }, 1500)).current;

    
     
   

   
   

     useEffect(() => {
      setTitle(selectedNote.title);
      setText(selectedNote.body);
      setId(selectedNote.id) ;
     

     },[selectedNote]);

     

     


    return (
        <div className={classes.editorContainer}>
            <ReactQuill value = {text} onChange={updateBody}></ReactQuill>
            
        </div>
    )
}

export default withStyles(styles)(Editor) ;
