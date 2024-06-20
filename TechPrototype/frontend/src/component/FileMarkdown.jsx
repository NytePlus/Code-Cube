import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import {Typography} from "@mui/material";

export function FileMarkdown({text, type}){
    return (type === "html"?
        <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, rehypeHighlight]}>{`\`\`\`html${text}\`\`\``}</Markdown>:
        type === "json"?
        <Markdown>{`\`\`\`${text}\`\`\``}</Markdown>:
        ["cc", "cpp", "hpp", "h"].includes(type)?
            <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, rehypeHighlight]}>{`\`\`\`c${text}\`\`\``}</Markdown>:
            type === "txt"?
                <Typography sx={{whiteSpace: "pre-wrap", mt: 1}} variant="p">{text}</Typography>:
                type === "md"?
                    <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, rehypeHighlight]}>{text}</Markdown>:
                    type === "py"?
                        <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, rehypeHighlight]}>{`\`\`\`py${text}\`\`\``}</Markdown>:
                        <div><Typography sx={{whiteSpace: "pre-wrap", mt: 1, color:"red"}} variant="h6">暂不支持的预览类型</Typography>{text}</div>)
}