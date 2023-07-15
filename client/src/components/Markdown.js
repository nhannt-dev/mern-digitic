import { memo, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'

const apiKey = process.env.REACT_APP_TINYMCE

const Markdown = ({ label, value, changeValue, name, invalid, setInvalid }) => {
    return (
        <div className='flex flex-col'>
            <span>{label}</span>
            <Editor
                apiKey={apiKey}
                initialValue={value}
                init={{
                    height: 500,
                    menubar: true,
                    plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss',
                    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                }}
                onChange={e => changeValue(prev => ({ ...prev, [name]: e.target.getContent() }))}
                onFocus={() => setInvalid && setInvalid([])}
            />
            {invalid?.some(el => el.name === name) && <small className='text-main text-sm'>{invalid?.find(el => el.name === name)}?.mes</small>}
        </div>
    )
}

export default memo(Markdown)