/**
 * @description This function downloads a single image from a given URL and saves it with the specified filename.
 * @param {string} url - The URL of the image to download.
 */
export default async function downloadSingleImage(url: string) {
	// Allows using a protected URL
	const response = await fetch(url);
	const blob = await response.blob();

	const a = document.createElement('a');
	a.href = URL.createObjectURL(blob);
	const fileName = `image.${blob.type.split("/")[1] || "jpg"}`;
	a.download = fileName;
	a.click();
}
