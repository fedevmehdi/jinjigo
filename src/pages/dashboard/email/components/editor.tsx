// @ts-nocheck
import "./styles.css"
import React, { memo, useEffect, useRef } from "react"
import EditorJS from "@editorjs/editorjs"
import { EDITOR_JS_TOOLS } from "./tools"

const Editor = ({ data, setData, editorblock, ...props }) => {
	const ref = useRef()
	//Initialize editorjs
	useEffect(() => {
		//Initialize editorjs if we don't have a reference
		if (!ref.current) {
			const editor = new EditorJS({
				holder: editorblock,
				tools: EDITOR_JS_TOOLS,
				data: data,
				...props,
				async onChange() {
					setData(await editor.save())
				},
			})
			ref.current = editor
		}

		//Add a return function to handle cleanup
		return () => {
			if (ref.current && ref.current.destroy) {
				ref.current.destroy()
			}
		}
	}, [])

	return <div className="ce-block__content" id={editorblock} />
}

export default memo(Editor)
