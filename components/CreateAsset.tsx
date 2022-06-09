import {DropzoneComponent} from 'react-dropzone-component';
import ReactMarkdown from 'react-markdown'
import '../node_modules/react-dropzone-component/styles/filepicker.css'
import '../node_modules/dropzone/dist/min/dropzone.min.css'
import { useState } from 'react';
var componentConfig = {
    iconFiletypes: ['.html'],
    showFiletypeIcon: true,
    postUrl: '/uploadHandler'
};

export const CreateAsset:React.FC = () => {
    const [userInput,setInput] = useState('')
    // set userInput text
    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        const target = event.target;
        const value = target.value;
        if (value.length > 200) {
            return 
        }
        setInput(value)
    }
    return (
    <div className="w-screen bg-white min-h-fit  rounded-t-xl p-6 ">
        <div className="max-w-screen-xl m-auto">
            <div className="text-4xl font-bold pt-6 pb-6">
                Upload New BookMark
            </div>
            <div>
                <p className="mb-2 text-base font-bold">Upload your book mark here</p>
                <p className="mb-3  font-semibold text-xs text-slate-400">File types supported: html. Max size: 10 MB</p>
            </div>
            <div className='w-80 h-44'>
            <DropzoneComponent config={componentConfig}
                />
            </div>
            <div>
                <p className='mb-2 mt-2 font-semibold'>Description</p>
                <p className='mb-2 mt-2 font-semibold'>Description</p>
               
                <p className="font-semibold text-xs text-slate-400">The description will be included on the item's detail page underneath its image. Markdown syntax is supported.</p>
                <div className='flex '>
                    <textarea value={userInput} onChange={handleInputChange} className='mt-2 hover:shadow-md outline-0 rounded-lg w-1/2 p-4 resize-y border-2 border-slate-100'></textarea>
                    <ReactMarkdown  className='ml-10 mt-2 max-w-md break-all'>{userInput}</ReactMarkdown>
                </div>
            </div>
        </div>
     
    </div>)
 }