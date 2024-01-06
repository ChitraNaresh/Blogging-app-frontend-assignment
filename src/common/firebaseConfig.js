import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
apiKey: "AIzaSyBd9yOXLtIUtDAcKyBshgeVdIF3DlKweAA",
authDomain: "blogging-website-8a2ca.firebaseapp.com",
projectId: "blogging-website-8a2ca",
storageBucket: "blogging-website-8a2ca.appspot.com",
messagingSenderId: "63684574156",
appId: "1:63684574156:web:f6d21eeb919dab21697b69"
};

const app = initializeApp(firebaseConfig);
const imgDB=getStorage(app)
export {imgDB}