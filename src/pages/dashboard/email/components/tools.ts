// @ts-nocheck
import Paragraph from "@editorjs/paragraph"
import Header from "@editorjs/header"
import List from "@editorjs/list"
import Link from "@editorjs/link"
import Delimiter from "@editorjs/delimiter"
import CheckList from "@editorjs/checklist"
import SimpleImage from "@editorjs/simple-image"
import RawTool from "@editorjs/raw"
import Embed from "@editorjs/embed"
import Quote from "@editorjs/quote"
import AttachesTool from "@editorjs/attaches"
import Table from "@editorjs/table"

export const EDITOR_JS_TOOLS = {
	paragraph: {
		class: Paragraph,
		inlineToolbar: true,
	},
	checkList: CheckList,
	list: List,
	header: Header,
	delimiter: Delimiter,
	link: Link,
	image: {
		class: SimpleImage,
		inlineToolbar: true,
		config: {
			placeholder: "Paste image URL",
		},
	},
	raw: RawTool,
	embed: Embed,
	quote: Quote,
	attaches: {
		class: AttachesTool,
	},
	table: {
		class: Table,
		inlineToolbar: true,
		config: {
			rows: 2,
			cols: 3,
		},
	},
}
