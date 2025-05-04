import JSZip from "jszip";

/**
 * Downloads multiple images as a zip file.
 * @param {string[]} imageUrls - Array of image URLs to download.
 * @param {string} [zipFileName] - Optional name for the zip file.
 */
export default async function downloadMultipleImages(imageUrls: string[], zipFileName?: string) {
	const zip = new JSZip();

	for (let i = 0; i < imageUrls.length; i++) {
		const url = imageUrls[i];
		const response = await fetch(url);
		const blob = await response.blob();

		const fileName = `image-${i + 1}.${blob.type.split("/")[1] || "jpg"}`;
		zip.file(fileName, blob);
	}

	const zipBlob = await zip.generateAsync({ type: "blob" });
	const zipUrl = URL.createObjectURL(zipBlob);

	const a = document.createElement("a");
	a.href = zipUrl;
	a.download = zipFileName || "images.zip";
	a.click();
	URL.revokeObjectURL(zipUrl); // Clean up

}
