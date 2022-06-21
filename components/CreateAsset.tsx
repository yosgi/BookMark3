import { DropzoneComponent } from "react-dropzone-component";
import ReactMarkdown from "react-markdown";
import { useBookMarkParser } from "../hooks/useBookMarkParser";
import "../node_modules/react-dropzone-component/styles/filepicker.css";
import "../node_modules/dropzone/dist/min/dropzone.min.css";
import { create, CID, IPFSHTTPClient } from 'ipfs-http-client'
import { useContext, useEffect, useState } from 'react';
import { ContractContext, UserContext } from '../pages/_app';
import {  Button,Modal,Link } from 'react-daisyui'
const projectId = process.env.NEXT_PUBLIC_INFURA_API_KEY;
const projectSecret = process.env.NEXT_PUBLIC_INFURA_API_SECRET;
const authorization ='Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')
let ipfs: IPFSHTTPClient | undefined;
ipfs = create({
    url: process.env.NEXT_PUBLIC_INFURA_API_URL,
    headers: {
        authorization,
    },
});
var componentConfig = {
    iconFiletypes: [".html"],
    showFiletypeIcon: true,
    postUrl: "no-url"
};
var djsConfig = { autoProcessQueue: false };

export const CreateAsset: React.FC = () => {
    const [userInput, setInput] = useState(
    `**How to Export and Save Your Chrome Bookmarks**

    1. Open Chrome and click the icon with three vertical dots in the top-right corner.
    2. Then hover over Bookmarks. 
    3. Next, click Bookmark manager. 
    4. Then click the icon with three vertical dots.
    5. Next, click Export Bookmarks. 
    6. Finally, choose a name and destination and click Save.`);
    const { bookMarkJson, setBuffer } = useBookMarkParser("");
    const [visible, setVisible] = useState<boolean>(false)
    const toggleVisible = () => {
        setVisible(!visible)
    }
    const [ipfsHash, setIpfsHash] = useState("");
    const contract = useContext(ContractContext);
    const user = useContext(UserContext);
    // set userInput text
    const handleInputChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ): void => {
        const target = event.target;
        const value = target.value;
        if (value.length > 500) {
            return;
        }
        setInput(value);
    };
     // upload post to blockchain
    const uploadBookMark = async () => {
        const preview = bookMarkJson.slice(0,5)
        await contract.uploadPost(ipfsHash, userInput,JSON.stringify(preview))
        toggleVisible()
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
            setIpfsHash(result.path);
            var progressElement = file.previewElement.querySelector('[data-dz-uploadprogress]')
            progressElement.style.width = '100%'
        },
    };
    
    return (
        <div className=" bg-white max-h-default overflow-y-auto absolute bottom-0 w-full  rounded-t-xl p-6 ">
            <Modal  open={visible} onClickBackdrop={toggleVisible}>
                <Modal.Header>Congraduation</Modal.Header>

                <Modal.Body>
                    Your bookmark has been shared successfully ！
                </Modal.Body>

                <Modal.Actions>
                    <Link href="/posters">
                        <Button onClick={toggleVisible} size="sm" color="primary">
                            see more
                        </Button>
                    </Link>
                    <Button onClick={toggleVisible} size="sm">Cancel</Button>
                </Modal.Actions>
            </Modal>
            <div className="max-w-screen-xl m-auto">
                <div className="text-4xl font-bold pt-6 pb-6">Post New BookMark</div>
                <div>
                    <p className="mb-2 text-base font-bold">Upload your book mark here</p>
                    <p className="mb-3  font-semibold text-xs text-slate-400">
                        File types supported: html. Max size: 10 MB *
                    </p>
                </div>
                <div className="grid grid-cols-12 lg:gap-8">
                    <div className="lg:col-span-5 md:col-span-12 col-span-12 ">
                        {/* upload bookMark */}
                        <DropzoneComponent
                            config={componentConfig}
                            eventHandlers={eventHandlers}
                            djsConfig={djsConfig}

                        />
                    </div>
                    <div className="lg:col-span-7 md:col-span-12 col-span-12">
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

                    <p className="font-semibold text-xs text-slate-400 ">
                        Add a description to your bookmark, up to 500 words, Markdown syntax
                        is supported *
                    </p>
                    <div className="grid grid-cols-12 lg:gap-8 ">
                        <div className="form-control lg:col-span-5 md:col-span-12 col-span-12 ">
                            <textarea
                                value={userInput}
                                onChange={handleInputChange}
                                rows={5}
                                className="textarea mt-2   outline-0 rounded-lg lp-4 resize-y border-2 border-slate-100"
                            ></textarea>
                            <label className="label">
                                <span className="label-text-alt font-semibold text-xs text-slate-400">{userInput.length} / 500</span>
                            </label> 
                        </div>

                        <ReactMarkdown className="ml-10 mt-2 lg:col-span-7 md:col-span-12 col-span-12 break-all">
                            {userInput}
                        </ReactMarkdown>
                    </div>
                </div>
                <button  onClick={uploadBookMark} className={`${ipfsHash.length > 0 && userInput.length > 0 ? '':'btn-disabled'} btn h-12 w-32 rounded-lg mt-12  mb-12 border-zinc-200 flex justify-center items-center`}>
                    Create
                </button>
             
            </div>
        </div>
    );
};
