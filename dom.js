/*operations with dom elements, createing, wrapping, splitting, merging, removing etc*/

class DOM
{
	/*hide textarea, create editors elements in shadow dom*/
	static createEditor(id, size = null, styles, scrollable = null, resizeable = null) {
		let textArea = Getter.getElementById(id);
		textArea.hidden = true;
		let app = Creator.create({tag: 'div', attributes: {id: Init.selector, style: 'display: inline-block;'}});
		let appContainer = Creator.create({tag: 'div', attributes: {id: 'swe-app'}});
		app.attachShadow({mode: 'open'});
		let style = Creator.create({tag: 'style'});
		style.innerHTML = styles;
		let editor = Creator.create({tag: 'div', attributes: {id: 'swe-editor'}});
		editor.contentEditable = true;
		
		if(size) {
			app.style.width = size[0];
			editor.style.height = size[1];
			if(scrollable) DOM.addClassToClassList(editor, 'swe-editor-srollable');
		} else {
			app.style.width = '100%';
		}
		if(resizeable) {
			DOM.addClassToClassList(editor, 'swe-editor-resizeable');
		}
		if(textArea.value.trim() !== '') {
			let wrapper = Creator.create({tag: 'DIV', innerHTML: textArea.value})
			let containers = Getter.getContainers();
			for(let child of wrapper.childNodes) {
				if(Checker.isTextareaElementForReplace(child)) {
					let p = Creator.create({tag: 'P'});
					p.append(child.cloneNode());
					child.replaceWith(p)
				}
			}
			editor.append(...wrapper.childNodes);
		} else {
			editor.append(Creator.create({tag: 'P', children: [{tag: 'BR'}]}));
		}		
		DOM.dropBreakLineNodes(editor);
		appContainer.append(editor);
		app.shadowRoot.append(style);
		app.shadowRoot.append(appContainer);
		textArea.after(app);
	}
	
	static createToolbar(id, classes = null) {
		let toolbar = Creator.create({tag: 'div', attributes: {id: id}});
		if(classes) DOM.setClass(toolbar, classes);
		Getter.getEditor().before(toolbar);
		return toolbar;
	}
	
	static createToolbarButton(properties, par) {
		let toolbarButton = Creator.create(properties);
		par.append(toolbarButton);
		return toolbarButton;
	}
	
	static createDropdownMenu(properties, toolbar) {
		let dropdown = Creator.create({tag: 'div', classes: 'swe-dropdown'});
		let dropdownContent = Creator.create({tag: 'div', classes: 'swe-dropdown-content'});
		let openButton = DOM.createToolbarButton(properties, dropdown);
		dropdown.append(dropdownContent);
		toolbar.append(dropdown);
		return dropdownContent;
	}
	
	static createBottomPanel() {
		let panel = Creator.create({tag: 'div', attributes: {id: 'swe-bottomPanel'}});
		let wordsCounter = Creator.create({tag: 'div', attributes: {id: 'swe-bottomPanel-wc'}, children: [{tag: 'label'}], innerText: 'Words: '});
		let charactersCounter = Creator.create({tag: 'div', attributes: {id: 'swe-bottomPanel-cc'}, children: [{tag: 'label'}], innerText: 'Characters: '});
		panel.append(...[wordsCounter, charactersCounter]);		
		Getter.getEditor().after(panel);
	}
	
	static clearAndWrapFragmentInTags(el, tags, exeption) {
		/*if extracted fragment is a multiline element - loop every block and cover or clear it*/
		if(Checker.isElementMultiline(el)) {
			DOM.clearAndWrapMulitilineFragment(el, tags, exeption);
			return el;
		}
		
		/*else if fragment is a singleline - wrap/clear childNodes*/
		
		/*if function gets exeption - clear fragment from exeption tag*/
		if(exeption.hasOwnProperty('tag')) DOM.clearElementsChildrenFromTag(el, exeption.tag);
		
		/*save tag, applied by user*/
		let applied = tags[tags.length - 1];
		
		/*wrapping fragment in tags*/
		for(let prop of tags) {
			/*ignore exeption tag*/
			if(prop.tag === exeption.tag && prop.style === exeption.style) continue;
			/*ignore spans that has the same style with user tag*/
			if(Checker.isCurrentAndAppliedTagsHasTheSameStyle(prop, applied)) continue;
			
			/*clear fragment from current tag to avoid repetitions like <b>text <b>bold</b> text</b>*/
			DOM.clearElementsChildrenFromTag(el, prop.tag, applied.style);
			
			/*create element with current tag name, apply style, push fragment to it*/
			let temp = Creator.create({tag: prop.tag});
			if(prop.hasOwnProperty('style')) temp.style[prop.style] = prop.value;
			temp.appendChild(el)
			el = temp;
		}
		return el;
	}
	
