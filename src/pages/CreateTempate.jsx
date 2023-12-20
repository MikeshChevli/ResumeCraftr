/* eslint-disable no-unused-vars */
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { Fragment, useEffect, useState } from "react";
import { FaTrash, FaUpload } from "react-icons/fa6";
import { PuffLoader } from "react-spinners";
import { toast } from "react-toastify";
import { db, storage } from "../config/firebase.config";
import { adminId, initialTags } from "../utils/Helpers";
import { deleteDoc, doc, serverTimestamp, setDoc } from "firebase/firestore";
import useTemplates from "../hooks/useTemplates";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

const CreateTempate = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    imageUrl: null,
  });

  const [imageAsset, setImageAsset] = useState({
    isImageloading: false,
    uri: null,
    progess: 0,
  });

  const [selectedtags, setSelectedtags] = useState([]);

  const {
    data: templates,
    isError: templatesIsError,
    isLoading: templatesIsLoading,
    refetch: templatesRefatch,
  } = useTemplates();

  const { data: user, isLoading } = useUser();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileSelect = async (event) => {
    setImageAsset((prevAsset) => ({ ...prevAsset, isImageloading: true }));
    const file = event.target.files[0];

    if (file && isAllowed(file)) {
      const imageRef = ref(storage, `Templates/${Date.now()}-${file.name}`);
      const uploadTask = uploadBytesResumable(imageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progess = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setImageAsset((prevAsset) => ({
            ...prevAsset,
            progess,
          }));
        },
        (error) => {
          if (error.message.includes("storage/unauthorized")) {
            toast.error("You don't have permission to upload images.");
          } else {
            toast.error(`Error: ${error.message}`);
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageAsset((prevAsset) => ({
              ...prevAsset,
              uri: downloadURL,
            }));
            toast.success("Image uploaded successfully.");
            setInterval(() => {
              setImageAsset((prevAsset) => ({
                ...prevAsset,
                isImageloading: false,
              }));
            }, 2000);
          });
        }
      );
    } else {
      toast.info("Please select a valid image file (JPEG, PNG, or JPG).");
    }
  };

  const isAllowed = (file) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    return allowedTypes.includes(file.type);
  };

  const deleteImageObject = async () => {
    const imageRef = ref(storage, imageAsset.uri);
    deleteObject(imageRef).then(() => {
      toast.success("Image deleted successfully.");
      setImageAsset((prevAsset) => ({
        ...prevAsset,
        uri: null,
        progess: 0,
      }));
    });
  };

  const removeTemplate = async (template) => {
    const deleteRef = ref(storage, template?.imageUrl);
    await deleteObject(deleteRef).then(async () => {
      await deleteDoc(doc(db, "templates", template?._id))
        .then(() => {
          toast.success("Template deleted successfully.");
          templatesRefatch();
        })
        .catch((error) => {
          toast.error("Something went wrong!");
          console.log(error);
        });
    });
  };

  const handleSelectedTags = (tag) => {
    if (selectedtags.includes(tag)) {
      setSelectedtags(selectedtags.filter((t) => t !== tag));
    } else {
      setSelectedtags([...selectedtags, tag]);
    }
  };

  const pushToCloud = async () => {
    const timeStamp = serverTimestamp();
    const id = `${Date.now()}`;
    const _doc = {
      _id: id,
      title: formData.title,
      imageUrl: imageAsset.uri,
      tags: selectedtags,
      name:
        templates && templates.length > 0
          ? `Template ${templates.length + 1}`
          : "Template 1",
      timeStamp: timeStamp,
    };
    await setDoc(doc(db, "templates", id), _doc)
      .then(() => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          title: "",
          imageUrl: "",
        }));
        setImageAsset((prevAsset) => ({
          ...prevAsset,
          uri: null,
        }));
        setSelectedtags([]);
        templatesRefatch();
        toast.success("Template created successfully.");
      })
      .catch((error) => {
        toast.error("Something went wrong!");
        console.log(error);
      });
  };

  useEffect(() => {
    if (!isLoading && !adminId.includes(user?.uid)) {
      navigate("/", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoading]);

  return (
    <div className="w-full px-4 lg:px-10 2xl:px-12 py-1 grid grid-cols-1 lg:grid-cols-12">
      <div className="col-span-12 lg:col-span-4 2xl:col-span-3 w-full flex flex-1 flex-col items-center justify-start px-2 gap-4">
        <div className="w-full">
          <p className="text-lg text-txtPrimary">Create a New template</p>
        </div>

        <div className="w-full h-1 flex items-center justify-end">
          <p className="text-base text-txtLight uppercase font-semibold">
            TempId :{" "}
          </p>
          <p className="text-base text-txtDark capitalize font-bold">
            {templates && templates.length > 0
              ? `Template ${templates.length + 1}`
              : "Template 1"}
          </p>
        </div>
        <input
          className="w-full px-4 py-1 rounded-md bg-transparent border border-gray-300 text-lg text-txtPrimary focus:text-txtDark focus:shadow-md outline-none"
          type="text"
          name="title"
          placeholder="Template title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <div className="w-full bg-gray-100 backdrop-blur-md h-[420px]rounded-md border border-gray-300 cursor-pointer flex items-center justify-center">
          {imageAsset.isImageloading ? (
            <Fragment>
              <div className="flex flex-col items-center justify-center h-[420px] gap-4">
                <PuffLoader color="#498fcd" size={40} />
                <p className="text-xl tracking-wider capitalize text-txtPrimary">
                  {imageAsset?.progess.toFixed(2)} %
                </p>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              {!imageAsset?.uri ? (
                <Fragment>
                  <label className=" flex justify-center items-center flex-col w-full cursor-pointer h-[480px]">
                    <FaUpload className="text-2xl" />
                    <p className="text-lg text-txtLight">Click to upload</p>

                    <input
                      type="file"
                      className="w-0 h-0"
                      accept=".jpeg,.jpg,.png"
                      onChange={handleFileSelect}
                    />
                  </label>
                </Fragment>
              ) : (
                <Fragment>
                  <div className="relative w-full h-full overflow-hidden rounded-md">
                    <img
                      src={imageAsset.uri}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      alt=""
                    />
                    <div
                      className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center bg-red-500 cursor-pointer"
                      onClick={deleteImageObject}
                    >
                      <FaTrash className="text-sm text-white" />
                    </div>
                  </div>
                </Fragment>
              )}
            </Fragment>
          )}
        </div>
        <div className="w-full flex items-center flex-wrap gap-2">
          {initialTags.map((tag, index) => (
            <div
              key={index}
              className={`border border-gray-300 px-2 py-2 rounded-md cursor-pointer ${
                selectedtags.includes(tag) ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => handleSelectedTags(tag)}
            >
              <p className="text-xs">{tag}</p>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={pushToCloud}
        >
          Save
        </button>
      </div>
      <div className="col-span-12 lg:col-span-8 2xl:col-span-9 px-2 w-full flex-1 py-4">
        {templatesIsLoading ? (
          <Fragment>
            <div className="flex h-full w-full items-center justify-center">
              <PuffLoader color="#498fcd" size={40} />
            </div>
          </Fragment>
        ) : (
          <Fragment>
            {templates && templates.length > 0 ? (
              <Fragment>
                <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
                  {templates?.map((template) => (
                    <div
                      key={template._id}
                      className="w-full h-[340px] rounded-md overflow-hidden relative"
                    >
                      <img
                        src={template?.imageUrl}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        alt=""
                      />
                      <div
                        className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center bg-red-500 cursor-pointer"
                        onClick={() => {
                          removeTemplate(template);
                        }}
                      >
                        <FaTrash className="text-sm text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </Fragment>
            ) : (
              <Fragment>
                <div className="flex flex-col items-center justify-center gap-4">
                  <PuffLoader color="#498fcd" size={40} />
                  <p className="text-xl tracking-wider capitalize text-txtPrimary">
                    No Data
                  </p>
                </div>
              </Fragment>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default CreateTempate;
