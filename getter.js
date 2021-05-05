/*finds and returns different things*/

class Getter
{
	static getContainers() {
		return ['ADDRESS','ARTICLE','ASIDE','BLOCKQUOTE','DD','DIV','DL','DT','FIELDSET','FIGCAPTION','FIGURE','FOOTER','FORM','H1','H2','H3','H4','H5','H6','HEADER','LI','MAIN','NAV','NOSCRIPT','OL','P','PRE','SECTION','TABLE','TR','TD','TFOOT','UL'];
	}
	
	static getElementById(selector);
	
	static getSelection();
	
	static getEditor();	
	
	static getApp();
	
	/*return active container*/
	static getActiveElement();
	
	static getDropdownContentContainer(el);
	
	static getParentContainer(el);
	
	static getUpperParentTag(el);
	
	static getPopupToolbar();
	
	static getVeryFirstChild(el);
	
	static getVeryLastChild(el);
	
	static getElementsChildren(el);
	
	static getPositionOfCaretInTextContent(activeElement, el, recursion);
	
	/*
		return array of objects
		[
			{tag: 'tagName', style: 'styleName', value: 'styleValue'},
			{tag: 'tagName', style: 'styleName', value: 'styleValue'},
			{tag: 'tagName'}
		]
	*/
	static getTagsFromChildToParent(childElement, parentElement);
	
	/*return common parent for split*/
	static getFirstCommonParentOfStartEndContainer(startContainer, endContainer, upperParent);
	
	
	static getNewCaretPosition(range, oldCaretPosition, oldSelectedElement);
	
	static getCaretPosition(el, activeElement, elementsPointer);
	
	static getCaretPositionInNewElementToSelect(el, caretPosition);
	
	static getElementByCaretPosition(el, startOffset, length = 0);
	
	static getStartPosition(startCaretPosition, textContent);
	
	static getEndPosition(endCaretPosition, textContent);
	
	static getParentTable(el);
	
	/*get active cell in table*/
	static getSelectedCell(el);
	
	static getTopLeftXYOfElement(el);
	
	static getPathToElementForSelect(startElement);
	
	static getElementToSelectByItsPath(path);
	
	static getEditorsButtons();
	
	static getEditorsButtonsForHidding();
	
	static getHiddenEditorsButtons();
	
	static getFirstLastElementsToSelect(fragment, separator);
	
	static getCountOfWords();
	
	static getListIfItIs(el);
	
	static getParentListElement(el);
	
	static getTextStyleByButtonDataset(tags, sweRole);
	
	static getButtonDatasetAlign(el);
}
