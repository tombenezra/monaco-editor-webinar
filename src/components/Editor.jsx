import React, { useRef, useEffect } from 'react';
import * as monaco from 'monaco-editor';

self.MonacoEnvironment = {
	getWorkerUrl: function (_moduleId, label) {
		if (label === 'json') {
			return './json.worker.bundle.js';
		}
		if (label === 'css') {
			return './css.worker.bundle.js';
		}
		if (label === 'html') {
			return './html.worker.bundle.js';
		}
		if (label === 'typescript' || label === 'javascript') {
			return './ts.worker.bundle.js';
		}
		return './editor.worker.bundle.js';
	}
};

const customTheme = monaco.editor.defineTheme('webinar-theme', {
	base: 'vs-dark',
	inherit: true,
	colors: {
		'editor.foreground': '#a92',
        'editor.background': '#444',
	},
	rules: []
})

export const Editor = () => {
	const divEl = useRef(null);
	let editor;

	useEffect(() => {
		if (divEl.current) {
			editor = monaco.editor.create(divEl.current, {
				value: ['const foo = () => {', '\tconsole.log("Hello Webinar!!!!!!!!!!!!");', '}'].join('\n'),
				language: 'typescript',
				minimap: {
					enabled: false
				},
				fontFamily: "Helvetica",
				fontSize: "20px",
				cursorStyle: "block",
				glyphMargin: true,
				lineNumbers: false
			});
			monaco.editor.setTheme('webinar-theme');
		}
		return () => editor.dispose();
		
	}, []);
	return <div className="Editor" ref={divEl}></div>;
};
