export const drawImage = (image: HTMLImageElement): ImageData => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (context == null) {
    throw new Error("Failed to get context");
  }

  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;

  context.drawImage(image, 0, 0);

  return context.getImageData(0, 0, canvas.width, canvas.height);
};
