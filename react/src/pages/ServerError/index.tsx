import React from 'react';

import BumpIcon from '@/pages/ServerError/assets/BumpIcon';
import { ServerErrorPage } from '@/pages/ServerError/styled';

const ServerError = () => {
  return (
    <ServerErrorPage>
      <BumpIcon />

      <div className="container">
        <h5 className="title"> To all pilots and personnel!</h5>

        <p className="paragraph">
          Technical work <span>10/09</span>
        </p>
        <p className="paragraph">
          from <span>05:00 UTC</span> to <span>08:00 UTC</span>
        </p>
        <p className="paragraph">Thanks for your patience!</p>
      </div>
    </ServerErrorPage>
  );
};

export default ServerError;
