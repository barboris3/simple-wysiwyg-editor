/*checks different params, returns true or false*/

class Checker
{
  static checkIsNewNodeForReplace(node)
	{
		if(typeof node === 'undefined') return false;
		if(node.nodeName === 'DIV' || node.nodeName === 'BR') return true;
	}
	
	/*return true if array with els tags has element with span with same tagName and style as params*/
	static checkSelectionElementParentType(node, params);
	
	static isSelectorAnIdOfTextarea(id);
	
	static isDropdownMenuOpened(el);	
	
	static isElementList(el);
	
	static isElementHasTag(el, tag);
	
	static isTextNodeAWhitespace(el);	
	
	/*return true if caret in the begin of the row*/
	static isCaretInTheBegin(range, el);
	
	/*return true if caret in the end of the row*/
	static isCaretInTheEnd(range, el);
	
	static isElementMultiline(el);
	
	static isTextareaElementForReplace(el);
	
	static checkIsDeepestNodeHasChildren(el);
	
	static isKeyAPrintableCharacter(keyCode);
	
	static isKeyAnArrow(keyCode);
	
	static isCharAWhitespace(character);
	
	static isCaretInTheBeginOrInTheEndOfTheWord(el, range);
	
	/*return true if selection in the apps editor*/
	static isSelectionInEditor(selection);
	
	/*check, is element a descendant of other element*/
	static isDescendant(el, parentElement);
	
	static isEditorEmpty();
	
	static isEventTargetAnImageOfEditor(target);
	
	static isElementExistsOnPage(el);
	
	static isPressedKeyForImageDelete(event);
	
	static isElementHasAlign(el, align);
	
	static isInTable(el);
	
	static isEventForFillingClipboard(event);
	
	static isCurrentAndAppliedTagsHaveTheSameStyle(prop, applied);
	
	static isArrayIncludesObject(arr, obj);
	
	static isArrayOfObjectsIncludesTag(array, tag);
	
	static areObjectsEquivalent(obj1, obj2); 
}
