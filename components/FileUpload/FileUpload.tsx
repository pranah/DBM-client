import Image from "next/image";

interface FileUploadProp {
  labelName: string;
  isEbookUpload?: boolean;
}

export const FileUpload = ({ labelName, isEbookUpload }: FileUploadProp) => {
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
        tabindex="0"
        htmlFor="upload-photo"
      >
        <input
          style={{ display: "none" }}
          id="upload-photo"
          name="upload-photo"
          type="file"
        />
        {isEbookUpload ? (
          <Image
            width={33}
            height={35}
            src="/images/picture.png"
            alt="explore"
          />
        ) : (
          <Image
            width={33}
            height={35}
            src="/images/upload.png"
            alt="explore"
          />
        )}
        {labelName}
      </label>
    </>
  );
};

FileUpload.defaultProps = {
  isEbookUpload: false,
};

export const SpecialPerksFileUpload = () => {
  return (
    <>
      <label
        style={{
          display: "flex",
          alignItems: "center",
        }}
        tabindex="0"
        htmlFor="upload-photo"
      >
        <input
          style={{ display: "none" }}
          id="upload-photo"
          name="upload-photo"
          type="file"
        />
        Special Perks Upload
        <Image width={30} height={30} src="/images/plus.png" alt="plus" />
      </label>
    </>
  );
};
