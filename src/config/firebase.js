import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const app = initializeApp({
  apiKey: "AIzaSyBjX2eRB7w9qNLZYBkkXIcg4IDQZo_kwNw",
  authDomain: "patient-record-system-21212.firebaseapp.com",
  projectId: "patient-record-system-21212",
  storageBucket: "patient-record-system-21212.appspot.com",
  messagingSenderId: "638707582975",
  appId: "1:638707582975:web:3dbfed273202a7411649ca"
});

// Initialize Firebase
// export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = initializeFirestore(app, {
	experimentalForceLongPolling: true,
});
export default app;
