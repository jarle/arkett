import ReactQuill from 'react-quill';

export default function ConfiguredEditor(props) {

    return <ReactQuill theme={'bubble'} bounds={`[data-text-editor="arkett-editor"]`} {...props} />;

}