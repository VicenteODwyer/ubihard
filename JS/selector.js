var swiper = new Swiper(" .mySwiper", {
    effect: "coverflow",//El efecto de transición es "coverflow".//
    grabCursor: true , //El cursor se agarra cuando el usuario hace clic y arrastra.//
    centeredSlides: true,//Los slides se centran en la pantalla.//
    slidesPerView: "auto",//La cantidad de slides que se muestran a la vez es "auto", lo que significa que Swiper calculará automáticamente la cantidad adecuada según el tamaño del contenedor.//
    coverflowEffect: {
        rotate:15,//La rotación de los slides es de 15 grados.//
        strech:0,//La distorsión (stretch) es 0, lo que significa que los slides no se distorsionarán al deslizarse.//
        depth:300,//La profundidad de la animación de deslizamiento es de 300 unidades.//
        modifier:1,//El modificador es 1, lo que significa que no se aplicará ninguna transformación adicional al deslizamiento.//
        slideShadows: true,//Las sombras de los slides se habilitan para dar una sensación de profundidad.//
    },
    loop: true,//El bucle (loop) está habilitado, lo que significa que el slider comenzará a recorrer los slides automáticamente y continuará haciéndolo sin interrupciones.//

});