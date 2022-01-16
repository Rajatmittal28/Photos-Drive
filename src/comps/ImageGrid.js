import React , {useState} from 'react';
import useFirestore from "../hooks/useFirestore";
import { projectStorage, projectFirestore } from '../firebase/DemoConfig';
import { motion } from "framer-motion";
import Fade from "react-reveal/Fade";
import firebase from "firebase";
import { saveAs } from 'file-saver'

const ImageGrid = ({ setSelectedImg }) => { 

    const[logedUser_id,setLogedUser_id] = useState();
    
    // setting current signed user's id
    firebase.auth().onAuthStateChanged(user=>{
        if(user){
            setLogedUser_id(user.uid);
        }
        else
            setLogedUser_id();
    }); 

    const { docs } = useFirestore('images');

    // storing only those images which are uploded by current Signedin user
    let pics = []
    docs.map(doc=>{
        if(doc.userid === logedUser_id)
            pics.push(doc);
        return pics;
    })

    // delete function for deleting a uploded image
    const deleteClick = (_pic) => {

        const _url = _pic.url;
        const _id = _pic.id;

        // deleting from firebase database
        projectFirestore.collection('images').doc(_id).delete()
        .then(()=>console.log("successfully deleted from firestore database! "))
        .catch((err)=> console.log("Error removing document:", err))

        // deleting from firebase storage
        projectStorage.refFromURL(_url).delete()
        .then(()=>console.log("file deleted from storage"))
        .catch((err)=>console.log("Error removing document: "+err))

    }

    // download function 
    const downloadClick = (_pic) => {
        const _url = _pic.url;
        saveAs(_url, 'image.jpg') 
    }

    return (
        <div className="img-grid">
            {pics && pics.map(pic => (                
                <Fade left cascade key={pic.id}>
                <div>
                    <div className="img-wrap"  onClick={() => setSelectedImg(pic.url)}>
                        <motion.img src={pic.url} alt="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} />
                    </div>
                    <div className="btn-group" role="group" aria-label="Basic mixed styles example" >
                        <button type="button" className="btn btn-danger"  onClick={() => deleteClick(pic)}    style={{margin:"5px 5px"}} >Delete</button>
                        <button type="button" className="btn btn-success" onClick={() => downloadClick(pic)}  style={{margin:"5px 5px 5px 225px"}} >Download</button>
                    </div>
                </div>
                    
                </Fade>
            ))}
        </div>
    )
}

export default ImageGrid

