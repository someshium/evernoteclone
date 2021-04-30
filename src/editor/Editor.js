import React, {useState, useRef} from 'react';
import ReactQuill from 'react-quill';
import debounce from '../helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';





const Editor = (props) => {

     const [text, setText] =  useState('');
     const [title , setTitle] =  useState('');
     const [id, setId] =  useState('');
     
     const updateBody = async(val) => {

       await setText(val);
        update();

     };

    const update = useRef(debounce(() => {
        // come back again later
        console.log("UPDATING DATABASE");
     }, 1500)).current;
     
    const {classes} = props
    return (
        <div className={classes.editorContainer}>
            <ReactQuill value = {text} onChange={updateBody}></ReactQuill>
            
        </div>
    )
}

export default withStyles(styles)(Editor) ;
