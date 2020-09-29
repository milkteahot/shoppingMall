// import React from 'react'
// import { Server } from 'https';

// class UploadAdapter {
//     constructor(loader) {
//         this.loader = loader;
//     }

//     upload() {
//         server.onUploadProgress( data => {
//             loader.uploadTotal = data.total;
//             loader.uploaded = data.uploaded;
//         } );

//         // Return a promise that will be resolved when the file is uploaded.
//         return loader.file
//             .then( file => server.upload( file ) );
//     }

//     // Aborts the upload process.
//     abort() {
//         // Reject the promise returned from the upload() method.
//         server.abortUpload();
//     }
// }

// export default UploadAdapter
