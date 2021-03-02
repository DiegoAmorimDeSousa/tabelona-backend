import { boteria_front } from '../../../utils/config';
import fs from 'fs';

class BuildWidController {
  async wid(request, response) {
    try {

      let file = `
        (function(){
            // Your JavaScript

            var webchat = document.createElement('script');
            webchat.src = '${boteria_front}/cdn/webchat/webchat.js';
            document.head.appendChild(webchat);

            var showdown = document.createElement('script');
            showdown.src = '${boteria_front}/cdn/libs/showdown.min.js';
            document.head.appendChild(showdown);

            var axios = document.createElement('script');
            axios.src = '${boteria_front}/cdn/libs/axios.js';
            document.head.appendChild(axios);

            var socket_cdn = document.createElement('script');
            socket_cdn.src = '${boteria_front}/cdn/libs/socket.io.js';
            document.head.appendChild(socket_cdn);

            var webchat_css = document.createElement('link');
            webchat_css.href  = '${boteria_front}/cdn/webchat/webchat.v2.css';
            webchat_css.rel="stylesheet";
            document.head.appendChild(webchat_css);

          $( document ).ready(function() {
            setTimeout(() => {
                window.renderBotWidget(
                    '${request.params.idbot}'
                );
            }, 3000);
          });
          })();

        `;

    fs.writeFile(appRoot + '/wid.js', file, () => {
        return response.status(200).sendFile(appRoot + '/wid.js');
    });

      return response.status(200);
    } catch (error) {
      return response.json(error);
    }
  }
}

export default new BuildWidController();
