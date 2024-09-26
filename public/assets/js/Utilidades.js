function showAlert(mensaje = 'test alerta', mensaje2 = "") {
    return alert(mensaje + mensaje2);
}

function BtnScrollDown(event) {
    //console.log('event: ', event);

    event.currentTarget.parentNode.scrollTo({ top: event.currentTarget.parentNode.scrollHeight, behavior: 'smooth' });
    return false;
}

async function recAudio_stop() {
    audio = await recorder.stop();
    //console.log('audio: ', audio);
}

//FUNCIONES INTRO JS
function introduction() {
    const intro = introJs();

    intro.setOptions({
        steps: [
            {
                element:"#introduccion",
                intro:'prueba con Json. Este es el menu de discusiones'
            },
            {
                element:"#paso-1",
                intro:"yo se que oyes mis pensamientos muchacho"
            },
            {
                element:"#paso-2",
                intro:"ñam ñam ñam ñam ñam"
            }
        ]
    })


    document.querySelector('.start-steps').addEventListener('click', function (){
        intro.start();
    })

    intro.start();
}

var heightChat = null;
async function Scrolled() {

    let aux = 100;

    let chatContainer = document.querySelector('#chat_container');

    if (heightChat == null) {
        heightChat = chatContainer.offsetHeight;
    }

    scrollBtn = document.querySelector('#btnDownChat');

    //muestro boton para volver al ultimo mensaje

    if (chatContainer.scrollTop == 0) {
        //console.clear();
        console.log('Cargando mensajes anteriores!!!');
        if (dotnetHelper != null) {
            try {
                await dotnetHelper.invokeMethodAsync("GetMensajesPrevios");
            } catch (error) {
                console.error('[ERROR] GetMensajesPrevios: ', error);
            }
        }
    };

    alturaTotal = chatContainer.scrollHeight;
    alturaActual = chatContainer.scrollTop + chatContainer.offsetHeight;

    //console.clear();
    //console.log('alturaActual: ', alturaActual);
    //console.log('alturaTotal - aux: ', alturaTotal - aux);

    if (alturaActual <= alturaTotal - aux) {
        //console.log('btnDownChat visible');
        scrollBtn.style.display = 'block';
    } else {
        //console.log('btnDownChat oculto');
        scrollBtn.style.display = 'none';
    }
}

function getCheckboxesCheckedByClass(classString) {
    let checkboxes = document.querySelectorAll(`.${classString}:checked`);

    if (checkboxes.length == 0) return;

    let users = [];
    for (var i = 0; i < checkboxes.length; i++) {
        let userId = checkboxes[i].value;
        users.push(userId);
    }

    //console.log(users);
    return users;
}

//FUNCIONES ZOOM IN IMG

function funcion_ZoomImage(img) {
    //var modal = document.getElementById('myModalImagenZoom');
    //var modalImg = document.getElementById("myModalImagenZoom_img01");
    //var modalcaptionText = document.getElementById("myModalImagenZoom_caption");

    //modalImg.src = img.src;
    //modalcaptionText.innerHTML = img.alt;
    //modal.style.display = "block";
    myModalImagenZoom_open(img.src, img.alt);
}

