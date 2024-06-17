import { Dialog, DialogContent } from "@/components/ui/dialog"

interface Loader {
	loading: boolean
}
export default function Loader({ loading }: Loader) {
	return (
		<Dialog open={loading}>
			<DialogContent>test</DialogContent>
		</Dialog>
	)
}
