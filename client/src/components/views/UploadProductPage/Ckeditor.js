import React from 'react'
import CKEditor from '@ckeditor/ckeditor5-react';
import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

ClassicEditor
    .create( document.querySelector( '#editor' ), {
        plugins: [ SimpleUploadAdapter],
        toolbar:['simpleupload'],
        simpleUpload: {
            uploadUrl: '/api/product/image',
            header: { "content-type": "multipart/form-data" },
        }
    } )

function Ckeditor() {
    return (
        <div>
            <CKEditor
            editor = {ClassicEditor}
            data="<p>Hello from CKEditor 5!</p>"
                    onInit={ editor => {
                        // You can store the "editor" and use when it is needed.
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }

            
            />
        </div>
    )
}

export default Ckeditor
