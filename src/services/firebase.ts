import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
	apiKey: "AIzaSyBHWMp0UFiWUzSOV3LBwHhoi7hgIcxN7Z0",
	authDomain: "jnjgo-874dc.firebaseapp.com",
	projectId: "jnjgo-874dc",
	storageBucket: "jnjgo-874dc.appspot.com",
	messagingSenderId: "13678870101",
	appId: "1:13678870101:web:d089a6c18ecc44c8d99edc",
	measurementId: "G-V2QM2CM7CG",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

export { storage }
