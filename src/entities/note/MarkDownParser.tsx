const markDownParser = (value: string):string =>{
	return value
		.replace(/^# (.+)/gm, '<h1>$1</h1>')
		.replace(/^## (.+)/gm, '<h2>$1</h2>')
		.replace(/^### (.+)/gm, '<h3>$1</h3>')
		.replace(/^#### (.+)/gm, '<h4>$1</h4>')
		.replace(/^##### (.+)/gm, '<h5>$1</h5>')
		.replace(/^###### (.+)/gm, '<h6>$1</h6>')
		.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
		.replace(/^__(.+?)__/g, '<b>$1</b>')
		.replace(/\*(.+?)\*/g, '<em>$1</em>')
		.replace(/^_(.+?)/gm, '<i>$1</i>')
		.replace(/^`(.+?)/gm, '<code>$1</code>')
		.replace(/^```(.+?)/gm, '<pre><code>$1</code><pre>');
};

export default markDownParser;
