import { DropzoneComponent } from "react-dropzone-component";
import ReactMarkdown from "react-markdown";
import { useBookMarkParser } from "../hooks/useBookMarkParser";
import "../node_modules/react-dropzone-component/styles/filepicker.css";
import "../node_modules/dropzone/dist/min/dropzone.min.css";
import { create, CID, IPFSHTTPClient } from 'ipfs-http-client'
import { useContext, useEffect, useState } from 'react';
import { ContractContext, UserContext } from '../pages/_app';

let ipfs: IPFSHTTPClient | undefined;
ipfs = create({
    url: 'https://ipfs.infura.io:5001/api/v0',
});
var componentConfig = {
    iconFiletypes: [".html"],
    showFiletypeIcon: true,
    postUrl: "no-url",
};
var djsConfig = { autoProcessQueue: false };

export const CreateAsset: React.FC = () => {
    const [userInput, setInput] = useState("");
    const { bookMarkJson, setBuffer } = useBookMarkParser("");
    const [ipfsHash, setIpfsHash] = useState("");
    const contract = useContext(ContractContext);
    const user = useContext(UserContext);
    // set userInput text
    console.log('contract',contract)
    const handleInputChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ): void => {
        const target = event.target;
        const value = target.value;
        if (value.length > 200) {
            return;
        }
        setInput(value);
    };
     // upload post to blockchain
    const uploadBookMark = async () => {
        contract.uploadPost(ipfsHash, userInput)
    }
     // Upload post to IPFS
    const eventHandlers = {
        addedfile: async (file: any) => {
            const reader = new FileReader();
            reader.onload = (fileLoadedEvent) => {
                if (fileLoadedEvent.target && fileLoadedEvent.target.result) {
                    const text = fileLoadedEvent.target.result;
                    setBuffer(text);
                }
            };
            reader.readAsText(file);
            
            const result = await (ipfs as IPFSHTTPClient).add(file);
            console.log(result)
            setIpfsHash(result.path);
            var progressElement = file.previewElement.querySelector('[data-dz-uploadprogress]')
            progressElement.style.width = '100%'
        },
    };

    return (
        <div className=" bg-white min-h-fit  rounded-t-xl p-6 ">
            <div className="max-w-screen-xl m-auto">
                <div className="text-4xl font-bold pt-6 pb-6">Upload New BookMark</div>
                <div>
                    <p className="mb-2 text-base font-bold">Upload your book mark here</p>
                    <p className="mb-3  font-semibold text-xs text-slate-400">
                        File types supported: html. Max size: 10 MB
                    </p>
                </div>
                <div className="flex">
                    <div className="w-1/3">
                        {/* upload bookMark */}
                        <DropzoneComponent
                            config={componentConfig}
                            eventHandlers={eventHandlers}
                            djsConfig={djsConfig}
                        />
                    </div>
                    <div className="max-w-lg">
                        {/* show bookmark list */}
                        <div className="ml-10 mt-1 h-40 overflow-hidden">
                            <div className="text-xs">
                                {bookMarkJson.map((bookMark, index) => {
                                    return (
                                        <div className="mb-2" key={index}>
                                            <a href={bookMark.href} target="_blank" className="flex">
                                                <img className="mr-1 w-4 h-4" src={bookMark.icon}></img>{bookMark.title}
                                            </a>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <p className="mb-2 mt-2 font-semibold">Description</p>

                    <p className="font-semibold text-xs text-slate-400">
                        Add a description to your bookmark, up to 200 words, Markdown syntax
                        is supported.
                    </p>
                    <div className="flex ">
                        <textarea
                            value={userInput}
                            onChange={handleInputChange}
                            rows={4}
                            className="mt-2  hover:shadow-md outline-0 rounded-lg w-1/2 p-4 resize-y border-2 border-slate-100"
                        ></textarea>
                        <ReactMarkdown className="ml-10 mt-2 max-w-lg break-all">
                            {userInput}
                        </ReactMarkdown>
                    </div>
                </div>
                <div onClick={uploadBookMark} className="h-12 w-32 rounded-lg mt-12  mb-12 border-zinc-200 flex justify-center items-center text-white bg-blue-100 ">
                    Create
                </div>
            </div>
        </div>
    );
};
