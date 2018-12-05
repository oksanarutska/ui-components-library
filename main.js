document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('input.vo_input_text')
        .forEach(input => {
            input.onfocus = function(e)
            {
                e.target.parentElement.parentElement.classList.add("vo_wrapper_input_form_active");
            };
        });

    document.querySelectorAll('input.vo_input_text')
        .forEach(input => {
            input.onblur = function(e)
            {
                e.target.parentElement.parentElement.classList.remove("vo_wrapper_input_form_active");
            };
        });
});



let tooltip;
const slider = document.querySelector('[type="range"]');
const output = document.querySelector('[data-output]');
rangeSlider.create(slider, {onSlide: (val) => {
        console.log(val);
        output.textContent = val;
    }});