function myModalImagenZoom_open(src, caption) {
    // Get the modal
    $('#myModalImagenZoom').modal('show');

    //document.getElementById("myModalImagenZoom_img01").src = src;
    document.getElementById("myModalImagenZoom_caption").innerHTML = caption;

    const imageUrl = src;
    const imageContainer = document.querySelector('.imageContainer');
    const hud = document.querySelector('#hud');

    let minScale = 1;
    let maxScale = 4;
    let imageWidth;
    let imageHeight;
    let containerWidth;
    let containerHeight;
    let displayImageX = 0;
    let displayImageY = 0;
    let displayImageScale = 1;

    let displayDefaultWidth;
    let displayDefaultHeight;

    let rangeX = 0;
    let rangeMaxX = 0;
    let rangeMinX = 0;

    let rangeY = 0;
    let rangeMaxY = 0;
    let rangeMinY = 0;

    let displayImageRangeY = 0;

    let displayImageCurrentX = 0;
    let displayImageCurrentY = 0;
    let displayImageCurrentScale = 1;


    function resizeContainer() {
        containerWidth = imageContainer.offsetWidth;
        containerHeight = imageContainer.offsetHeight;
        if (displayDefaultWidth !== undefined && displayDefaultHeight !== undefined) {
            displayDefaultWidth = displayImage.offsetWidth;
            displayDefaultHeight = displayImage.offsetHeight;
            updateRange();
            displayImageCurrentX = clamp(displayImageX, rangeMinX, rangeMaxX);
            displayImageCurrentY = clamp(displayImageY, rangeMinY, rangeMaxY);
            updateDisplayImage(
                displayImageCurrentX,
                displayImageCurrentY,
                displayImageCurrentScale);
        }
    }

    resizeContainer();

    function clamp(value, min, max) {
        return Math.min(Math.max(min, value), max);
    }

    function clampScale(newScale) {
        return clamp(newScale, minScale, maxScale);
    }

    window.addEventListener('resize', resizeContainer, true);



    if (imageContainer.hasChildNodes()) {

        imageContainer.removeChild(imageContainer.childNodes[0]);
    }



    var displayImage = new Image();
    displayImage.src = imageUrl;
    displayImage.onload = function () {
        imageWidth = displayImage.width;
        imageHeight = displayImage.height;
        imageContainer.appendChild(displayImage);
        displayImage.addEventListener('mousedown', e => e.preventDefault(), false);
        displayDefaultWidth = displayImage.offsetWidth;
        displayDefaultHeight = displayImage.offsetHeight;
        rangeX = Math.max(0, displayDefaultWidth - containerWidth);
        rangeY = Math.max(0, displayDefaultHeight - containerHeight);
    }

    imageContainer.addEventListener('wheel', e => {
        displayImageScale = displayImageCurrentScale = clampScale(displayImageScale + (e.wheelDelta / 800));
        updateRange();
        displayImageCurrentX = clamp(displayImageCurrentX, rangeMinX, rangeMaxX);
        displayImageCurrentY = clamp(displayImageCurrentY, rangeMinY, rangeMaxY);
        updateDisplayImage(displayImageCurrentX, displayImageCurrentY, displayImageScale);
    }, false);

    function updateDisplayImage(x, y, scale) {
        const transform = 'translateX(' + x + 'px) translateY(' + y + 'px) translateZ(0px) scale(' + scale + ',' + scale + ')';
        displayImage.style.transform = transform;
        displayImage.style.WebkitTransform = transform;
        displayImage.style.msTransform = transform;

    }

    function updateRange() {
        rangeX = Math.max(0, Math.round(displayDefaultWidth * displayImageCurrentScale) - containerWidth);
        rangeY = Math.max(0, Math.round(displayDefaultHeight * displayImageCurrentScale) - containerHeight);

        rangeMaxX = Math.round(rangeX / 2);
        rangeMinX = 0 - rangeMaxX;

        rangeMaxY = Math.round(rangeY / 2);
        rangeMinY = 0 - rangeMaxY;
    }


    const hammertime = new Hammer(imageContainer);

    hammertime.get('pinch').set({ enable: true });
    hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });

    hammertime.on('pan', ev => {
        displayImageCurrentX = clamp(displayImageX + ev.deltaX, rangeMinX, rangeMaxX);
        displayImageCurrentY = clamp(displayImageY + ev.deltaY, rangeMinY, rangeMaxY);
        updateDisplayImage(displayImageCurrentX, displayImageCurrentY, displayImageScale);
    });

    hammertime.on('pinch pinchmove', ev => {
        displayImageCurrentScale = clampScale(ev.scale * displayImageScale);
        updateRange();
        displayImageCurrentX = clamp(displayImageX + ev.deltaX, rangeMinX, rangeMaxX);
        displayImageCurrentY = clamp(displayImageY + ev.deltaY, rangeMinY, rangeMaxY);
        updateDisplayImage(displayImageCurrentX, displayImageCurrentY, displayImageCurrentScale);
    });

    hammertime.on('panend pancancel pinchend pinchcancel', () => {
        displayImageScale = displayImageCurrentScale;
        displayImageX = displayImageCurrentX;
        displayImageY = displayImageCurrentY;
    });


    return false;
}

function myModalImagenZoom_close() {
    // Get the modal
    //$('#myModalImagenZoom').modal('hide');


    //document.getElementById("myModalImagenZoom_img01").src ="#";
    document.getElementById("myModalImagenZoom_caption").innerHTML = "";
}

function ImagetoPrint(source) {
    return "<html><head><scri" + "pt>function step1(){\n" +
        "setTimeout('step2()', 10);}\n" +
        "function step2(){window.print();window.close()}\n" +
        "</scri" + "pt></head><body onload='step1()'>\n" +
        "<img src='" + source + "' /></body></html>";
}

function PrintImage(source) {
    try {
        var Pagelink = "about:blank";
        var pwa = window.open(Pagelink, "_new");
        pwa.document.open();
        pwa.document.write(ImagetoPrint(document.getElementsByClassName('imageContainer')[0].childNodes[0].src));
        pwa.document.close();
    }
    catch {

    }
}

function OnlySelectOne(elementId, classElements) {
    //console.log('elementId: ', elementId);
    //console.log('classElements: ', classElements);

    let Checkboxes = document.querySelectorAll(`.${classElements}`);

    //console.log('Checkboxes: ', Checkboxes);

    if (Checkboxes.length > 0) {
        for (var i = 0; i < Checkboxes.length; i++) {
            let checkbox = Checkboxes[i];
            checkbox.checked = false;
        }
    }

    document.querySelector(`#${elementId}`).checked = true;
}

//window.onbeforeunload = function () {
//    return 'Desea abandonar la pagina??';
//};