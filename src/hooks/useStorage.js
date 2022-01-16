import {useState, useEffect} from "react";
import {projectStorage, projectFirestore, timestamp} from "../firebase/DemoConfig";
import firebase from "firebase";
//hooks to save the data to firestore

const useStorage = (file) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null); 

    var userid = firebase.auth().currentUser.uid;

    useEffect(() => {
        // for storing file in firebase storage
        const storageRef = projectStorage.ref(file.name); 

        //for storing url of uploded image in firebase database
        const collectionRef = projectFirestore.collection("images"); 

        //adding  file in firebase storage
        storageRef.put(file).on('state_changed', (snap) => {
                let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
                setProgress(percentage);
            }, (err) => {
                setError(err);
            }, async () => {
                
                //getDownloadURL () is a bulitin function that grabs url of downloded image from firbase storage
                const url = await storageRef.getDownloadURL();
                
                // getting time at which the pic was uploded
                const createdAt = timestamp();
                
                
                //adding values about file in firebase database 
                collectionRef.add({ url, createdAt, userid });

                setUrl(url);
            }
        )

    }, [file,userid]);

    return {progress, url, error};
}

export default useStorage;
