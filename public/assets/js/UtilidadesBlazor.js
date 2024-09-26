export function showAlerBlazor(mensaje = 'test alerta', mensaje2 = "") {
	//return alert(mensaje + "" + mensaje2);
	return alert(`${mensaje} ${mensaje2}`);
}

export function focusInput(elementId) {
	//console.log(`focusInput: ${elementId}`);
	document.querySelector(`#${elementId}`).focus();
}

export function showModal(elementId) {
	$(`#${elementId}`).modal('show');
}

export function hideModal(elementId) {
	$(`#${elementId}`).modal('hide');
}

export function showElement(elementId) {
	$(`#${elementId}`).show();
}

export function hideElement(elementId) {
	$(`#${elementId}`).hide();
}

export function toggleElement(elementId) {
	$(`#${elementId}`).toggle();
}

export function ChangeUrl(url) {
	//console.log('ChangeUrl: ', url);
	history.pushState(null, '', url);
}

export function hideDropdown(elementId) {
	document.querySelector(`#${elementId}`).classList.remove("show");
}

export function cleanInputValue(elementId) {
	let element = document.querySelector(`#${elementId}`);
	element.value = "";
	//console.log(`${elementId}.value: `, element.value);
}

export function cleanElement(elementId) {
	let element = document.querySelector(`#${elementId}`);
	element.innerHTML = "";
	//console.log(`${elementId}.value: `, element.value);
}

export function getInputValue(elementId) {
	let element = document.querySelector(`#${elementId}`);
	//console.log('getInputValue:', element);
	//console.log('getInputValue:', element.value);
	return element.value;
}

export function getCheckboxesCheckedByClass(classString) {
	let checkboxes = document.querySelectorAll(`.${classString}:checked`);

	let users = [];

	if (checkboxes.length == 0) return users;

	for (var i = 0; i < checkboxes.length; i++) {
		let userId = checkboxes[i].value;
		users.push(userId);
	}
	
	//console.log(users);
	return users;
}

export function cleanCheckboxes(classString) {
	let checkboxes = document.querySelectorAll(`.${classString}:checked`);

	if (checkboxes.length == 0) return;

	for (var i = 0; i < checkboxes.length; i++) {
		checkboxes[i].checked = false;
	}
}

export function filterUserModal(DivParentId, inputId) {

    try {
		initApp.listFilter($('#' + DivParentId), $('#' + inputId)); //id div padre de la lista, id input
		//console.log('filterUserModal');
	} catch (error) {
		console.error('[ERROR] filterUserModal:', error);
    }
}

export function slimScroll(elementId){
	//$('#scrolltype1').slimScroll({
	//	color: color.primary._700,
	//	size: '20px',
	//	height: '300px',
	//	alwaysVisible: true
	//});
	$('#' + elementId).slimScroll({
		position: 'right',
		height: '300px',
		railVisible: true,
		alwaysVisible: true
	});
}

//Funciones CHAT
export function BtnScrollDownByElement(elementId, smooth = true) {
    try {
		let element = document.querySelector('#' + elementId);
		//console.log('element: ', element);

		if (element != null) {
			if (smooth) {
				element.parentNode.scrollTo({ top: element.parentNode.scrollHeight, behavior: 'smooth' });
			}
			else {
				element.parentNode.scrollTo({ top: element.parentNode.scrollHeight });
			}
		}
    } catch (e) {

    }
}

//Ejemplo para llamar funcion static de c#
export async function fnStatic(string = "test parametro string") {
	await DotNet.invokeMethodAsync("TriiBlazor_discusion.Client", "fnStatic", string)
}

var heightChat = null;

export function setDotNetReference(helper) {
	dotnetHelper = helper;
	console.log('dotnetHelper cargado!!!');
}

export async function ScrolledBlazor() {

	//console.log('dotnetHelper: ', dotnetHelper);

	let aux = 100;

	let chatContainer = document.querySelector('#chat_container');

	if (heightChat == null) {
		heightChat = chatContainer.offsetHeight;
	}

	let scrollBtn = document.querySelector('#btnDownChat');

	if (scrollBtn == null) {
		return;
    }

	if (chatContainer.scrollTop == 0) {
		console.log('Cargando mensajes anteriores!!!');
		if (dotnetHelper) {
			await dotnetHelper.invokeMethodAsync("GetMensajesPrevios");
        }
	};

	//muestro boton para volver al ultimo mensaje

	let alturaTotal = chatContainer.scrollHeight;
	let alturaActual = chatContainer.scrollTop + chatContainer.offsetHeight;

	//console.clear();
	//console.log('alturaActual: ', alturaActual);
	//console.log('alturaTotal - aux: ', alturaTotal - aux);

	if (alturaActual <= alturaTotal - aux) {
		//console.log('btnDownChat visible');
		scrollBtn.style.display = 'block';
	} else {
		//console.log('btnDownChat oculto');
		scrollBtn.style.display = 'none';
		if (dotnetHelper != null) {
			await dotnetHelper.invokeMethodAsync("CleanNuevosMgs"); //usando el onscroll de blazor (muy mal optimizado 8/1/2021)
        }
	}
}

