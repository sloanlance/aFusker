/* globals self, document, setTimeout */

(function () {
    'use strict';

    angular
        .module('fuskrApp')
        .factory('anchorScrollService', AnchorScrollService);

    AnchorScrollService.$inject = ['$window', '$timeout'];

    function AnchorScrollService($window, $timeout) {
        return {
            scrollTo: scrollTo
        };

        function scrollTo(eID) {
            // This scrolling function is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript
            var i, startY, stopY, distance, speed, step, leapY, timer, scrollFunction;

            i = 0;
            startY = currentYPosition();
            stopY = elmYPosition(eID);
            distance = stopY > startY ? stopY - startY : startY - stopY;
            if (distance < 100) {
                scrollTo(0, stopY);
                return;
            }
            speed = Math.round(distance / 100);

            if (speed >= 20) {
                speed = 20;
            }

            step = Math.round(distance / 25);
            leapY = stopY > startY ? startY + step : startY - step;
            timer = 0;

            scrollFunction = function () {
                $window.scrollTo(0, leapY);
            };

            if (stopY > startY) {
                for (i = startY; i < stopY; i += step) {
                    setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
                    leapY += step;
                    if (leapY > stopY) {
                        leapY = stopY;
                    }
                    timer++;
                }
                return;
            }

            for (i = startY; i > stopY; i -= step) {
                setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
                leapY -= step;
                if (leapY < stopY) {
                    leapY = stopY;
                }
                timer++;
            }

            function currentYPosition() {
                return self.pageYOffset;
            }

            function elmYPosition(eID) {
                var elm, node, y = 0;

                elm = document.getElementById(eID);
                if (typeof elm === 'undefined') {
                    return y;
                }

                y = elm.offsetTop;
                node = elm;
                while (node.offsetParent && node.offsetParent !== document.body) {
                    node = node.offsetParent;
                    y += node.offsetTop;
                }
                return y;
            }

        }
    }
}());
