export interface ImgInputProps {
  className?: string;
  onChange: (data: { imgFile: File; imgSrc: string }) => void;
  imgSrc?: string;
}