	/*clear only from tag*/
	static clearElementsChildrenFromTag(el, tag, exeptionStyle = null) {
		for(let prop of el.querySelectorAll(tag)) {
			if(exeptionStyle && prop.style[0] !== exeptionStyle) continue;
			NodeList.prototype.isPrototypeOf(prop.childNodes) ? prop.replaceWith(...prop.childNodes) : prop.replaceWith(prop.childNodes);
		}
	}
	
	/*loop multiline fragment*/
	static clearAndWrapMulitilineFragment(el, tags, exeption) {
		let dif = ['TABLE', 'TR', 'TD', 'OL', 'UL'];
		for(let child of el.childNodes) {
			if(child.nodeName !== '#text') {
				/*if child a table or a list*/
				if(dif.includes(child.nodeName)) {
					let els = child.querySelectorAll('LI').length ? child.querySelectorAll('LI') : child.querySelectorAll('TD').length ? child.querySelectorAll('TD') : [child];
					for(let ch of els) DOM.clearAndWrapChildsInTag(ch, tags, exeption);
					continue;
				}
				/*else if child is a head, paragraph, etc*/
				DOM.clearAndWrapChildsInTag(child, tags, exeption);
			}
		}
	}
	
	/*push wrapped fragment*/
	static clearAndWrapChildsInTag(child, tags, exeption) {
		let fragment = Creator.createDocumentFragment();
		fragment.append(...child.childNodes)
		child.append(DOM.clearAndWrapFragmentInTags(fragment, tags, exeption));
	}
	
	/*clear all formatting*/
	static clearFormatting(el) {
		let removeableTags = ['B', 'I', 'SUP', 'SUB', 'S', 'U', 'STRONG', 'EM', 'MARK', 'DEL', 'SPAN'];
		for(let tag of removeableTags) {
			DOM.clearElementsChildrenFromTag(el, tag);
		}
		return el;
	}
	
	static prependToFirstChildOfRightSide(el, separator);
	
	static appendToLastChildOfLeftSide(el, separator);
	
	static appendTableContent(replacement, startCell);
	
	static prependTableContent(replacement, endCell);
	
	static setPopupToolbarPosition(rect, up);
	
	static removeClass(el, className);
  
  static setClass(el, className);
	
	static addClassToClassList(el, className);
	
	static wrapElementInTags(el, tags, exeption);
	
	static findSingleWordAndSetSelectionOnIt(selection, range, positionOfCaret);
	
	static splitElementBySeparator(bound, cutElement);
	
	static mergeSiblingLists(fragment, separator);
	
	static dropEmptyElements(el, activeElement);
	
	static clearIncompatibleWithTagElements(el, tag);
	
	static replaceBlockTag(startContainer, endContainer, tag);
	
	static clearFromBlockTag(startContainer, endContainer, tag);
	
	static setAlign(startContainer, endContainer, align);
	
	/*creates popup window for insertion image, link, media, preview*/
	static createPopupWindow(params);
	
	/*returns image resizing pointers*/
	static createResizingFrame();
	
	/*creates image popup menu*/
	static createSmallPopupMenu(params);
	
	static dropBreakLineNodes(editor);
	
	static clearSelectedElementsFromFrame(el);
	
	static createList(startContainer, endContainer, tag);
	
	/*unit neighbor lists*/
	static unitLists(tag);
	
	static clearFromList(startContainer, endContainerPath);
	
	static setPadding(startContainer, endContainer, action);
}
