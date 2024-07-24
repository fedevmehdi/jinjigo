import { useCurrentEditor } from "@tiptap/react"

const EditorJSONPreview = () => {
	const { editor } = useCurrentEditor()
	if (!editor) {
		return
	}
	return <pre>{JSON.stringify(editor.getJSON(), null, 2)}</pre>
}

export default EditorJSONPreview
