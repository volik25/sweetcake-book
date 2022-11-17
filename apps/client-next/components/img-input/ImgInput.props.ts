export interface ImgInputProps {
  className?: string;
  onChange: (data: UploadedFile) => void;
  imgSrc?: string;
}

export interface UploadedFile {
  imgFile?: File;
  imgSrc: string;
}
