import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";



const firebaseConfig = {
    apiKey: "AIzaSyDy3huu8PKT4vbwFtegGRFQC78rzVsF0zE",
    authDomain: "hatbazar-85237.firebaseapp.com",
    projectId: "hatbazar-85237",
    storageBucket: "hatbazar-85237.firebasestorage.app",
    messagingSenderId: "562290198433",
    appId: "1:562290198433:web:b3c7c3430e59ec1fe0ade0",
    measurementId: "G-V6KWK9WL5C"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById("productForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const image = document.getElementById("image").value;
  const description = document.getElementById("description").value;

  try {
    await addDoc(collection(db, "Products"), {
      name,
      price,
      image,
      description,
      createdAt: new Date()
    });

    alert("পণ্য সফলভাবে যোগ হয়েছে!");
    form.reset();

  } catch (error) {
    alert("সমস্যা হয়েছে: " + error.message);
  }
});
