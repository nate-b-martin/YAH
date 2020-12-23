import React from "react";
import MainContent from '../../components/MainContent';
import content from '../../pageContent/galleryPageContent';

const Gallery:React.FC = (props) => {
  return (
    <MainContent
      title={content.title}
      mainContent={content.mainContent}
    />
  );
};

export default Gallery;
