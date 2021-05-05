/*undo/redo manager*/

class Clipboard
{
	/*set clipboard events*/
	static initClipboard();
	
	/*
		fill clipboard undoStorage when input
		undoStorage.push({nodeList, undoStartElementToSelectPath, undoEndElementToSelectPath, undoCaretPosition});
		clear redoStorage, if redoStorage.length !== 0
	*/
	static fillClipboard(event);
	
	/*
		fill redoStorage with current editor state
		redoStorage.push{nodeList, redoStartElementToSelectPath, redoEndElementToSelectPath, redoCaretPosition};
		pot last value from undoStorage, set it to editor with setting selection
	*/
	static undo();
	
	/*
		save editors state in undoStorage
		pop redoStorage and set redo value to editor, set selection
	*/
	static redo();
	
	/*replace editors children with new undo/redo state*/
	static replaceEditorsChildNodes(childNodes);
	
	/*set undo/redo on ctrl+z, ctrl+y key combinations*/
	static setEventsOnKeyCombinations(event);
}
