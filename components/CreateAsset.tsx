export const CreateAsset:React.FC = () => {
    return (
    <div className="w-screen bg-white h-5/6 absolute bottom-0 left-0 rounded-t-xl p-6">
        <div className="max-w-screen-xl ml-auto">
            <div className="text-4xl font-bold pt-6 pb-6">
                Upload New BookMark
            </div>
            <div>
                <p>Upload your book mark here</p>
                <p>File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB</p>
            </div>
            <div>+</div>
            <div>
                <p>Description</p>
                <p>The description will be included on the item's detail page underneath its image. Markdown syntax is supported.</p>
                <textarea></textarea>
            </div>
        </div>
     
    </div>)
 }