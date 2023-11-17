import React, { ChangeEvent, FormEvent, useState } from "react";
import { storage } from "@/utils/Firebase/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const AddProduct = () => {
  const [product, setProduct] = useState({
    productName: "",
    price: 0,
    description: "",
    ingredient: "",
    allergy: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");

  const handleSetProduct = (key: string, value: string) => {
    setProduct({ ...product, [key]: value });
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      alert("画像ファイルを選択してください。");
      return;
    }

    const storageRef = ref(storage, `images/${file.name}`);

    try {
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log("Uploaded a blob or file!", downloadURL);

      const res = await fetch("/api/product/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...product, downloadURL }),
      });
      if (res.status === 200) {
        console.log("DBへの登録に成功");
      } else {
        throw new Error("DBへの登録中にエラーが発生しました。");
      }
    } catch (error) {
      console.error("Upload failed", error);
      alert("画像のアップロードに失敗しました。");
    }
  };

  return (
    <>
      <div>
        <h1>商品登録</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="productName">
            料理名
            <input
              id="productName"
              type="text"
              placeholder="料理名を入力"
              onChange={(e) => handleSetProduct("productName", e.target.value)}
            />
          </label>
          <label htmlFor="price">
            価格
            <input
              id="price"
              type="number"
              placeholder="価格を入力"
              onChange={(e) => handleSetProduct("price", e.target.value)}
            />
          </label>
          <label htmlFor="description">
            料理説明
            <textarea
              id="description"
              placeholder="説明を入力"
              onChange={(e) => handleSetProduct("description", e.target.value)}
            />
          </label>
          <label id="ingredient">
            食材項目
            <input
              type="text"
              placeholder="食材項目を入力"
              onChange={(e) => handleSetProduct("ingredient", e.target.value)}
            />
          </label>
          <label id="allergy">
            アレルギー項目
            <input
              type="text"
              placeholder="アレルギー項目を入力"
              onChange={(e) => handleSetProduct("allergy", e.target.value)}
            />
          </label>
          <label htmlFor="image">
            画像
            <input type="file" onChange={handleFileChange} />
            {imagePreviewUrl && <img src={imagePreviewUrl} alt="Preview" style={{ width: "10%", height: "auto" }} />}
          </label>
          <button type="submit">追加</button>
        </form>
      </div>
    </>
  );
};
