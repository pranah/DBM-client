import Image from "next/image";

export const FileUpload = () => {
  return (
    <>
      <label
        style={{
          height: "136px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#F4F4F4",
          border: "1px solid #CCCCCC",
          borderRadius: "10px",
          justifyContent: "center",
        }}
        htmlFor="upload-photo"
      >
        <input
          style={{ display: "none" }}
          id="upload-photo"
          name="upload-photo"
          type="file"
        />
        <Image width={33} height={35} src="/images/upload.png" alt="explore" />
        Upload Ebook file
      </label>
    </>
  );
};
