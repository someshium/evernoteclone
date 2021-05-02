  
import React,{useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import Sidebaritem from '../sidebaritem/SidebarItem';


const Sidebar = ({selectedNoteIndex, notes, classes, deleteNote, selectNote,newNote}) => {
    const [addingNote, setAddingNote] = useState(false);
    const [title, setTitle] = useState(false);

    const newNoteBtnClick = () => {
        console.log("new btn Clicked");
        setAddingNote(!addingNote); 
        setTitle(null);
    }

    const updateTitle = (txt) => {
        setTitle(txt) ;
    }

    const handleNewNote = () => {
        newNote(title);
        setTitle(null);
        setAddingNote(false);
        
    }

    const handleSelectNote = (note, index) => {
        
        selectNote(note,index) ;  
    }
    
    const handleDeleteNote = (note) => {

        deleteNote(note)
        
    }
    

    return (
        <div className={classes.sidebarContainer}>
            <Button onClick = {newNoteBtnClick} className={classes.newNoteBtn}>{addingNote? "Cancel": "Add Note"}</Button>
           
            {
                addingNote ? 
                <div>
                    <input type="text" className={classes.newNoteInput} placeholder="enter note title" 
                    onKeyUp={(e) => updateTitle(e.target.value)}/>
                     <Button className={classes.newNoteSubmitBtn}
            onClick = {handleNewNote}>Submit Note</Button>
                </div>
                
                : null 
            }
            <List>
                {
                   notes ? notes.map((note, index) => ( 
                        <div key= {index}>
                           <Sidebaritem note = {note} index= {index} selectedNoteIndex = {selectedNoteIndex} selectNote={handleSelectNote} deleteNote={handleDeleteNote}/> 
                           <Divider></Divider>    
                        </div>
                    )) : "Add a Note!"
                }
            </List>
            
            
        </div>
    )
}

export default withStyles(styles)(Sidebar);
