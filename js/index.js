window.addEventListener('load', function() {
    // get box element
    var focus = document.querySelector('.focus');
    var ul = focus.children[0];
    // get move width
    var moveW = focus.offsetWidth;
    var ol = focus.children[1];

    // func1: useTimeInterval to scroll images automatically
    var index = 0;
    var timer = setInterval(() => {
            index++;
            var translateX = -index * moveW;
            ul.style.transition = 'all .3s';
            ul.style.transform = 'translateX(' + translateX + 'px)';
        }, 2000)
        // only after finished transition,
        //we could decide to mornitor the transition finished event 'trnasitioned'
    ul.addEventListener('transitionend', function() {
        if (index >= 3) {
            index = 0;
            // delete the transuruin effect
            ul.style.transition = 'none';
            var translateX = -index * moveW;
            ul.style.transform = 'translateX(' + translateX + 'px)';
        } else if (index < 0) {
            index = 2;
            ul.style.transition = 'none';
            var translateX = -index * moveW;
            ul.style.transform = 'translateX(' + translateX + 'px)';
        }
        // function2: circles changed with images scroll event
        ol.querySelector('li.current').classList.remove('current');
        // selected images has same index with the circle.
        ol.children[index].classList.add('current');
    });

    //function 3：Finger slide to control images scroll
    // get inital finger X position
    var StartX = 0;
    ul.addEventListener('touchstart', function(e) {
        StartX = e.targetTouches[0].pageX;
        // finger touched the images would stop the images scroll event.
        clearInterval(timer);
    })

    // finger slide X position
    var moveX = 0;
    // for check wether the user touched the screen
    var flag = false;
    // calculate finger slide length
    ul.addEventListener('touchmove', function(e) {
        moveX = e.targetTouches[0].pageX - StartX;
        var translateX = -index * moveW + moveX;
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translateX + 'px)';
        flag = true;
        // stop the screen move
        e.preventDefault();

    });
    // decide wether the images should be changed by the finger move length
    // if length < 50 the image could keep else scroll to next. 
    ul.addEventListener('touchend', function(e) {
        if (flag) {
            if (Math.abs(moveX) > 50) {
                // if slide to the right scrool the previous, left => the next.
                if (moveX > 0) {
                    index--;
                } else {
                    index++;
                }
                var translateX = -index * moveW;
                ul.style.transition = 'all .3s'
                ul.style.transform = 'translateX(' + translateX + 'px)';
            } else {
                var translateX = -index * moveW;
                ul.style.transition = 'all .3s'
                ul.style.transform = 'translateX(' + translateX + 'px)';
            }
        }
        clearInterval(timer);
        timer = setInterval(() => {
            index++;
            var translateX = -index * moveW;
            ul.style.transition = 'all .3s';
            ul.style.transform = 'translateX(' + translateX + 'px)';
        }, 2000)
    });

})