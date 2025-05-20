import React, { useEffect, useRef } from "react";
import Spinner from 'react-bootstrap/Spinner';
import EditorSkeleton from "../_adminComponents/_skeleton/EditorSkeleton";
function Editor({ onChange, editorLoaded, name, value}) {
    const editorRef = useRef();
    const { CKEditor, ClassicEditor } = editorRef.current || {};

    useEffect(() => {
        editorRef.current = {
            CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
            ClassicEditor: require("@ckeditor/ckeditor5-build-classic")
        };
    }, []);

    return (
        <div>
            {editorLoaded ? (
                <CKEditor
                    type=""
                    name={name}
                    editor={ClassicEditor}
                    config={{
                        toolbar: {
                            items: [
                                'undo', 'redo',
                                '|', 'heading',
                                '|', 'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor',
                                '|', 'bold', 'italic',
                                '|', 'alignment',
                                'link', 'blockQuote', 'codeBlock',
                                '|', 'bulletedList', 'numberedList', 'todoList', 'outdent', 'indent'
                            ],
                            shouldNotGroupWhenFull: true
                        }
                    }}
                    data={value}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        // console.log({ event, editor, data })
                        onChange(data);
                    }}
                />
            ) : (
                <EditorSkeleton />
            )}
        </div>
    );
}

export default Editor;
