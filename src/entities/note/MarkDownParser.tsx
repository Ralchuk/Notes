const font = 'font-satoshi';

const markDownParser = (value: string): string => {
	
	return value
		.replace(/^# (.+)/gm,    '<h1 class="' + font + '">$1</h1>')
		.replace(/^## (.+)/gm,   '<h2 class="' + font + '">$1</h2>')
		.replace(/^### (.+)/gm,  '<h3 class="' + font + '">$1</h3>')
		.replace(/^#### (.+)/gm, '<h4 class="' + font + '">$1</h4>')
		.replace(/^##### (.+)/gm,'<h5 class="' + font + '">$1</h5>')
		.replace(/^###### (.+)/gm,'<h6 class="' + font + '">$1</h6>')
		.replace(/\*\*(.+?)\*\*/g, '<strong class="' + font + '">$1</strong>')
		.replace(/__(.+?)__/g,     '<strong class="' + font + '">$1</strong>')
		.replace(/\*(.+?)\*/g,   '<em class="' + font + '">$1</em>')
		.replace(/_(.+?)_/g,     '<em class="' + font + '">$1</em>')
		.replace(/```([\s\S]+?)```/g, '<pre class="' + font + '"><code>$1</code></pre>')
		.replace(/`(.+?)`/g,     '<code class="' + font + '">$1</code>');
};

export default markDownParser;
