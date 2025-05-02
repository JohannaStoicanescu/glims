export default async function downloadSingleImage(url: string, filename: string) {
	// Allows using a protected URL
	const response = await fetch(url);
	const blob = await response.blob();

	const a = document.createElement('a');
	a.href = URL.createObjectURL(blob);
	a.download = filename;
	a.click();
}
