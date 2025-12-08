function AdImage({ imageUrl }) {
  return (
    <img
      src={imageUrl}
      alt='Advertisement'
      className='w-full h-full object-cover'
    />
  );
}

export default AdImage;
