import Image from "next/image";

export default function AvatarRounded({
	src,
	alt,
	size = "w-8 h-8",
	border = "border-2 border-white",
}: {
	src: string;
	alt: string;
	size?: string;
	border?: string;
}) {
	return (
		<Image
			src={src}
			alt={alt}
			width={32}
			height={32}
			className={`${size} ${border} rounded-full`}
			style={{ objectFit: "cover" }}
		/>
	);
}
