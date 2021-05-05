/*get object properties and create dom object*/

class Creator
{
	static create(props)
	{
		/*
			props = 
			{
				tag : 'tagName',
				classes: ['className'],
				dataset: {datasetTitle: 'value'},
				innerHTML: 'innerHTML',
				innerText: 'innerText',
				attributes: {
					id: 'elementId',
					title: 'title',
					ariaLabel: 'ariaLabel',
					tabIndex: 'tabIndex',
					etc: '...'
				},
				children: [
					{
						 tag: 'tagName',
						 innerHTML: 'First child'
					},
					{
						 tag: 'tagName',
						 innerHTML: 'Second child'
					}
				]
			}
		*/
	
		if (!props) return;
		
		const children = props.children && props.children.map(child => Creator.create(child));
		
		Creator.currentItem = document.createElement(props.tag);		
		Creator.setProperty(props.classes, 'class');
		Creator.setProperty(props.attributes, 'attr');		
		Creator.setProperty(props.innerHTML, 'innerHTML');
		Creator.setProperty(props.dataset, 'dataset');
		Creator.setTextNode(props.innerText);
		Creator.setChildren(children);
		
		return Creator.currentItem;
	}
    
	static createTextNode(textContent)
	{
		return document.createTextNode(textContent);
	}
	
  static setChildren(children) {
		if (!children) return;
		for(let child of children) {
			Creator.currentItem.appendChild(child);
		}
	}
	
	static setProperty(props, type) {
		if (!props) return;
		
		switch(type) {
			case 'attr':
				for(let attr in props) {
					Creator.currentItem[attr] = props[attr];
				}
			break;
			case 'class': 
				DOM.setClass(Creator.currentItem, props);
			break;
			case 'dataset': 
					for(let prop in props) {
						Creator.currentItem.dataset[prop] = props[prop];
					}				
			break;
			case 'innerHTML': 
				Creator.currentItem.innerHTML = props;
			break;
			default:
			break;
		}
	}
	
	static setTextNode(innerText) {
		if (!innerText) return;
		
		Creator.currentItem.textContent = innerText;
	}
	
	static createDocumentFragment() {
		return document.createDocumentFragment();
	}
}
