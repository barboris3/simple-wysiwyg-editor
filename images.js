/*image operations manager*/

class Images
{
	static initImages();
	
	/*create or open window for upload image*/
	static openImageMenu();
	
	/*load image in base64*/
	static uploadImage();
	
	/*inset image in editor*/
	static insertImage();
	
	/*highlight images of editor on click using image frame*/
	static selectImageOnClick(event);
	
	/*create image popup for align*/
	static createImagesPopup();
	
	/*create image frame with resizing points*/
	static createResizingMenu();
	
	/*remove image frame on outside click*/
	static removeImageFrameOnOutsideClick();
	
	/*set image frame position during draging or resizing image*/
	static setImageResizingFramePosition();
	
	/*set popup position during draging or resizing image*/
	static setSmallPopupMenuPosition();
	
	/*set events and start image resizing on dragging resizing points*/
	static startResizingImage(event);
	
	/*change image size if dragging resizing points in dependence of them position*/
	static resizeImage(event);
	
	/*save new image size*/
	static saveNewSize();
	
	/*change image align after chosing popup options*/
	static setImageFloat(event);
}
