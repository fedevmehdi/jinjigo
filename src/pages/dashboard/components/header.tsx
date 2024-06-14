interface Header {
	title: string
	subTitle?: string
}

export default function Header({ title, subTitle }: Header) {
	return (
		<div className="my-6 lg:mt-0">
			<h2 className="font-semibold mb-2">{title}</h2>
			<h4 className="text-accent-foreground text-lg font-normal">{subTitle}</h4>
		</div>
	)
}
