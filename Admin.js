import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "আপনার apiKey",
  authDomain: "আপনার authDomain",
  projectId: "আপনার projectId",
  storageBucket: "আপনার storageBucket",
  messagingSenderId: "আপনার messagingSenderId",
  appId: "আপনার appId"
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
