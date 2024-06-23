// @ts-nocheck
import { memo, useEffect, useRef } from "react"
// import "./styles.css"
import EditorJS from "@editorjs/editorjs"
import { EDITOR_JS_TOOLS } from "./tools"

const Preview = ({ data, holder }) => {
	console.log(data)
	const ref = useRef()
	useEffect(() => {
		if (!ref.current) {
			const editor = new EditorJS({
				holder: holder,
				data: data,
				tools: EDITOR_JS_TOOLS,
				readOnly: true,
			})
		}
	}, [])

	return <div className="ce-block__content" id={holder} />
}

export default memo(Preview)
