interface Header {
	title: string
	description: string
	className?: string
}
export default function Header({ title, description, className }: Header) {
	return (
		<div className={"text-center mb-6 " + className}>
			<h3 className="text-xl lg:text-2xl font-medium mb-2">{title}</h3>
			<p className="text-muted-foreground text-sm">{description}</p>
		</div>
	)
}
