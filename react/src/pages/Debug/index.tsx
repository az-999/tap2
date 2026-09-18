import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { stringify } from 'flatted';
import { observer } from 'mobx-react-lite';

import { useGetMode } from '@/hooks/useGetMode';
import rootStore from '@/store';

const Debug = () => {
  const { isProdMode, isStageMode } = useGetMode();
  const isMobileDevice =
    isProdMode || isStageMode
      ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        )
      : true;

  const WebApp = useWebApp();
  const platform = WebApp?.platform;

  return (
    <div
      style={{
        color: 'white',
        paddingTop: 80,
        paddingBottom: 30,
        wordWrap: 'break-word',
      }}
    >
      <div
        style={{
          fontSize: 12,
          padding: '15px',
          textAlign: 'center',
          userSelect: 'text',
        }}
      >
        {`initData: ${window.Telegram.WebApp.initData}`}

        {`isProdMode: ${isProdMode}`}
        {`isStageMode: ${isStageMode}`}
        <br />
        {`isMobileDevice: ${isMobileDevice}`}
        <br />
        {`platform: ${platform}`}
        <br />
        {`webInitData: ${localStorage.getItem('userInitData')}`}

        <br />
        {/*  {mobXStore.hash || 'нет хэша'} */}
      </div>

      {stringify(rootStore)}
      {/* {JSON.stringify(localStorage.getItem('userToken'), null, 4)} */}
      <br />
      <br />
      {JSON.stringify(process.env, null, 4)}
    </div>
  );
};

export default observer(Debug);
