# simple-wysiwyg-editor
my simple wysiwyg editor, working without execCommand\
creates wysiwyg editor after declaration class Init with user's options:\
<br />
new sweEditor.Init(\
&nbsp;&nbsp;{\
&nbsp;&nbsp;&nbsp;id: 'textareaId',\
&nbsp;&nbsp;&nbsp;toolbar: [tools],\
&nbsp;&nbsp;&nbsp;size: ['width', 'height'],\
&nbsp;&nbsp;&nbsp;resizeable: true/false,\
&nbsp;&nbsp;&nbsp;sticky: true/false,\
&nbsp;&nbsp;&nbsp;mode: 'classic'/'balloon'\
&nbsp;&nbsp;});\
<br />
where id - a textarea id;\
tools - list of tools:\
&nbsp;&nbsp;'bold', 'italic', 'underline', 'strike', 'mark', 'subscript', 'supscript', 'fontFamily', 'fontSize' - text formatting;\
&nbsp;&nbsp;'clear' - clearing text formatting;\
&nbsp;&nbsp;'divider' - toolbar vertical divider;\
&nbsp;&nbsp;'undo', 'redo' - buttons for clipboard commands;\
&nbsp;&nbsp;'ul', 'ol' - insert lists;\
&nbsp;&nbsp;'blocks', 'blockquote' - insert block tags;\
&nbsp;&nbsp;'align' - add align for block tags;\
&nbsp;&nbsp;'padding' - add padding for block tags;\
&nbsp;&nbsp;'link', 'media', 'image' - allows to insert link, media or image;\
&nbsp;&nbsp;'preview' - text preview;\
size - apps size, gets value in pixels or percents;\
resizeable - allows user to resize app;\
sticky - makes fixed toolbar sticky to the top of window;\
mode - default value is classic, switchs app mode:\
&nbsp;&nbsp;classic - with fixed toolbar;\
&nbsp;&nbsp;balloon - small version, popup toolbar on selectionEnd;
