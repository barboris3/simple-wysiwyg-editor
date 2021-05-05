/*get start and end element to select and caret positions, set selection*/

class Selectioner
{	
	static setRange() {
		let range = new Range();
		range.setStart(Selectioner.firstElementToSelect, Selectioner.rangeToSet[0]);
		range.setEnd(Selectioner.lastElementToSelect, Selectioner.rangeToSet[1]);
		document.getSelection().removeAllRanges();
		window.getSelection().addRange(range);
	}
	
	static setSelection(el, rangeToSet = [0, 0]) {		
		Selectioner.rangeToSet = rangeToSet;
		Selectioner.firstElementToSelect = el.startElementToSelect;
		Selectioner.lastElementToSelect = el.endElementToSelect;
		Selectioner.setRange();
	}
}
