import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../config/firebase.config";
import { collection } from "firebase/firestore";
import { toast } from "react-toastify";

export const getUserDetail = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userData = user.providerData[0];
        const unsubscribe = onSnapshot(
          doc(db, "users", userData?.uid),
          (_doc) => {
            if (_doc.exists()) {
              resolve(_doc.data());
            } else {
              setDoc(doc(db, "users", userData?.uid), userData).then(() => {
                resolve(userData);
              });
            }
          }
        );
        return unsubscribe;
      } else {
        reject(new Error("User not authenticated"));
      }

      unsubscribe();
    });
  });
};

export const getTemplates = () => {
  return new Promise((resolve, reject) => {
    const templateQuery = query(
      collection(db, "templates"),
      orderBy("timeStamp", "asc")
    );

    const unsubscribe = onSnapshot(templateQuery, (querySnap) => {
      const templates = querySnap.docs.map((doc) => doc.data());
      resolve(templates);
    });

    return unsubscribe;
  });
};

export const saveToCollection = async (user, data) => {
  const docRef = doc(db, "users", user?.uid);
  if (!user?.collection?.includes(data?._id)) {
    await updateDoc(docRef, {
      collection: arrayUnion(data?._id),
    })
      .then(() => {
        toast.success("Template added to Collection");
      })
      .catch((error) => {
        toast.error("Error adding template to Collection");
        console.log(error);
      });
  } else {
    await updateDoc(docRef, {
      collection: arrayRemove(data?._id),
    })
      .then(() => {
        toast.success(" Template removed from Collection");
      })
      .catch((error) => {
        toast.error("Error removing template tofrom Collection");
        console.log(error);
      });
  }
};

export const saveToFavourits = async (user, data) => {
  const docRef = doc(db, "templates", data?._id);
  if (!data?.favourits?.includes(user?.uid)) {
    await updateDoc(docRef, {
      favourits: arrayUnion(user?.uid),
    })
      .then(() => {
        toast.success("Template added to Favourits");
      })
      .catch((error) => {
        toast.error("Error adding template to Favourits");
        console.log(error);
      });
  } else {
    await updateDoc(docRef, {
      favourits: arrayRemove(user?.uid),
    })
      .then(() => {
        toast.success(" Template removed from Favourits");
      })
      .catch((error) => {
        toast.error("Error removing template tofrom Favourits");
        console.log(error);
      });
  }
};

export const getTemplateDetails = async (templateId) => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(doc(db, "templates", templateId), (_doc) => {
      if (_doc.exists()) {
        resolve(_doc.data());
      } else {
        reject(new Error("Template not found"));
      }
    });
    return unsubscribe;
  });
};

export const getTemplateDetailEditByUser = (uid, id) => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(
      doc(db, "users", uid, "resumes", id),
      (doc) => {
        resolve(doc.data());
      }
    );

    return unsubscribe;
  });
};

export const getSavedResumes = async (uid) => {
  return new Promise((resolve, reject) => {
    const templateQuery = query(
      collection(db, "users", uid, "resumes"),
      orderBy("timeStamp", "asc")
    );

    const unsubscribe = onSnapshot(templateQuery, (querySnap) => {
      const templates = querySnap.docs.map((doc) => doc.data());
      resolve(templates);
    });

    return unsubscribe;
  });
};
