interface Header {
	title: string
	subTitle?: string
}

export default function Header({ title, subTitle }: Header) {
	const date = new Date()
	return (
		<div className="my-6 lg:mb-12 lg:mt-0">
			<h2 className="text-2xl font-semibold">{title}</h2>
			<h4 className="text-accent-foreground text-lg">
				{subTitle || date.toDateString()}
			</h4>
		</div>
	)
}
