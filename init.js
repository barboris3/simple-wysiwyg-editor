/*app initialization, creating editor, adding listners and events for its elements*/

class Init
{	
	constructor(params) {
		if(!Checker.isSelectorAnIdOfTextarea(params.id)) return;
		Init.selector = params.id + '_' + 'sweEditor';
		Init.params = params.toolbar;
		Init.textareaId = params.id;
		Init.createEditor(params);
		Init.setObserver();
		Init.initAppClasses();
	}
	
	/*create editor and set events*/
	static createEditor(params) {
		DOM.createEditor(params);
		Init.editor = Getter.getEditor();
		
		switch (mode) {
		case 'balloon':
			/*create popup toolbar in balloon mode*/
			Init.createToolbar('swe-toolbar-pu', 'swe-none');
			Init.setShowingPopupToolbarEvents();
			/*set selectionEnd timer value*/
			Init.selectionEndTimer = null;
			break;
		case 'classic':
		default:
			/*create fixed toolbar in balloon mode*/
			Init.createToolbar('swe-toolbar', params.sticky ? 'swe-toolbar-sticky' : null);
			DOM.createBottomPanel();
			Init.setEventListener(Init.editor, 'input', Init.setCountersValue);
			Init.setCountersValue();
		}
		/*highlight editors images on click*/
		Init.setEventListener(Init.editor, 'mousedown', Images.selectImageOnClick);
		Init.setEventListener(document, 'mousedown', Images.removeImageFrameOnOutsideClick);		
		/*set textarea value on input*/
		Init.setEventListener(Init.editor, 'input', Init.setTextAreaValue);
		/*highlight buttons of toolbar that have the same style as selection*/
		Init.setEventListener(document, 'selectionchange', Init.highlightTheButtons);
	}
	
	/*observe the inserted nodes, replace the exceptions with paragraphs*/
  static setObserver() {
		let observer = new MutationObserver(mutationRecords => {
			for(let mutation of mutationRecords) 
				if(Checker.checkIsNewNodeForReplace(mutation.addedNodes[0])) mutation.addedNodes[0].replaceWith(Creator.create({tag: 'p', children: [{tag: 'br'}]}));
			
			if(Checker.isEditorEmpty()) Init.editor.append(Creator.create({tag: 'p', children: [{tag: 'br'}]}));			
		});
		
		observer.observe(Init.editor, {
		  childList: true,
		  subtree: false,
		  
		  attributes: false,
		  characterData: false,
		  
		  characterDataOldValue: false,
		  attributeOldValue: false,
		});
	}
  
	/*create classic or popup toolbar, set events*/
  static createToolbar(id, classes) {
		let tools = Init.getEditorsToolsList();
		let options = {}, params;
		
		switch (id) {
		case 'swe-toolbar-pu':
			params = ['blocks', 'divider', 'bold', 'italic', 'underline', 'clear', 'divider', 'align', 'divider', 'ol', 'ul', 'divider', 'image', 'link'];
			break;
		case 'swe-toolbar':
		default:
			params = Init.params;
		}
		let toolbar = DOM.createToolbar(id, classes);		
		for(let param of params) {
			if(tools.hasOwnProperty(param)) {
				if(tools[param][0].dropdown) {
					let dropdownContent = DOM.createDropdownMenu(tools[param][0].dropdownButton, toolbar);
					Init.setEventListener(toolbar.querySelector('[data-swe-role = ' + tools[param][0].dropdownButton.dataset.sweRole + ']'), 'click', Init.openDropdownList);
					for(let prop of tools[param][0].selectList) Init.createToolbarButtons(prop, dropdownContent);
				} else {
					for(let prop of tools[param]) Init.createToolbarButtons(prop, toolbar);
				}
			}
		}
		Init.createHighShowToolsButton(toolbar);
	}
	
	static createToolbarButtons(prop, parentNode) {
		let toolbarButton = 
			DOM.createToolbarButton(
				{
					tag: prop.tag, 
					classes: prop.classes, 
					dataset: prop.dataset, 
					attributes: prop.attributes,
					innerText: prop.innerText,
					children: prop.children
				}, 
				parentNode
			);
		if(prop.hasOwnProperty('listener')) Init.setEventListener(toolbarButton, 'click', prop.listener.bind(event, prop.params));				
	}
	
	static setShowingPopupToolbarEvents() {
		Init.setEventListener(document, 'selectionchange', Init.showPopupToolbarOnSelectionEnd);
		Init.setEventListener(document, 'selectionend', Init.showPopupToolbar);
	}
	
	/*create selectionend user event, show popup toolbar on this event*/
	static showPopupToolbarOnSelectionEnd() {
		if(Init.selectionEndTimer) clearTimeout(Init.selectionEndTimer);
		Init.selectionEndTimer = 
			setTimeout(() => { document.dispatchEvent(new CustomEvent('selectionend', {bubbles: false, composed: false})); }, 200);
	}
	
	/*shows popup toolbar under or over end caret on selectionend*/
	static showPopupToolbar(event);
	
	/*init app classes with their methods and global variables*/
	static initAppClasses();
	
	static setEventListener(el, events, func);
	
	static removeEventListener(el, events, func);
	
	static cancelDefaultEvent(event);
	
	/*hide tools, that arent placing in one row*/
	static createHighShowToolsButton(toolbar);
	
	static showOrHideFullListOfTools();
	
	static setTextAreaValue();
	
	static setCountersValue();
	
	static highlightTheButtons();
	
	static openDropdownList(event)
	
	static closeDropdownListOnAppClick(event);
	
	static closeDropdownListOnOutsideClick(event);
	
	static closeDropdowListAndDropEvents(app, dd);
	
	/*returns app tools object*/
	/* obj =
		{
			toolsName: [
				{
					tag: tagName,
					dataset: {datasetName: datasetValue},
					attributes: {title: buttonTitle, ariaLabel: buttonAriaLabel, tabIndex: tabIndex},
					children: [{svg params}],
					listener: listener,
					params: {tag: tagName}
				},
				etc
			],
			toolsNameWithDropdownList: [
				{
					dropdown: true,
					tag: 'div',
					dropdownButton: {
						tag: 'button', 
						dataset: {datasetName: datasetValue},
						children: [
							{tag: 'SPAN', classes: 'dd-button-text', innerText: innerText},
							{tag: 'SPAN', classes: 'dd-arrow'}]
						},
					selectList: [
						{
							tag: 'button', 
							innerText: innerText, 
							dataset: {datasetName: datasetValue}, 
							listener: listener, 
							params: {tag: 'SPAN', style: className, value: value}
						}, 
						etc
					],
				}
			],
			etc
		}
	*/
	static getEditorsToolsList();
	
	/*returns app css stylesheet*/
	static getEditorsStyles();
}
