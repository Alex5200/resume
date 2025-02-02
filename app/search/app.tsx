// src/routes/search.tsx
import React, { useState, useEffect } from 'react';
import { getApps, initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import SitePreviewCard from "../welcome/SitePreviewCard";

// Your web app's Firebase configuration
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

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const db = getDatabase(app);
const starCountRef = ref(db, 'posts');

interface Post {
  Name: string;
  Tags: string[];
  URL: string;
}

export default function Search() {
  const [data, setData] = useState<Record<string, Post>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribe = onValue(starCountRef, (snapshot) => {
      const posts = snapshot.val();
      if (posts) {
        setData(posts);
        console.log(posts);
      } else {
        setData({});
        console.log("No data found");
      }
    });

    // Очистка подписки при размонтировании компонента
    return () => unsubscribe();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const allTags = Array.from(new Set(Object.values(data).flatMap(post => post.Tags || [])));

  const filteredPosts = Object.values(data).filter(post => {
    const nameMatch = post.Name.toLowerCase().includes(searchTerm.toLowerCase());
    const tagMatch = selectedTags.every(tag => post.Tags.includes(tag));
    return nameMatch && tagMatch;
  });

  return (
    <main className="flex flex-col items-center pt-16 pb-4">
      <div className="w-full max-w-6xl px-4">
        <div className="max-w-[300px] w-full space-y-6 px-4">
          <p className="leading-6 text-gray-700 dark:text-gray-200 text-center">
            Поиск проектов
          </p>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Поиск по названию..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="p-2 border rounded-lg w-full"
            />
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`px-2 py-1 rounded-lg text-sm ${selectedTags.includes(tag) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex  flex-wrap gap-4 mt-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <SitePreviewCard
                classSet="mx-auto max-w-[300px] rounded overflow-hidden shadow-lg bg-white"
                key={post.Name}
                title={post.Name}
                description="New"
                siteUrl={post.URL}
                tags={post.Tags}
                img={post.Img}
              />
            ))
          ) : (
            <div className="text-gray-700 dark:text-gray-200">Нет проектов, соответствующих вашему запросу.</div>
          )}
        </div>
      </div>
    </main>
  );
}