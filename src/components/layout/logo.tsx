interface Logo {
	collapse?: boolean
}
export default function Logo({ collapse }: Logo) {
	return (
		<h2 className="tracking-tight text-secondary-foreground text-2xl font-semibold">
			{collapse ? "J" : "Jnjgo"}
		</h2>
	)
}
