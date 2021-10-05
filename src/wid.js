
        (function(){
            // Your JavaScript

            var webchat = document.createElement('script');
            webchat.src = 'https://testesboteria.com.br/cdn/webchat/webchat.js';
            document.head.appendChild(webchat);

            var showdown = document.createElement('script');
            showdown.src = 'https://testesboteria.com.br/cdn/libs/showdown.min.js';
            document.head.appendChild(showdown);

            var axios = document.createElement('script');
            axios.src = 'https://testesboteria.com.br/cdn/libs/axios.js';
            document.head.appendChild(axios);

            var socket_cdn = document.createElement('script');
            socket_cdn.src = 'https://testesboteria.com.br/cdn/libs/socket.io.js';
            document.head.appendChild(socket_cdn);

            var webchat_css = document.createElement('link');
            webchat_css.href  = 'https://testesboteria.com.br/cdn/webchat/webchat.v2.css';
            webchat_css.rel="stylesheet";
            document.head.appendChild(webchat_css);

          $( document ).ready(function() {
            setTimeout(() => {
                window.renderBotWidget(
                    '6155a59b409f150176e9d216'
                );
            }, 3000);
          });
          })();

        