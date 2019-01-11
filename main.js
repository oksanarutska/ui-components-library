document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll("input.vo_input_text").forEach(input => {
    input.onfocus = function(e) {
      e.target.parentElement.parentElement.classList.add(
        "vo_wrapper_input_form_active"
      );
    };
  });

  document.querySelectorAll("input.vo_input_text").forEach(input => {
    input.onblur = function(e) {
      e.target.parentElement.parentElement.classList.remove(
        "vo_wrapper_input_form_active"
      );
    };
  });
});


// slider
var sliders = [...document.getElementsByClassName("vo_slider")];

document.addEventListener("DOMContentLoaded", function() {
  sliders
    .forEach(s => {
      const thumb = s.getElementsByClassName("vo_slider_thumb")[0];
      thumb.onmousedown = function(e) {
        s.clicked = true;
        thumb.classList.add("vo_slider_thumb_focus");
        if(s.getElementsByClassName("vo_slider_thumb_label").length>0) {
          s.getElementsByClassName("vo_slider_thumb_label")[0].classList.add('vo_slider_thumb_label_focus');
          thumb.classList.remove("vo_slider_thumb_focus");
          thumb.classList.add('vo_slider_thumb_opac');
        }
        console.log("click", e);
      };
    });
  document.onmouseup = function(e) {
    sliders.forEach(s => {
      s.clicked = false;
      const thumb = s.getElementsByClassName("vo_slider_thumb")[0];
      thumb.classList.remove("vo_slider_thumb_focus");
      if(s.getElementsByClassName("vo_slider_thumb_label").length>0) {
        s.getElementsByClassName("vo_slider_thumb_label")[0].classList.remove('vo_slider_thumb_label_focus');
        thumb.classList.remove("vo_slider_thumb_focus");
        thumb.classList.remove('vo_slider_thumb_opac');
      }
    });


    console.log("click released");
  };
});

let timeout = null;
document.addEventListener("mousemove", function(e) {
  if (e.which === 1) {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      const slider = sliders.find(s => s.clicked);
      if (!slider)
        return;

      const thumbContainer = slider.getElementsByClassName("vo_slider_thumb_container")[0];

      console.log("mouse moved", e.movementX, e);
      if (!slider.value || slider.value < 0) {
        slider.value = 0;
      }

      slider.value += e.movementX / thumbContainer.clientWidth;

      if (slider.value > 1) {
        slider.value = 1;
      }

      if (slider.getElementsByClassName("vo_input_value").length > 0) {
        slider.getElementsByClassName("vo_input_value")[0].value = Math.round(100 * slider.value);
      }
      if(slider.getElementsByClassName('vo_slider_thumb_label_text').length>0){
        slider.getElementsByClassName('vo_slider_thumb_label_text')[0].innerText = Math.round(100 * slider.value);
      }

      thumbContainer.style = `transform: translateX(-${100 - 100 * slider.value}%);`;

      const sliderLeft = slider.getElementsByClassName("vo_slider_track_background")[0];
      const sliderRight = slider.getElementsByClassName("vo_slider_track_fill")[0];

      sliderLeft.style.transform = `scale3d(${1 - slider.value}, 1, 1)`;
      sliderRight.style.transform = `scale3d(${slider.value}, 1, 1)`;
    }, 10);
  }

});

