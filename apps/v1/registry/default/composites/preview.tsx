import { PreviewContent, PreviewRoot, PreviewTrigger } from "../ui/preview"


const Preview = () => {
    return (
        <PreviewRoot>
            <PreviewTrigger >
                <span>Preview</span>
            </PreviewTrigger>
            <PreviewContent >
                <div className="p-4 bg-white border shadow-md rounded-md">
                    <span>This is a preview component</span>
                </div>
            </PreviewContent>
        </PreviewRoot>
    )
}

export { Preview }