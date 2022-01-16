import {useState, useEffect} from "react";
import {projectFirestore} from "../firebase/DemoConfig";
//hook to access firestore and render the products

const useFirestore = (collection) => {
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        const unsub = projectFirestore.collection(collection)
            .orderBy('createdAt', 'desc')
            //onsnapshot takes an screenshot of the items present at that very moment and return it to you and whenever a new element is added this function calls itself
            .onSnapshot((snap) => { 
                let documents = [];
                
                snap.forEach((doc) => {
                    documents.push({...doc.data(), id: doc.id});
                });
                
                setDocs(documents);
            });
            return () => unsub();
    }, [collection]);

    return {docs};
} 

export default useFirestore;
