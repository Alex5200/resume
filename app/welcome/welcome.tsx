import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, onValue } from "firebase/database";
import { useState, useEffect } from 'react';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxe06_PvCnsGur9Hiq1LPQgOUrHrpj3jA",
  authDomain: "resumealexandrlyachov.firebaseapp.com",
  databaseURL: "https://resumealexandrlyachov-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "resumealexandrlyachov",
  storageBucket: "resumealexandrlyachov.firebasestorage.app",
  messagingSenderId: "744457673810",
  appId: "1:744457673810:web:a64eba7aa208be5cbb538b",
  measurementId: "G-9S506JWFG8"
};

interface Post {
  name: string;
  url: string;
}

export function Welcome() {
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getDatabase(app);
  const starCountRef = ref(db, 'posts');
  const [data, setData] = useState({});

  useEffect(() => {
    onValue(starCountRef, (snapshot) => {
      const posts = snapshot.val();
      setData(posts);
    });
  }, [starCountRef]);

  console.log(db)
  console.log(analytics)

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <div className="max-w-[300px] w-full space-y-6 px-4">
          <p className="leading-6 text-gray-700 dark:text-gray-200 text-center">
            Мои проекты
          </p>
          {Object.keys(data).length > 0 && (
            <div className="flex">
              {Object.keys(data).map((key) => (
                <div key={key} className="flex flex-col items-center gap-4">
                  <p className="text-gray-700 dark:text-gray-200">Name {data[key].Name}</p>
                  <p className="text-gray-700 dark:text-gray-200">URL {data[key].URL}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}