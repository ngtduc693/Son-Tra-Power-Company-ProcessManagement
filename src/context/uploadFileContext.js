import React from 'react';
const UploadFileContext = React.createContext({}); 
export const UploadFileProvider = UploadFileContext.Provider;
export const UploadFileConsumer = UploadFileContext.Consumer;
export default UploadFileContext;