export function SetElementPos(elementId, newPos, smooth = false) {
    try {
		let element = document.querySelector(`#${elementId}`);
		if (smooth) {
			element.scrollTo({ top: element.scrollHeight - newPos, behavior: 'smooth' }); //se reposiciona el scroll
		}
		else {
			element.scrollTo({ top: element.scrollHeight - newPos }); //se reposiciona el scroll
        }
    } catch (error) {
    }
}

export function getElementOffsetTop(elementId) {
    try {
		let element = document.querySelector(`#${elementId}`);
		return element.offsetTop;
    } catch (error) {
    }
}

//Obtener la distancia del hijo (usado para saber la distancia entre dos mensajes de un chat)
export function GetChildTopDistance(elementId) {
	return $(`#${elementId}`).offset().top;
}

export function GetElementPos(elementId) {
    try {
		let element = document.querySelector(`#${elementId}`);
		return element.scrollHeight;
    } catch (error) {
    }
}

//FUNCIONES EMOJIAREA JS
var locked = false;

export function initEmoji(inputId) {
	try {

		$(`#${inputId}`).emojioneArea({
			//pickerPosition: "top",
			//tonesStyle: "bullet",
			events: {
				ready: function () { //al inicializar el text-area, se realiza el focus
					this.setFocus();
				},
				keypress: async function (editor, event) {
					if (event.which == 13) {
						if (!locked) {
							locked = true;
							setTimeout(unlock, 1000);
							if (!event.shiftKey) {
								event.preventDefault();
								$(`#${inputId}`).data("emojioneArea").search.blur();//para ocultar emoji picker

								let text = $(`#${inputId}`).data("emojioneArea").getText().toString();
								$(`#${inputId}`).data("emojioneArea").setText("");

								if (text.trim().length > 0) {
									//console.log('Texto: ', text);
									try {
										dotnetHelper.invokeMethodAsync("sendMsg", text)
										.then(
											() => {
										});
										//dotnetHelper.invokeMethod("sendMsg", text); //salta error JSON
									} catch (error) {
										console.error('[ERROR] sendMsg: ', error);
									}
								}
							}
                        }
					}
				},
			}
			//attributes: {
			//	spellcheck: true,
			//}
		});

	} catch (error) {
		console.error('[ERROR] initEmoji: ', error);
    }
}

function unlock() {
	locked = false;
}

export function FocusEndEmoji(inputId) {

	let emojiElement = $(`#${inputId}`).data("emojioneArea");

    try {
		placeCaretAtEnd(emojiElement.editor[0]);
	} catch (error) {
		console.error('FocusEmoji', inputId);
    }
}

export function FocusEmoji(inputId) {
    try {
		let emojiElement = $(`#${inputId}`).data("emojioneArea");
		emojiElement.setFocus();
    } catch (error) {
		//console.error('FocusEmoji: ', error);
    }
}

function placeCaretAtEnd(el) {

	//console.log('placeCaretAtEnd: ');

    try {
		el.focus();
		if (typeof window.getSelection != "undefined"
			&& typeof document.createRange != "undefined") {
			var range = document.createRange();
			range.selectNodeContents(el);
			range.collapse(false);
			var sel = window.getSelection();
			sel.removeAllRanges();
			sel.addRange(range);
		} else if (typeof document.body.createTextRange != "undefined") {
			var textRange = document.body.createTextRange();
			textRange.moveToElementText(el);
			textRange.collapse(false);
			textRange.select();
		}
    } catch (error) {
		console.error('[ERROR] placeCaretAtEnd:', error);
    }

}

export function cleanEmoji(inputId) {
    try {
		setTextEmoji(inputId, "");
		hidePickerEmoji(inputId);
    } catch (error) {
    }
}

export function getTextEmoji(inputId) {
	return $("#" + inputId)[0].emojioneArea.getText();
}

export function setTextEmoji(inputId, text = "") {
	$("#" + inputId)[0].emojioneArea.setText(text);
}

export function hidePickerEmoji(inputId) {
    try {
		$("#" + inputId)[0].emojioneArea.hidePicker();
    } catch (e) {
    }
}

//Audio Recorder
export async function recAudio_start() {
    recorder = await recordAudio();
    recorder.start();
}

export async function recAudio_stop() {
    audio = await recorder.stop();
    //console.log('audio: ', audio);
}

export async function recAudio_send() {
	try {
        audio = await recorder.stop();
		//console.log('fileAudio: ', audio);
		//return audio.audioBlob; //string audio blob

		let base64String = await readFileAsync(audio.audioBlob);

		return base64String;

        //let file = new File([audio.audioBlob], 'audio', {
            //type: "audio/ogg; codecs=opus",
		//});
        //console.log('file: ', file);
		//return file;
        
    } catch (error) {
        console.log('error creacion archivo audio');
        console.log(error);
    }
}

function readFileAsync(file) {
	return new Promise((resolve, reject) => {
		let reader = new FileReader();

		reader.onload = () => {
			resolve(reader.result);
		};

		reader.onerror = reject;

		reader.readAsDataURL(file);
	})
}

export function tooltipNav() {
	//$('[data-toggle="tooltip"]').tooltip({
	//	trigger: 'hover'
	//})

	let objeto = {
		trigger: 'hover'
	};

	$('[data-toggle="tooltip"]').tooltip(objeto);
}
