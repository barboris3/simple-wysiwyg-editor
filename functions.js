/*wrapping text functions, working with formatting and block tags*/

class Functions
{
	/*init events of class, global variables definition*/
	static initFunctions();
	
	static wrapInTag(params) {
		let selection = Getter.getSelection();
		
		/*return if selection outside of editor*/
		if(!Checker.isSelectionInEditor(selection)) return;
		
		let range = selection.getRangeAt(0);
		let editor = Getter.getEditor();
		let insertionParams, newCaretPosition = null, elementsPointer = null, elementToSelect = null;
		
		/*if selection empty - single caret*/
		if(range.startContainer === range.endContainer && range.startOffset === range.endOffset) {
			/*if caret(cursor) in the begin or in the end of word - set events to wrap input text with user tag*/
			if(Checker.isCaretInTheBeginOrInTheEndOfTheWord(selection.anchorNode, range)) {
				Functions.addEventsOnInputAndFillTagsStorge(range, editor, params);
				return;
			}
			/*else - select single word and wrap it with tag*/
			elementsPointer = Getter.getNewCaretPosition(range, range.startOffset, range.startContainer);
			DOM.findSingleWordAndSetSelectionOnIt(selection, range, range.startOffset + Getter.getPositionOfCaretInTextContent(Getter.getActiveElement(), range.startContainer, false));
		}
		
		if(!params.tag) {
			/*if params.tag is empty - clear formatting*/
			insertionParams = Functions.wrapOrClearSelection(range, true);
		} else if(Checker.checkSelectionElementParentType(range.startContainer, params)) {
			/*if element has user tag - clear selection from this tag*/
			insertionParams = Functions.wrapOrClearSelection(range, true, params);
		} else if (!Checker.checkSelectionElementParentType(range.startContainer, params)) {
			/*if element has NO user tag - wrap selection with this tag*/
			insertionParams = Functions.wrapOrClearSelection(range, false, params);
		}
		
		/*insert wrapped or cleared selection*/
		insertionParams.elementToReplace.replaceWith(insertionParams.replacement);
		
		if(elementsPointer) {
			/*if word with single caret was wrapped - find new element to select*/
			let activeElement = Getter.getActiveElement();
			elementToSelect = Getter.getVeryFirstChild(Getter.getElementByCaretPosition(activeElement, elementsPointer));
			newCaretPosition = Getter.getCaretPosition(elementToSelect, activeElement, elementsPointer);
		}
		
		/*set selection*/
		Selectioner.setSelection(
			{
				startElementToSelect: 
					elementToSelect ? elementToSelect : insertionParams.startElementToSelect,
				endElementToSelect: 
					elementToSelect ? elementToSelect : insertionParams.endElementToSelect
			},
			[
				newCaretPosition ? newCaretPosition : insertionParams.startCaretPosition,
				newCaretPosition ? newCaretPosition : insertionParams.endCaretPosition
			]
		);
	}	
	
	static wrapOrClearSelection(range, clear, params = {}) {
		let activeElement = Getter.getActiveElement();
		let bounds = {begin: false, end: false};
		let tableBounds = {
			begin: Checker.isInTable(range.startContainer) ? Getter.getSelectedCell(range.startContainer) : null, 
			end: Checker.isInTable(range.endContainer) ? Getter.getSelectedCell(range.endContainer) : null};
		let separator, replacement, startElementToSelect, endElementToSelect, startCaretPosition, endCaretPosition;
		
		/*if selected more than one block - detect if caret in the begin/end of selected blocks*/
		if(activeElement.id)
			bounds = {
					begin: Checker.isCaretInTheBegin(range, range.startContainer),
					end: Checker.isCaretInTheEnd(range, range.endContainer),
				};
		
		let upperParent = Getter.getUpperParentTag(range.startContainer);
		/*find all elements rows tags*/
		let tags = upperParent.nodeName !== '#text' && Getter.getUpperParentTag(range.startContainer) === Getter.getUpperParentTag(range.endContainer) ? 
			Getter.getTagsFromChildToParent(
				Getter.getFirstCommonParentOfStartEndContainer(range.startContainer, range.endContainer, upperParent), 
				upperParent
				) : [];
		
		separator = Creator.create({tag: 'separator'});
		/*extract selection*/
		replacement = range.extractContents();
		
		/*insert separator instead selection, ignore tables*/
		upperParent.textContent === '' && Getter.getParentContainer(range.startContainer).nodeName === 'TD' ? 
			upperParent.before(separator) :
			range.insertNode(separator);
		
		/*split active element by separator for replacing it with wrapped text*/
		if(!Checker.isElementList(separator.parentNode) && !Checker.isInTable(separator))
			DOM.splitElementBySeparator(activeElement, separator);
		
		/*wrap or clear extracted conent*/
		replacement = clear && Object.keys(params).length === 0 ? 
			DOM.clearFormatting(replacement) :
			DOM.clearAndWrapFragmentInTags(replacement, params.hasOwnProperty('tag') ? tags.concat([params]) : tags, clear ? params : {});
		
		DOM.clearIncompatibleWithTagElements(replacement, params.tag);
		replacement.normalize();
		
		/*find elements to select and caret positions*/
		[startElementToSelect, endElementToSelect, startCaretPosition, endCaretPosition] = Getter.getFirstLastElementsToSelect(replacement, separator);
		
		/*append/prepend first/last block childrens if multiline mode and carets wasnt in the begin/end of block*/
		if(!tableBounds.begin && activeElement.id && !bounds.begin)	DOM.appendToLastChildOfLeftSide(replacement, separator);		
		if(!tableBounds.end && activeElement.id && !bounds.end)	DOM.prependToFirstChildOfRightSide(replacement, separator);
		
		/*append/prepend tables cells if selection was in table*/
		if(tableBounds.begin && tableBounds.begin !== tableBounds.end) DOM.appendTableContent(replacement, tableBounds.begin);
		if(tableBounds.end && tableBounds.begin !== tableBounds.end) DOM.prependTableContent(replacement, tableBounds.end);
		
		DOM.dropEmptyElements(separator, activeElement);
		DOM.mergeSiblingLists(replacement, separator);
		
		return {
				replacement: replacement,
				elementToReplace: separator,
				startElementToSelect: startElementToSelect,
				endElementToSelect: endElementToSelect,
				startCaretPosition: startCaretPosition,
				endCaretPosition: endCaretPosition
			};
	}
	
	/*
		find and save all tags of element with their properties in tagsStorage
		define if active element has user selected style - remove it from tagsStorage, else - add
		set input events for wrapping user text with tags from tagsStorage
		return selection to active element
	*/
	static addEventsOnInputAndFillTagsStorge(range, editor, params);
	
	/*insert new node wrapped with user tag*/
	static insertNewNodeWhenInput(event);
	
	/*split active element and insert cleared from tag node*/
	static insertClearedNewNodeWhenInput(event);
	
	/*remove addEventsOnInputAndFillTagsStorge events when new node inserted or on change selection*/
	static removeEventsAndParams();
	
	/*replace selected blocks*/
	static addBlockTags(params);
	
	/*set align for selected blocks or clear*/
	static addAlign(params);
	
	/*insert list instead selection or clear selection from list*/
	static insertList(params);
	
	/*set padding for selected blocks*/
	static setPadding(params);
}
