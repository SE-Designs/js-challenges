const textEditor = document.getElementById("text-editor");
const previewContent = document.getElementById("preview-content");

const converter = new showdown.Converter();

textEditor.addEventListener("input", (e) => {
	const { value } = e.target;

	const html = converter.makeHtml(value);

	previewContent.innerHTML = html;
});
